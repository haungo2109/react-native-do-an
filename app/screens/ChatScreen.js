import React, { useState, useEffect, useCallback } from "react"
import { View } from "react-native"
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import { baseURL } from "../api/apiClient"
import { addMessage, onMessageApi } from "../api/firebase"

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([])
    const user = useSelector((s) => s.user)
    const { chatId, chatWith } = route.params

    const getUser = (uid) => {
        if (uid === user.id)
            return {
                _id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                avatar: baseURL + user.avatar,
            }
        return {
            _id: uid,
            name: chatWith.full_name,
            avatar: baseURL + chatWith.avatar,
        }
    }
    useEffect(() => {
        let isMounted = true

        const sub = onMessageApi(chatId, (data) => {
            setMessages(
                Object.entries(data)
                    .map(([key, value]) => ({
                        _id: key,
                        text: value.message,
                        createdAt: new Date(value.timestamp),
                        user: getUser(value.from),
                    }))
                    .reverse()
            )
        })
        return () => {
            isMounted = false
            return sub
        }
    }, [chatId])

    const onSend = useCallback((messages = []) => {
        const message = messages[0]
        addMessage(chatId, {
            from: message["user"]["_id"],
            message: message["text"],
            timestamp: message["createdAt"].getTime(),
        })
    }, [])

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#2e64e5"
                    />
                </View>
            </Send>
        )
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#2e64e5",
                    },
                }}
                textStyle={{
                    right: {
                        color: "#fff",
                    },
                }}
            />
        )
    }

    const scrollToBottomComponent = () => {
        return <FontAwesome name="angle-double-down" size={22} color="#333" />
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: user.id,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
        />
    )
}

export default ChatScreen
