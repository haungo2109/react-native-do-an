import React from "react"
import AppBar from "../components/AppBar"
import AuctionScreen from "../screens/AuctionSreen"
import AuctionDetailScreen from "../screens/AuctionDetailScreen"
import SearchSreen from "../screens/SearchSreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CreateEditAuctionScreen from "../screens/CreateEditAuctionScreen"
import { bgView, colorText } from "../config/PropertyCss"
import { useSelector } from "react-redux"
import i18n from "i18n-js"

const Stack = createNativeStackNavigator()

const AuctionStack = (props) => {
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
        <Stack.Navigator initialRouteName="Auction">
            <Stack.Screen
                name="Auction"
                component={AuctionScreen}
                options={{
                    headerTitle: () => <AppBar {...props} />,
                    headerStyle: customHeaderStyle,
                }}
            />
            <Stack.Screen
                name="AuctionDetail"
                component={AuctionDetailScreen}
                options={{
                    headerTitle: i18n.t("navigation.auction-detail"),
                    headerStyle: customHeaderStyle,
                    headerTitleStyle: customHeaderTitleStyle,
                    headerTintColor: colorText({
                        themeColor: theme === "light",
                    }),
                }}
            />
            <Stack.Screen
                name="Search"
                component={SearchSreen}
                options={{
                    headerTitle: i18n.t("navigation.search"),
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
                    headerTitle: i18n.t("navigation.create-edit-auction"),
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

export default AuctionStack
