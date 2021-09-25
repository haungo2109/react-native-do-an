import React, { Component } from "react"
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
import styled from "styled-components"
import Colors from "../config/Colors"
import Font from "../config/Font"
const RNMoMoPaymentModule = NativeModules.RNMomosdk
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule)

const merchantname = "CGV Cinemas"
const merchantcode = "CGV01"
const merchantNameLabel = "Nhà cung cấp"
const billdescription = "Fast and Furious 8"
const amount = 50000
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
export default class MomoPaymentScreen extends Component {
    state = {
        textAmount: this.formatNumberToMoney(amount, null, ""),
        amount: amount,
        description: "",
        processing: false,
    }
    componentDidMount() {
        // Listen for native events
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
                        me.setState({
                            description: JSON.stringify(response),
                            processing: false,
                        })
                        let momoToken = response.data
                        let phonenumber = response.phonenumber
                        let message = response.message
                        let orderId = response.refOrderId //your orderId
                        let requestId = response.refRequestId //your requestId
                        //continue to submit momoToken,phonenumber to server
                    } else {
                        me.setState({
                            description: "message: Get token fail",
                            processing: false,
                        })
                    }
                } catch (ex) {}
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
    }

    formatNumberToMoney(number, defaultNum, predicate) {
        predicate = !predicate ? "" : "" + predicate
        if (
            number == 0 ||
            number == "" ||
            number == null ||
            number == "undefined" ||
            isNaN(number) === true ||
            number == "0" ||
            number == "00" ||
            number == "000"
        )
            return "0" + predicate

        var array = []
        var result = ""
        var count = 0

        if (!number) {
            return defaultNum ? defaultNum : "" + predicate
        }

        let flag1 = false
        if (number < 0) {
            number = -number
            flag1 = true
        }

        var numberString = number.toString()
        if (numberString.length < 3) {
            return numberString + predicate
        }

        for (let i = numberString.length - 1; i >= 0; i--) {
            count += 1
            if (numberString[i] == "." || numberString[i] == ",") {
                array.push(",")
                count = 0
            } else {
                array.push(numberString[i])
            }
            if (count == 3 && i >= 1) {
                array.push(".")
                count = 0
            }
        }

        for (let i = array.length - 1; i >= 0; i--) {
            result += array[i]
        }

        if (flag1) result = "-" + result

        return result + predicate
    }

    onPress = async () => {
        if (!this.state.processing) {
            let jsonData = {}
            jsonData.enviroment = "0" //"0": SANBOX , "1": PRODUCTION
            jsonData.action = "gettoken"
            jsonData.isDev = true //SANBOX only , remove this key on PRODUCTION
            jsonData.merchantname = merchantname
            jsonData.merchantcode = merchantcode
            jsonData.merchantnamelabel = merchantNameLabel
            jsonData.description = billdescription
            jsonData.amount = this.state.amount
            jsonData.orderId = "bill234284290348"
            jsonData.requestId = "your_requestId"
            jsonData.orderLabel = "Ma don hang"
            jsonData.appScheme = "momocgv20170101" // iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme
            // console.log("data_request_payment " + JSON.stringify(jsonData))
            if (Platform.OS === "android") {
                let dataPayment = await RNMomosdk.requestPayment(jsonData)
                this.momoHandleResponse(dataPayment)
                console.log("data_request_payment " + dataPayment.status)
            } else {
                RNMomosdk.requestPayment(JSON.stringify(jsonData))
            }
            this.setState({ description: "", processing: true })
        } else {
            this.setState({ description: ".....", processing: false })
        }
    }

    async momoHandleResponse(response) {
        try {
            if (response && response.status == 0) {
                let fromapp = response.fromapp //ALWAYS:: fromapp==momotransfer
                this.setState({
                    description: JSON.stringify(response),
                    processing: false,
                })
                let momoToken = response.data
                let phonenumber = response.phonenumber
                let message = response.message
                //continue to submit momoToken,phonenumber to server
            } else {
                this.setState({
                    description: "message: Get token fail",
                    processing: false,
                })
            }
        } catch (ex) {}
    }

    onChangeText = (value) => {
        let newValue = value.replace(/\./g, "").trim()
        let amount = this.formatNumberToMoney(newValue, null, "")
        this.setState({ amount: newValue, textAmount: amount, description: "" })
    }

    render() {
        let { textAmount, description } = this.state
        return (
            <Container>
                <WrapperLogoMomo>
                    <LogoImage
                        source={require("../assets/icon/momo-icon.png")}
                    />
                </WrapperLogoMomo>
                <TextContent>{"Mã thanh toán: " + merchantcode}</TextContent>
                <TextContent>{"Tên đơn hàng: " + merchantname}</TextContent>
                <TextContent>{"Mô tả: " + billdescription}</TextContent>
                <View>
                    <TotalBar>
                        <TextTotalBar>{"Tổng thanh toán:"}</TextTotalBar>
                        <TextTotalBar>{textAmount}</TextTotalBar>
                        <TextCurrency>{"đ"}</TextCurrency>
                    </TotalBar>
                </View>

                <TouchableOpacity onPress={this.onPress} style={styles.button}>
                    {this.state.processing ? (
                        <Text style={styles.textGrey}>Vui lòng đợi...</Text>
                    ) : (
                        <Text style={styles.text}>Xác nhận thanh toán</Text>
                    )}
                </TouchableOpacity>
                {this.state.processing ? (
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
}

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
