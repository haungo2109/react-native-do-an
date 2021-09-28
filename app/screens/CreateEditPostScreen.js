import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../config/Colors"
import { useDispatch } from "react-redux"
import Font from "../config/Font"
import { Alert, Platform, ToastAndroid } from "react-native"
import ImageInput from "../components/ImageInput"
import { postPostAction, updatePost } from "../redux/reducers/postReducer"
import findHashtags from "../utils/FindHashTag"

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
    background-color: ${Colors.gray1};
`
const Container = styled.View`
    flex: 1;
    background-color: ${Colors.gray6o5};
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
    background: ${Colors.gray2};
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
    background-color: ${Colors.facebookColor};
`
export const TextSubmitButton = styled.Text`
    color: ${Colors.gray2};
    font-weight: bold;
`

const CreateEditPostScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { data, handleSubmit } = route.params
    const [input, setInput] = useState({ ...data })

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
            <Container>
                <FormView>
                    {input["content"] !== undefined && (
                        <Field height={"110px"}>
                            <Icon>
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={handleMultiInput("content")}
                                value={input["content"]}
                                placeholder="Nhập nội dung bài viết"
                            />
                        </Field>
                    )}
                    {/* {input["hashtag"] !== undefined && (
                        <Field>
                            <Icon>
                                <FontAwesome
                                    name="hashtag"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <TextInput
                                onChangeText={handleMultiInput("hashtag")}
                                value={input["hashtag"]}
                                placeholder="Thêm hashtag"
                            />
                        </Field>
                    )} */}
                    {input["post_images"] !== undefined && (
                        <FieldImage>
                            <Icon>
                                <FontAwesome
                                    name="image"
                                    size={24}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <ImageInput
                                photo={input["post_images"]}
                                setPhoto={handleMultiInput("post_images")}
                            />
                        </FieldImage>
                    )}
                    <SubmitButton onPress={mapHandleSubmit[handleSubmit]}>
                        <TextSubmitButton>ĐĂNG</TextSubmitButton>
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
