import React from "react"
import PostScreen from "../screens/PostScreen"
import AppBar from "../components/AppBar"
import i18n from "i18n-js"
import PostDetailScreen from "../screens/PostDetailScreen"
import SearchSreen from "../screens/SearchSreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CreateEditPostScreen from "../screens/CreateEditPostScreen"
import { bgView, colorText } from "../config/PropertyCss"
import { useSelector } from "react-redux"

const Stack = createNativeStackNavigator()

const PostStack = (props) => {
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
        <Stack.Navigator initialRouteName="Post">
            <Stack.Screen
                name="Post"
                component={PostScreen}
                options={{
                    headerTitle: () => <AppBar {...props} />,
                    headerStyle: customHeaderStyle,
                }}
            />
            <Stack.Screen
                name="PostDetail"
                component={PostDetailScreen}
                options={{
                    headerTitle: i18n.t("navigation.post-detail"),
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
                name="CreateEditPost"
                component={CreateEditPostScreen}
                options={{
                    headerTitle: i18n.t("navigation.create-edit-post"),
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
export default PostStack
