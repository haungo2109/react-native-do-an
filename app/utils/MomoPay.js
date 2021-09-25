import {
    Platform,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,
} from "react-native"
import RNMomosdk from "react-native-momosdk"
const RNMomosdkModule = NativeModules.RNMomosdk
const EventEmitter = new NativeEventEmitter(RNMomosdkModule)

const merchantname = "Kanj Social Network"
const merchantcode = "Kanj99"
const merchantNameLabel = "Mạng xã hội"
const billdescription = "Mạng xã hội từ thiện Kanj"
const amount = 5000
const enviroment = "0" //"0": SANBOX , "1": PRODUCTION

import React, { useEffect } from "react"

function MomoPay({ textAmount, amount, description = "", processing = false }) {
    useEffect(() => {
        EventEmitter.addListener(
            "RCTMoMoNoficationCenterRequestTokenReceived",
            (response) => {
                try {
                    console.log(
                        "<MoMoPay>Listen.Event::" + JSON.stringify(response)
                    )
                    if (response && response.status == 0) {
                        //SUCCESS: continue to submit momoToken,phonenumber to server
                        let fromapp = response.fromapp //ALWAYS:: fromapp==momotransfer
                        let momoToken = response.data
                        let phonenumber = response.phonenumber
                        let message = response.message
                        let orderId = response.refOrderId
                    } else {
                        //let message = response.message;
                        //Has Error: show message here
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
    })
    const onPress = async () => {
        let jsonData = {}
        jsonData.enviroment = enviroment //SANBOX OR PRODUCTION
        jsonData.action = "gettoken" //DO NOT EDIT
        jsonData.merchantname = merchantname //edit your merchantname here
        jsonData.merchantcode = merchantcode //edit your merchantcode here
        jsonData.merchantnamelabel = merchantNameLabel
        jsonData.description = billdescription
        jsonData.amount = amount //order total amount
        jsonData.orderId = "ID20181123192300"
        jsonData.orderLabel = "Ma don hang"
        jsonData.appScheme = "momocgv20170101" // iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
        console.log("data_request_payment " + JSON.stringify(jsonData))
        if (Platform.OS === "android") {
            let dataPayment = await RNMomosdk.requestPayment(jsonData)
            momoHandleResponse(dataPayment)
        } else {
            RNMomosdk.requestPayment(jsonData)
        }
    }

    const momoHandleResponse = async (response) => {
        try {
            if (response && response.status == 0) {
                //SUCCESS continue to submit momoToken,phonenumber to server
                let fromapp = response.fromapp //ALWAYS:: fromapp == momotransfer
                let momoToken = response.data
                let phonenumber = response.phonenumber
                let message = response.message
            } else {
                //let message = response.message;
                //Has Error: show message here
            }
        } catch (ex) {}
    }
    return <div></div>
}

export default MomoPay
