import React from "react"
import PostScreen from "../screens/PostScreen"
import AppBar from "../components/AppBar"
import UserScreen from "../screens/UserScreen"
import PostDetailScreen from "../screens/PostDetailScreen"
import SearchSreen from "../screens/SearchSreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

const PostStack = (props) => {
    return (
        <Stack.Navigator initialRouteName="Post">
            <Stack.Screen
                name="Post"
                component={PostScreen}
                options={{ headerTitle: () => <AppBar {...props} /> }}
            />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen name="Search" component={SearchSreen} />
        </Stack.Navigator>
    )
}
export default PostStack
