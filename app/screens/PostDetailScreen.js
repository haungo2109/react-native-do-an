import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { baseURL } from "../api/apiClient"
import AvatarToProfile from "../components/Avatar"
import Feed from "../components/Feed"
import Colors from "../config/Colors"
import Font from "../config/Font"
import useModelMenu from "../hooks/useModelMenu"
import { FontAwesome } from "@expo/vector-icons"
import {
    fetchPostComment,
    sendPostComment,
} from "../redux/reducers/commentReducer"
import { getOnePostAction } from "../redux/reducers/postReducer"

const WrapperComment = styled.View`
    padding: 0px 11px;
`
const ItemComment = styled.View`
    flex-direction: row;
    height: 42px;
    width: 100%;
    align-items: center;
    margin: 5px 0;
`
const ItemCommentReply = styled(ItemComment)`
    padding-left: 10%;
`
const CommentText = styled.Text`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const TextInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const ButtonSendComment = styled.TouchableOpacity``
const Icon = styled.View`
    margin: 0 10px;
`
function PostDetailScreen({ route, navigation }) {
    const dispatch = useDispatch()

    const [item, setItem] = useState(route.params)

    const { data } = useSelector((state) => state.comment)
    const user = useSelector((state) => state.user)
    const [inputComment, setInputComment] = useState("")
    const { showModelMenu } = useModelMenu()

    useEffect(() => {
        dispatch(fetchPostComment(item.id))
        if (!item?.user) {
            dispatch(getOnePostAction(item.id))
                .unwrap()
                .then((res) => {
                    setItem(res)
                })
        }
    }, [])

    const handlePressMenu = (uid, post) => {
        if (user.id === uid)
            showModelMenu({
                id: post.id,
                listChoose: ["edit", "delete"],
                data: post,
            })
        else showModelMenu({ id: post.id, listChoose: ["report"], data: post })
    }
    const handleSendComment = () => {
        const data = new FormData()
        data.append("content", inputComment)
        dispatch(sendPostComment({ id: item.id, data })).then(() => {
            setInputComment("")
        })
    }
    return (
        <ScrollView>
            {item?.user && <Feed {...item} handlePressMenu={handlePressMenu} />}
            <WrapperComment>
                {data.map((c) => (
                    <Item user={c.user} content={c.content} key={c.id} />
                ))}
                <ItemComment>
                    <AvatarToProfile
                        source={{
                            uri: baseURL + user.avatar,
                        }}
                        user_id={user.id}
                    />
                    <TextInput
                        onChangeText={setInputComment}
                        value={inputComment}
                        placeholder="Nhập bình luận..."
                    />
                    <ButtonSendComment onPress={handleSendComment}>
                        <Icon>
                            <FontAwesome name="send" size={24} color="black" />
                        </Icon>
                    </ButtonSendComment>
                </ItemComment>
            </WrapperComment>
        </ScrollView>
    )
}

const Item = ({ user, content }) => {
    return (
        <ItemComment>
            <AvatarToProfile
                source={{
                    uri: baseURL + user.avatar,
                }}
                user_id={user.id}
            />
            <CommentText>{content}</CommentText>
        </ItemComment>
    )
}

export default PostDetailScreen
