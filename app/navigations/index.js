import React, { useEffect, useRef, useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useDispatch, useSelector } from "react-redux"
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer"
import "react-native-gesture-handler"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import WellcomeScreen from "../screens/WellcomeScreen"
import ChatScreen from "../screens/ChatScreen"
import { removeAll } from "../utils/AsyncStorage"
import { logoutAction } from "../redux/actions"
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import AuctionStack from "./AuctionStack"
import {
    getCurrenUserAction,
    pushTokenUserAction,
} from "../redux/reducers/userReducer"
import {
    addNotification,
    setPushToken,
} from "../redux/reducers/notificationReducer"
import PostStack from "./PostStack"
import HomeStack from "./HomeStack"
import UserScreen from "../screens/UserScreen"
import { useNavigation } from "@react-navigation/core"
import IntroductionScreen from "../screens/IntroductionScreen"
import { getPaymentMethodAction } from "../redux/reducers/paymentMethodReducer"
import { getReportTypeAction } from "../redux/reducers/reportReducer"
import { getCategoryAction } from "../redux/reducers/categoryAuctionReducer"
import MomoPaymentScreen from "../screens/MomoPaymentScreen"

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    const dispatch = useDispatch()
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={() => {
                    dispatch(logoutAction())
                    removeAll()
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: "Wellcome" }],
                    })
                }}
            />
        </DrawerContentScrollView>
    )
}
const AppDrawer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrenUserAction())
    }, [])

    return (
        <Drawer.Navigator
            initialRouteName="HomeStack"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="PostStack"
                component={PostStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="AuctionStack"
                component={AuctionStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Chat"
                component={ChatScreen}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Introduction"
                component={IntroductionScreen}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    )
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})
const AppContainer = (props) => {
    const user = useSelector((state) => state.user)
    const notificationListener = useRef()
    const responseListener = useRef()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        dispatch(getPaymentMethodAction())
        dispatch(getReportTypeAction())
        dispatch(getCategoryAction())

        registerForPushNotificationsAsync().then((token) => {
            dispatch(setPushToken(token))
        })

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                let { data, title, body } = notification.request.content
                dispatch(
                    addNotification({ title, body, ...data, isSeen: false })
                )
            })

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((res) => {
                const { data } = res?.notification?.request?.content

                if (data.obj === "auction") {
                    navigation.navigate("AuctionDetail", {
                        id: data.id,
                    })
                }
                if (data.obj === "post") {
                    navigation.navigate("PostDetail", {
                        id: data.id,
                    })
                }
            })

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )
            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }
    }, [])

    return (
        <Stack.Navigator initialRouteName={"MomoPayment"}>
            <Stack.Screen
                name="Wellcome"
                component={WellcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
                name="App"
                component={AppDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="MomoPayment" component={MomoPaymentScreen} />
        </Stack.Navigator>
    )
}
export async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "Original Title",
        body: "And here is the body!",
        data: { someData: "goes here" },
    }

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
}

async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!")
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
        alert("Must use physical device for Push Notifications")
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        })
    }

    return token
}
export default AppContainer
