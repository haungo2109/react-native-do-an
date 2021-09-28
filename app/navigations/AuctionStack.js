import React from "react"
import AppBar from "../components/AppBar"
import AuctionScreen from "../screens/AuctionSreen"
import AuctionDetailScreen from "../screens/AuctionDetailScreen"
import SearchSreen from "../screens/SearchSreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CreateEditAuctionScreen from "../screens/CreateEditAuctionScreen"

const Stack = createNativeStackNavigator()

const AuctionStack = (props) => {
    return (
        <Stack.Navigator initialRouteName="Auction">
            <Stack.Screen
                name="Auction"
                component={AuctionScreen}
                options={{ headerTitle: () => <AppBar {...props} /> }}
            />
            <Stack.Screen
                name="AuctionDetail"
                component={AuctionDetailScreen}
            />
            <Stack.Screen name="Search" component={SearchSreen} />
            <Stack.Screen
                name="CreateEditAuction"
                component={CreateEditAuctionScreen}
            />
        </Stack.Navigator>
    )
}

export default AuctionStack
