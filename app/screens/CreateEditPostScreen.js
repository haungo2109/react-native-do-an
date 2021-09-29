import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../config/Colors"
import { useDispatch, useSelector } from "react-redux"
import Font from "../config/Font"
import { Alert, Platform, ToastAndroid } from "react-native"
import ImageInput from "../components/ImageInput"
import { postPostAction, updatePost } from "../redux/reducers/postReducer"
import findHashtags from "../utils/FindHashTag"
import {
    bgBack,
    bgBtnSubmit,
    bgItem,
    bgView,
    colorBtnSubmit,
    colorIcon,
    colorPlaceholder,
} from "../config/PropertyCss"

export const TextTitle = styled.Text`
    font-size: ${Font.bigger};
    color: ${Colors.gray8};
    font-weight: bold;
    margin-bottom: 15px;
`
const FormView = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
`
const Container = styled.View`
    flex: 1;
    background-color: ${bgBack};
`
const TextInput = styled.TextInput`
    flex: 1;
    color: ${Colors.gray7};
    font-size: ${Font.big};
`
const Icon = styled.View`
    margin-right: 10px;
`
export const Field = styled.View`
    height: ${(props) => props.height || "50px"};
    width: 95%;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
    background: ${bgItem};
`
const FieldImage = styled(Field)`
    height: 150px;
`
export const SubmitButton = styled.TouchableOpacity`
    height: 42px;
    width: 95%;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
    justify-content: center;
    margin-top: 10px;
    background-color: ${bgBtnSubmit};
`
export const TextSubmitButton = styled.Text`
    color: ${colorBtnSubmit};
    font-weight: bold;
`

const CreateEditPostScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { data, handleSubmit } = route.params
    const [input, setInput] = useState({ ...data })
    const theme = useSelector((s) => s.setting.theme)
    const handleMultiInput = (name) => {
        return (value) => {
            setInput((preState) => ({ ...preState, [name]: value }))
        }
    }
    useEffect(() => {
        if (data !== undefined && input.id !== data.id) setInput({ ...data })
    }, [data])

    const mapHandleSubmit = {
        addPost: () => {
            handelSubmitAddPost()
        },
        editPost: () => {
            handelSubmitEditPost()
        },
    }

    const handelSubmitEditPost = () => {
        const { content, post_images, id } = input
        const hashtag = findHashtags(content)
        const data = new FormData()
        if (post_images?.length && post_images !== data.post_images)
            post_images.forEach((item, i) => {
                data.append("images", {
                    uri:
                        Platform.OS === "ios"
                            ? item.uri.replace("file://", "")
                            : item.uri,
                    type:
                        "image/" +
                        item.uri.slice(item.uri.lastIndexOf(".") + 1),
                    name: item.filename || `filename${i}.jpg`,
                })
            })
        if (content && content !== data.content) data.append("content", content)
        if (hashtag && hashtag !== data.hashtag)
            data.append("hashtag", hashtag.map((c) => c.slice(1)).join(","))

        dispatch(updatePost({ id, data }))
            .unwrap()
            .then(handleSuccess)
            .catch(handleError)
    }
    const handelSubmitAddPost = () => {
        const { content, post_images } = input
        const hashtag = findHashtags(content)
        const data = new FormData()
        if (post_images.length !== 0)
            post_images.forEach((item, i) => {
                data.append("images", {
                    uri:
                        Platform.OS === "ios"
                            ? item.uri.replace("file://", "")
                            : item.uri,
                    type:
                        "image/" +
                        item.uri.slice(item.uri.lastIndexOf(".") + 1),
                    name: item.filename || `filename${i}.jpg`,
                })
            })
        if (content !== "") data.append("content", content)
        if (content === "" && post_images.length === 0)
            return Alert.alert(
                "Lưu ý:",
                "Bạn phải có nội dung hoặc hình ảnh để đăng."
            )
        if (hashtag !== "")
            data.append("hashtag", hashtag.map((c) => c.slice(1)).join(","))

        dispatch(postPostAction(data))
            .unwrap()
            .then(handleSuccess)
            .catch(handleError)
    }
    const handleError = (err) => {
        ToastAndroid.show("Đăng không thành công", ToastAndroid.SHORT)
    }
    const handleSuccess = () => {
        ToastAndroid.show("Đăng thành công", ToastAndroid.SHORT)
        navigation.goBack()
    }
    if (data && data?.content !== undefined)
        return (
            <Container themeColor={theme === "light"}>
                <FormView>
                    {input["content"] !== undefined && (
                        <Field height={"110px"} themeColor={theme === "light"}>
                            <Icon>
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={handleMultiInput("content")}
                                value={input["content"]}
                                placeholder="Nhập nội dung bài viết"
                                themeColor={theme === "light"}
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                            />
                        </Field>
                    )}
                    {input["post_images"] !== undefined && (
                        <FieldImage themeColor={theme === "light"}>
                            <Icon>
                                <FontAwesome
                                    name="image"
                                    size={24}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <ImageInput
                                photo={input["post_images"]}
                                setPhoto={handleMultiInput("post_images")}
                            />
                        </FieldImage>
                    )}
                    <SubmitButton
                        onPress={mapHandleSubmit[handleSubmit]}
                        themeColor={theme === "light"}
                    >
                        <TextSubmitButton themeColor={theme === "light"}>
                            ĐĂNG
                        </TextSubmitButton>
                    </SubmitButton>
                </FormView>
            </Container>
        )
    else
        return (
            <Container>
                <FormView>
                    <SubmitButton
                        onPress={() => {
                            navigation.navigate("App")
                        }}
                    >
                        <TextSubmitButton>Quay lại</TextSubmitButton>
                    </SubmitButton>
                </FormView>
            </Container>
        )
}

export default CreateEditPostScreen
