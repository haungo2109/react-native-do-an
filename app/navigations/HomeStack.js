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

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabHome = () => (
    <Tab.Navigator initialRouteName="UserAuctionJoin">
        <Tab.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{
                headerShown: false,
                tabBarLabel: "Thông tin cá nhân",
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
                tabBarLabel: "Đấu giá của bạn",
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
                tabBarLabel: "Đấu giá đã tham gia",
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
                tabBarLabel: "Thông báo",
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
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen
                name="AuctionDetail"
                component={AuctionDetailScreen}
            />
            <Stack.Screen
                name="CreateEditAuction"
                component={CreateEditAuctionScreen}
            />
            <Stack.Screen
                name="CreateEditPost"
                component={CreateEditPostScreen}
            />
        </Stack.Navigator>
    )
}

export default HomeStack
