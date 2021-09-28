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

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabHome = () => (
    <Tab.Navigator initialRouteName="UserAuctionJoin">
        <Tab.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{
                headerShown: false,
                tabBarLabel: i18n.t("navigation.tab-user-info"),
                tabBarIcon: () => (
                    <AntDesign name="user" size={24} color="black" />
                ),
            }}
        />
        <Tab.Screen
            name="UserAuction"
            component={UserAuctionScreen}
            options={{
                headerShown: false,
                tabBarLabel: i18n.t("navigation.tab-my-auction"),
                tabBarIcon: () => (
                    <FontAwesome name="feed" size={24} color="black" />
                ),
            }}
        />
        <Tab.Screen
            name="UserAuctionJoin"
            component={UserAuctionJoinScreen}
            options={{
                headerShown: false,
                tabBarLabel: i18n.t("navigation.tab-auction-join"),
                tabBarIcon: () => (
                    <FontAwesome name="feed" size={24} color="black" />
                ),
            }}
        />
        <Tab.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
                headerShown: false,
                tabBarLabel: i18n.t("navigation.tab-notification"),
                tabBarIcon: () => (
                    <Ionicons name="notifications" size={24} color="black" />
                ),
            }}
        />
    </Tab.Navigator>
)

const HomeStack = (props) => {
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
                options={{ title: i18n.t("navigation.login") }}
            />
            <Stack.Screen
                name="AuctionDetail"
                component={AuctionDetailScreen}
                options={{ title: i18n.t("navigation.auction-detail") }}
            />
            <Stack.Screen
                name="CreateEditAuction"
                component={CreateEditAuctionScreen}
                options={{ title: i18n.t("navigation.create-edit-auction") }}
            />
            <Stack.Screen
                name="CreateEditPost"
                component={CreateEditPostScreen}
                options={{ title: i18n.t("navigation.create-edit-post") }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack
