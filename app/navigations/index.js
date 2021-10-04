import React, { useEffect, useRef } from "react"
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
import Feedback from "../screens/FeedbackScreen"
import { removeAll } from "../utils/AsyncStorage"
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
import i18n from "i18n-js"
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons"
import SettingScreen from "../screens/SettingScreen"
import { View } from "react-native"
import Colors from "../config/Colors"
import TopDrawer from "../components/TopDrawer"
import * as Localization from "expo-localization"
import { setLanguage } from "../redux/reducers/settingReducer"
import {
    colorIconDrawDark,
    colorIconDrawLight,
    colorText,
} from "../config/PropertyCss"

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme === "light" ? Colors.gray : Colors.gray6,
            }}
        >
            <DrawerContentScrollView {...props}>
                <TopDrawer />
                <View style={{ flex: 1 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <DrawerItem
                labelStyle={{
                    color: colorText({ themeColor: theme === "light" }),
                }}
                style={{
                    marginBottom: 15,
                    borderTopColor:
                        theme === "light" ? Colors.gray : Colors.gray5,
                    borderTopWidth: 1,
                }}
                label={i18n.t("navigation.logout")}
                onPress={() => {
                    removeAll()
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: "Wellcome" }],
                    })
                }}
                icon={({ focused, size }) => (
                    <MaterialIcons
                        name="logout"
                        color={
                            theme == "dark"
                                ? colorIconDrawDark(focused)
                                : colorIconDrawLight(focused)
                        }
                        size={size}
                    />
                )}
            />
        </View>
    )
}
const AppDrawer = () => {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)

    const color = (focused) =>
        theme == "dark"
            ? colorIconDrawDark(focused)
            : colorIconDrawLight(focused)

    const drawerLabelStyle = {
        color: colorText({ themeColor: theme === "light" }),
    }
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
                options={{
                    headerShown: false,
                    title: i18n.t("navigation.home-stack"),
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome
                            name="home"
                            size={size}
                            color={color(focused)}
                        />
                    ),
                    drawerLabelStyle,
                }}
            />
            <Drawer.Screen
                name="PostStack"
                component={PostStack}
                options={{
                    headerShown: false,
                    title: i18n.t("navigation.post-stack"),
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome
                            name="feed"
                            size={size + 3}
                            color={color(focused)}
                        />
                    ),
                    drawerLabelStyle,
                }}
            />
            <Drawer.Screen
                name="AuctionStack"
                component={AuctionStack}
                options={{
                    headerShown: false,
                    title: i18n.t("navigation.auction-stack"),
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome
                            name="list-alt"
                            size={size}
                            color={color(focused)}
                        />
                    ),
                    drawerLabelStyle,
                }}
            />
            <Drawer.Screen
                name="Feedback"
                component={Feedback}
                options={{
                    headerShown: false,
                    title: i18n.t("navigation.feedback"),
                    drawerIcon: ({ focused, size }) => (
                        <MaterialIcons
                            name="feedback"
                            size={size}
                            color={color(focused)}
                        />
                    ),
                    drawerLabelStyle,
                }}
            />
            <Drawer.Screen
                name="Introduction"
                component={IntroductionScreen}
                options={{
                    headerShown: false,
                    title: i18n.t("navigation.introduction"),
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="bulb1"
                            size={size}
                            color={color(focused)}
                        />
                    ),
                    drawerLabelStyle,
                }}
            />
            <Drawer.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    headerShown: false,
                    title: i18n.t("navigation.setting"),
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="setting"
                            size={size}
                            color={color(focused)}
                        />
                    ),
                    drawerLabelStyle,
                }}
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
    const push_token = useSelector((s) => s.notification.pushToken)
    const { language } = useSelector((s) => s.setting)

    useEffect(() => {
        if (user?.username && push_token) {
            const form = new FormData()
            form.append("push_token", push_token)
            dispatch(pushTokenUserAction(form))
        }
    }, [user])

    useEffect(() => {
        if (!language) {
            i18n.locale = Localization.locale
            dispatch(setLanguage(Localization.locale.slice(0, 2)))
        } else {
            i18n.locale = language
        }
    })
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
        <Stack.Navigator initialRouteName={user.username ? "App" : "Wellcome"}>
            <Stack.Screen
                name="Wellcome"
                component={WellcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: i18n.t("navigation.login") }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: i18n.t("navigation.register") }}
            />
            <Stack.Screen
                name="App"
                component={AppDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="User"
                component={UserScreen}
                options={{ title: i18n.t("navigation.user") }}
            />
            <Stack.Screen
                name="MomoPayment"
                component={MomoPaymentScreen}
                options={{ title: i18n.t("navigation.momo") }}
            />
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
    console.log("push token: ", token)
    return token
}
export default AppContainer
