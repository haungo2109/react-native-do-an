import React, { Component, useEffect, useState } from "react"
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    SafeAreaView,
    Image,
    NativeModules,
    NativeEventEmitter,
    ActivityIndicator,
} from "react-native"
import RNMomosdk from "react-native-momosdk"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import auctionApi from "../api/auctionApi"
import Colors from "../config/Colors"
import Font from "../config/Font"
import { postMomoPayAction } from "../redux/reducers/auctionReducer"
import formatNumberToMoney from "../utils/FormatNumberToMoney"
const RNMoMoPaymentModule = NativeModules.RNMomosdk
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule)

const merchantname = "OU"
const merchantcode = "MOMOBDAF20201207"
const merchantNameLabel = "Mạng xã hội Kanj"
const billdescription = "Thanh toán đấu giá"

const enviroment = "0" //"1": production

const TextContent = styled.Text`
    font-size: ${Font.big};
    margin-left: 10px;
    padding: 10px 0;
`
const Container = styled.SafeAreaView`
    flex: 1;
    margin-top: 50px;
    background-color: transparent;
`
const WrapperLogoMomo = styled.View`
    height: 100px;
    justify-content: center;
    align-items: center;
`
const LogoImage = styled.Image`
    height: 100px;
    width: 100px;
`
const TotalBar = styled.View`
    height: 50px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${Colors.gray3};
`
const TextTotalBar = styled.Text`
    flex: 1;
    font-size: ${Font.bigger};
    margin-left: 10px;
`
const TextCurrency = styled.Text`
    position: absolute;
    right: 20px;
    font-size: ${Font.huge};
`
const MomoPaymentScreen = ({ route }) => {
    const [description, setDescription] = useState("")
    const [processing, setProcessing] = useState(false)
    const { comment_id, auction_id, amount } = route.params

    const dispatch = useDispatch()
    useEffect(() => {
        let me = this
        EventEmitter.addListener(
            "RCTMoMoNoficationCenterRequestTokenReceived",
            (response) => {
                console.log(
                    "<MoMoPay>Listen.Event::" + JSON.stringify(response)
                )
                try {
                    if (response && response.status == 0) {
                        let fromapp = response.fromapp //ALWAYS:: fromapp==momotransfer
                        setDescription(JSON.stringify(response))
                        setDescription(false)
                        let momoToken = response.data
                        let phonenumber = response.phonenumber
                        let message = response.message
                        let orderId = response.refOrderId //your orderId
                        let requestId = response.refRequestId //your requestId
                        //continue to submit momoToken,phonenumber to server
                    } else {
                        setDescription("Get token fail")
                        setDescription(false)
                    }
                } catch (ex) {
                    console.log("ERROR: ", ex)
                }
            }
        )

        //OPTIONAL
        EventEmitter.addListener(
            "RCTMoMoNoficationCenterRequestTokenState",
            (response) => {
                console.log(
                    "<MoMoPay>Listen.RequestTokenState:: " + response.status
                )
                // status = 1: Parameters valid & ready to open MoMo app.
                // status = 2: canOpenURL failed for URL MoMo app
                // status = 3: Parameters invalid
            }
        )
    })

    const onPress = async () => {
        if (!processing) {
            let jsonData = {}
            jsonData.action = "gettoken"
            jsonData.partner = "merchant"
            jsonData.appScheme = "momobdaf20201207"
            jsonData.amount = amount
            jsonData.description = "Thanh toan dau gia"
            jsonData.merchantcode = merchantcode
            jsonData.enviroment = enviroment
            jsonData.merchantname = merchantname
            jsonData.orderLabel = "Mã thanh toán"
            jsonData.isDev = true //SANBOX only , remove this key on PRODUCTION
            jsonData.merchantnamelabel = merchantNameLabel
            jsonData.orderId = `Kanj-auctionId_${auction_id}-commentId_${comment_id}`
            console.log("data_request_payment " + JSON.stringify(jsonData))
            if (Platform.OS === "android") {
                let dataPayment = await RNMomosdk.requestPayment(jsonData)
                momoHandleResponse(dataPayment)
                console.log("data_request_payment " + dataPayment.status)
            } else {
                RNMomosdk.requestPayment(JSON.stringify(jsonData))
            }
            setDescription("")
            setProcessing(true)
        } else {
            setDescription(".....")
            setProcessing(false)
        }
    }

    const momoHandleResponse = async (response) => {
        try {
            if (response && response.status === 0) {
                let fromapp = response.fromapp //ALWAYS:: fromapp==momotransfer
                setDescription(JSON.stringify(response))
                setProcessing(false)

                let momo_token = response.data
                let phonenumber = response.phonenumber
                let message = response.message

                dispatch(
                    postMomoPayAction({
                        auction_id,
                        comment_id,
                        phonenumber,
                        momo_token,
                        message,
                    })
                )
                    .unwrap()
                    .then((res) => {
                        console.log("Success: ", res)
                        setDescription(res.message)
                        setProcessing(true)
                    })
                    .catch((error) => {
                        setDescription(error.message)
                        setProcessing(false)
                    })
            } else {
                setDescription(response.message)
                setProcessing(false)
            }
        } catch (ex) {
            setDescription("Đã có lỗi xảy ra, vui lòng thanh toán lại")
            setProcessing(false)
        }
    }

    return (
        <Container>
            <WrapperLogoMomo>
                <LogoImage source={require("../assets/icon/momo-icon.png")} />
            </WrapperLogoMomo>
            <TextContent>{"Mã thanh toán: " + merchantcode}</TextContent>
            <TextContent>{"Tên đơn hàng: " + merchantname}</TextContent>
            <TextContent>{"Mô tả: " + billdescription}</TextContent>
            <View>
                <TotalBar>
                    <TextTotalBar>{"Tổng thanh toán:"}</TextTotalBar>
                    <TextTotalBar>
                        {formatNumberToMoney(amount, null, "")}
                    </TextTotalBar>
                    <TextCurrency>{"đ"}</TextCurrency>
                </TotalBar>
            </View>

            <TouchableOpacity onPress={onPress} style={styles.button}>
                {processing ? (
                    <Text style={styles.textGrey}>Vui lòng đợi...</Text>
                ) : (
                    <Text style={styles.text}>Xác nhận thanh toán</Text>
                )}
            </TouchableOpacity>
            {processing ? (
                <ActivityIndicator size="small" color="#000" />
            ) : null}
            {description != "" ? (
                <Text style={[styles.text, { color: "red" }]}>
                    {description}
                </Text>
            ) : null}
        </Container>
    )
}

export default MomoPaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    textInput: {
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 5,
        height: 40,
        paddingBottom: 2,
        borderBottomColor: "#dadada",
        borderBottomWidth: 1,
    },
    formInput: {
        backgroundColor: "#FFF",
        borderBottomColor: "#dadada",
        borderTopColor: "#dadada",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        backgroundColor: "#b0006d",
        borderRadius: 4,
        marginHorizontal: 40,
        marginVertical: 10,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: "center",
        paddingHorizontal: 10,
    },
    textGrey: {
        color: "grey",
        fontSize: 18,
        textAlign: "center",
    },
})
