import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import UserProfileScreen from "../screens/UserProfileScreen"
import UserAuctionScreen from "../screens/UserAuctionScreen"
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import NotificationScreen from "../screens/NotificationScreen"
import AuctionDetailScreen from "../screens/AuctionDetailScreen"
import PostDetailScreen from "../screens/PostDetailScreen"
import UserAuctionJoinScreen from "../screens/UserAuctionJoinSreen"
import CreateEditAuctionScreen from "../screens/CreateEditAuctionScreen"
import CreateEditPostScreen from "../screens/CreateEditPostScreen"
import i18n from "i18n-js"
import { useSelector } from "react-redux"
import {
    bgBack,
    bgView,
    colorIcon,
    colorIconDrawDark,
    colorIconDrawLight,
    colorText,
} from "../config/PropertyCss"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabHome = () => {
    const theme = useSelector((s) => s.setting.theme)

    return (
        <Tab.Navigator
            initialRouteName="UserProfile"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: bgView({ themeColor: theme === "light" }),
                },
            }}
        >
            <Tab.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: i18n.t("navigation.tab-user-info"),
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="user"
                            size={24}
                            color={
                                theme === "light"
                                    ? colorIconDrawLight(focused)
                                    : colorIconDrawDark(focused)
                            }
                        />
                    ),
                    tabBarLabelStyle: {
                        color: colorText({ themeColor: theme === "light" }),
                    },
                }}
            />
            <Tab.Screen
                name="UserAuction"
                component={UserAuctionScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: i18n.t("navigation.tab-my-auction"),
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="feed"
                            size={24}
                            color={
                                theme === "light"
                                    ? colorIconDrawLight(focused)
                                    : colorIconDrawDark(focused)
                            }
                        />
                    ),
                    tabBarLabelStyle: {
                        color: colorText({ themeColor: theme === "light" }),
                    },
                }}
            />
            <Tab.Screen
                name="UserAuctionJoin"
                component={UserAuctionJoinScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: i18n.t("navigation.tab-auction-join"),
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="feed"
                            size={24}
                            color={
                                theme === "light"
                                    ? colorIconDrawLight(focused)
                                    : colorIconDrawDark(focused)
                            }
                        />
                    ),
                    tabBarLabelStyle: {
                        color: colorText({ themeColor: theme === "light" }),
                    },
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: i18n.t("navigation.tab-notification"),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="notifications"
                            size={24}
                            color={
                                theme === "light"
                                    ? colorIconDrawLight(focused)
                                    : colorIconDrawDark(focused)
                            }
                        />
                    ),
                    tabBarLabelStyle: {
                        color: colorText({ themeColor: theme === "light" }),
                    },
                }}
            />
        </Tab.Navigator>
    )
}

const HomeStack = (props) => {
    const theme = useSelector((s) => s.setting.theme)

    const customHeaderStyle = {
        backgroundColor: bgView({
            themeColor: theme === "light",
        }),
    }
    const customHeaderTitleStyle = {
        color: colorText({
            themeColor: theme === "light",
        }),
    }
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={TabHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PostDetail"
                component={PostDetailScreen}
                options={{
                    title: i18n.t("navigation.post-detail"),
                    headerStyle: customHeaderStyle,
                    headerTitleStyle: customHeaderTitleStyle,
                    headerTintColor: colorText({
                        themeColor: theme === "light",
                    }),
                }}
            />
            <Stack.Screen
                name="AuctionDetail"
                component={AuctionDetailScreen}
                options={{
                    title: i18n.t("navigation.auction-detail"),
                    headerStyle: customHeaderStyle,
                    headerTitleStyle: customHeaderTitleStyle,
                    headerTintColor: colorText({
                        themeColor: theme === "light",
                    }),
                }}
            />
            <Stack.Screen
                name="CreateEditAuction"
                component={CreateEditAuctionScreen}
                options={{
                    title: i18n.t("navigation.create-edit-auction"),
                    headerStyle: customHeaderStyle,
                    headerTitleStyle: customHeaderTitleStyle,
                    headerTintColor: colorText({
                        themeColor: theme === "light",
                    }),
                }}
            />
            <Stack.Screen
                name="CreateEditPost"
                component={CreateEditPostScreen}
                options={{
                    title: i18n.t("navigation.create-edit-post"),
                    headerStyle: customHeaderStyle,
                    headerTitleStyle: customHeaderTitleStyle,
                    headerTintColor: colorText({
                        themeColor: theme === "light",
                    }),
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack
