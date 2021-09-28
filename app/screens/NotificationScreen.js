import { useNavigation } from "@react-navigation/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { TextTitle } from "../components/ModelEdit"
import Colors from "../config/Colors"
import { removeANotification } from "../redux/reducers/notificationReducer"
import i18n from "i18n-js"

const Container = styled.SafeAreaView`
    align-items: center;
    padding-top: 10px;
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
`
const TextContent = styled.Text``

function NotificationScreen(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const data = useSelector((s) => s.notification.data)

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
        <Container>
            <TextTitle>{i18n.t("txt.title-notification")}</TextTitle>
            {data?.length !== 0 &&
                data.map((c) => (
                    <WrapperItemButton
                        onPress={() => handlePress(c)}
                        key={c.id}
                        bgcolor={c.isSeen == true ? Colors.gray : Colors.blue2}
                    >
                        <TextTitleCus>{c.title}</TextTitleCus>
                        <TextContent>{c.body}</TextContent>
                    </WrapperItemButton>
                ))}
        </Container>
    )
}

export default NotificationScreen
