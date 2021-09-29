import { useNavigation } from "@react-navigation/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { TextTitle } from "./CreateEditAuctionScreen"
import Colors from "../config/Colors"
import { removeANotification } from "../redux/reducers/notificationReducer"
import i18n from "i18n-js"
import {
    bgBack,
    bgItem,
    bgView,
    colorText,
    colorTextTitle,
} from "../config/PropertyCss"

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    padding-top: 10px;
    background-color: ${bgView};
`
const WrapperItemButton = styled.TouchableOpacity`
    height: 70px;
    width: 100%;
    background-color: ${(props) => props.bgcolor};
    justify-content: center;
    padding-left: 11px;
    margin-top: 2px;
`
const TextTitleCus = styled(TextTitle)`
    margin-bottom: 5px;
    color: ${colorTextTitle};
`
const TextContent = styled.Text`
    color: ${colorText};
`

function NotificationScreen(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const data = useSelector((s) => s.notification.data)
    const theme = useSelector((s) => s.setting.theme)

    useEffect(() => {}, [data])
    const handlePress = (item) => {
        if (item.obj === "introduction") {
            navigation.navigate("Introduction")
            dispatch(removeANotification(item.id))
        }
        if (item.obj === "auction") {
            navigation.navigate("AuctionDetail", {
                id: item.id,
            })
            dispatch(removeANotification(item.id))
        }
        if (item.obj === "post") {
            dispatch(removeANotification(item.id))

            navigation.navigate("PostDetail", {
                id: item.id,
            })
        }
    }
    return (
        <Container themeColor={theme === "light"}>
            <TextTitle themeColor={theme === "light"}>
                {i18n.t("txt.title-notification")}
            </TextTitle>
            {data?.length !== 0 &&
                data.map((c) => (
                    <WrapperItemButton
                        onPress={() => handlePress(c)}
                        key={c.id}
                        bgcolor={c.isSeen === false ? bgItem : bgView}
                        themeColor={theme === "light"}
                    >
                        <TextTitleCus themeColor={theme === "light"}>
                            {c.title}
                        </TextTitleCus>
                        <TextContent themeColor={theme === "light"}>
                            {c.body}
                        </TextContent>
                    </WrapperItemButton>
                ))}
        </Container>
    )
}

export default NotificationScreen
