import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { baseURL } from "../api/apiClient"
import { getLastMessage, onMemberApi } from "../api/firebase"
import userApi from "../api/userApi"
import moment from "moment"

export const Container = styled.View`
    flex: 1;
    padding-left: 11px;
    padding-right: 11px;
    align-items: center;
    background-color: #ffffff;
`

export const Card = styled.TouchableOpacity`
    width: 100%;
`

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const UserImgWrapper = styled.View`
    padding-top: 11px;
    padding-bottom: 11px;
`

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

export const TextSection = styled.View`
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    padding-left: 0;
    margin-left: 10px;
    width: 300px;
    border-bottom-width: 1px;
    border-bottom-color: #cccccc;
`

export const UserInfoText = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-right: 11px;
`

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    /* font-family: "Lato-Regular"; */
`

export const PostTime = styled.Text`
    font-size: 12px;
    color: #666;
    /* font-family: "Lato-Regular"; */
`

export const MessageText = styled.Text`
    font-size: 14px;
    color: #333333;
`
const MessagesScreen = ({ navigation }) => {
    const user = useSelector((s) => s.user)
    const [listChat, setListChat] = useState([])

    useEffect(() => {
        let isMounted = true
        let sub = onMemberApi(user.id, (data) => {
            Promise.all(
                Object.entries(data).map(([k, v]) => {
                    return userApi.getUserInfo(k)
                })
            ).then((listUser) => {
                Promise.all(
                    Object.entries(data).map(([k, v]) => {
                        return getLastMessage(v.chatId)
                    })
                ).then((listMessage) => {
                    console.log("list", listMessage)
                    if (isMounted)
                        setListChat(
                            Object.entries(data).map(([k, v], i) => ({
                                uid: k,
                                ...v,
                                ...listMessage[i],
                                ...listUser[i],
                            }))
                        )
                })
            })
        })

        return () => {
            isMounted = false
            return sub
        }
    }, [])

    return (
        <Container>
            <FlatList
                data={listChat}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        onPress={() =>
                            navigation.navigate("Chat", {
                                chatId: item.chatId,
                                chatWith: item,
                            })
                        }
                    >
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg
                                    source={{ uri: baseURL + item.avatar }}
                                />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.full_name || ""}</UserName>
                                    <PostTime>
                                        {item.timestamp
                                            ? moment(
                                                  item.timestamp.toString(),
                                                  "x"
                                              ).format("hh:mm MM/DD")
                                            : ""}
                                    </PostTime>
                                </UserInfoText>
                                <MessageText>{item.message || ""}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    )
}

export default MessagesScreen
