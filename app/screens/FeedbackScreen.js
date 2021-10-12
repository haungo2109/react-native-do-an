import React, { useState } from "react"
import styled from "styled-components"
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome,
} from "@expo/vector-icons"
import Colors from "../config/Colors"
import { Picker } from "@react-native-picker/picker"
import {
    Field,
    SubmitButton,
    TextSubmitButton,
    TextTitle,
} from "./CreateEditAuctionScreen"
import Font from "../config/Font"
import i18n from "i18n-js"
import { useDispatch, useSelector } from "react-redux"
import {
    bgBack,
    bgItem,
    bgView,
    colorCaption,
    colorPlaceholder,
    colorText,
} from "../config/PropertyCss"
import { postFeedbackAction } from "../redux/actions"
import { ToastAndroid } from "react-native"

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${bgBack};
`
const FormView = styled.View`
    width: 95%;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    background-color: ${bgView};
    border-radius: 10px;
`
const Row = styled.View`
    width: 95%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const Icon = styled.View`
    margin-right: 10px;
`
const WrapperLabel = styled.View`
    width: 95%;
    margin-top: 15px;
    margin-bottom: 5px;
`
const LabelField = styled.Text`
    justify-content: center;
    align-items: flex-start;
    color: ${colorText};
`
const TextInput = styled.TextInput`
    flex: 1;
    padding: 7px 0;
    color: ${colorText};
    font-size: ${Font.big};
`
function FeedbackScreen(props) {
    const dispatch = useDispatch()
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const theme = useSelector((s) => s.setting.theme)

    const handleSubmitFeeback = () => {
        let data = { content, title }
        dispatch(postFeedbackAction(data))
            .unwrap()
            .then((res) => {
                ToastAndroid.show(
                    i18n.t("txt.post-success"),
                    ToastAndroid.SHORT
                )
            })
            .catch((err) => {
                ToastAndroid.show(i18n.t("txt.post-fail"), ToastAndroid.SHORT)
            })
    }
    return (
        <Container themeColor={theme === "light"}>
            <FormView themeColor={theme === "light"}>
                <Row>
                    <TextTitle themeColor={theme === "light"}>
                        {i18n.t("txt.title-feedback")}
                    </TextTitle>
                </Row>
                <WrapperLabel>
                    <LabelField themeColor={theme === "light"}>
                        {i18n.t("txt.label-title")}
                    </LabelField>
                </WrapperLabel>
                <Field themeColor={theme === "light"}>
                    <Icon>
                        <MaterialIcons
                            name="title"
                            size={25}
                            color={Colors.gray6}
                        />
                    </Icon>
                    <TextInput
                        onChangeText={setTitle}
                        value={title}
                        placeholder={i18n.t("placeholder.exam-title-feedback")}
                        themeColor={theme === "light"}
                        placeholderTextColor={colorPlaceholder({
                            themeColor: theme === "light",
                        })}
                    />
                </Field>
                <WrapperLabel>
                    <LabelField themeColor={theme === "light"}>
                        {i18n.t("txt.label-content")}
                    </LabelField>
                </WrapperLabel>
                <Field height={"200px"} themeColor={theme === "light"}>
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
                        onChangeText={setContent}
                        value={content}
                        placeholder={i18n.t(
                            "placeholder.exam-content-feedback"
                        )}
                        themeColor={theme === "light"}
                        placeholderTextColor={colorPlaceholder({
                            themeColor: theme === "light",
                        })}
                    />
                </Field>
                <SubmitButton
                    themeColor={theme === "light"}
                    onPress={handleSubmitFeeback}
                >
                    <TextSubmitButton themeColor={theme === "light"}>
                        GỬI
                    </TextSubmitButton>
                </SubmitButton>
            </FormView>
        </Container>
    )
}

export default FeedbackScreen
