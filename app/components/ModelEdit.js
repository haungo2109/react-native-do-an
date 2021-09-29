import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import {
    Entypo,
    FontAwesome,
    FontAwesome5,
    AntDesign,
} from "@expo/vector-icons"
import Colors from "../config/Colors"
import { useDispatch, useSelector } from "react-redux"
import Font from "../config/Font"
import useModelEdit from "../hooks/useModelEdit"
import { updateCurrenUserAction } from "../redux/reducers/userReducer"
import i18n from "i18n-js"
import {
    bgBack,
    bgBtn,
    bgBtnSubmit,
    bgItem,
    bgModel,
    bgView,
    colorBtnSubmit,
    colorCaption,
    colorIcon,
    colorPlaceholder,
    colorText,
    colorTextTitle,
} from "../config/PropertyCss"

const Row = styled.View`
    width: 95%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const WrapperButtonClose = styled.View`
    position: absolute;
    right: 0;
    top: 0;
`
const ButtonClose = styled.TouchableWithoutFeedback`
    border-radius: 10px;
    background-color: ${bgBtn};
`
export const TextTitle = styled.Text`
    font-size: ${Font.bigger};
    color: ${colorTextTitle};
    font-weight: bold;
    margin-bottom: 15px;
`
const FormView = styled.View`
    width: 95%;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    background-color: ${bgView};
    border-radius: 10px;
    border: 1px;
    border-color: ${colorCaption};
`
const Container = styled.View`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${bgModel};
`
const TextInput = styled.TextInput`
    flex: 1;
    color: ${colorText};
    font-size: ${Font.big};
`
const Icon = styled.View`
    margin-right: 10px;
`
export const Field = styled.View`
    height: 50px;
    width: 95%;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
    background: ${bgItem};
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
const ErrorText = styled.Text`
    color: ${Colors.gray1};
    font-size: 12px;
    padding: 2px;
    border-radius: 2px;
    background-color: ${Colors.red5};
`
const ModelEdit = () => {
    const dispatch = useDispatch()
    const { id, show, title, data, handleSubmit } = useSelector(
        (s) => s.controller.editPost
    )
    const [error, setError] = useState("")
    const [input, setInput] = useState({ ...data })
    const theme = useSelector((s) => s.setting.theme)
    const { hiddenModelEdit } = useModelEdit()

    const handleMultiInput = (name) => {
        return (value) => {
            setInput((preState) => ({ ...preState, [name]: value }))
        }
    }
    useEffect(() => {
        setInput({ ...data })
    }, [data])

    const mapHandleSubmit = {
        editProfile: () => {
            handleSubmitProfile()
        },
    }

    const handleSubmitProfile = () => {
        const { birthday, email, phone, address, first_name, last_name } = input
        const formData = new FormData()
        formData.append("first_name", first_name)
        formData.append("last_name", last_name)
        formData.append("email", email)
        formData.append("birthday", birthday)
        formData.append("phone", phone)
        formData.append("address", address)

        dispatch(updateCurrenUserAction({ id, data: formData }))
            .unwrap()
            .then(handleSuccess)
            .catch(handleError)
    }
    const handleError = (err) => {
        setError(err.message)
    }
    const handleSuccess = () => {
        setError("")
        hiddenModelEdit()
    }
    if (show)
        return (
            <Container themeColor={theme === "light"}>
                <FormView themeColor={theme === "light"}>
                    <Row>
                        <TextTitle themeColor={theme === "light"}>
                            {title || ""}
                        </TextTitle>
                        <WrapperButtonClose>
                            <ButtonClose onPress={hiddenModelEdit}>
                                <AntDesign
                                    name="close"
                                    size={25}
                                    color={colorIcon(theme == "light")}
                                />
                            </ButtonClose>
                        </WrapperButtonClose>
                    </Row>
                    {error !== "" && <ErrorText>{error}</ErrorText>}
                    {input["first_name"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <AntDesign
                                    name="edit"
                                    size={25}
                                    color={colorIcon(theme == "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                onChangeText={handleMultiInput("first_name")}
                                value={input.first_name}
                                placeholder={i18n.t("placeholder.first-name")}
                            />
                        </Field>
                    )}
                    {input["last_name"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <AntDesign
                                    name="edit"
                                    size={25}
                                    color={colorIcon(theme == "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                onChangeText={handleMultiInput("last_name")}
                                value={input.last_name}
                                placeholder={i18n.t("placeholder.last-name")}
                            />
                        </Field>
                    )}
                    {input["birthday"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <FontAwesome
                                    name="birthday-cake"
                                    size={25}
                                    color={colorIcon(theme == "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                onChangeText={handleMultiInput("birthday")}
                                value={input.birthday}
                                placeholder={i18n.t("placeholder.birthday")}
                            />
                        </Field>
                    )}
                    {input["email"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <Entypo
                                    name="email"
                                    size={25}
                                    color={colorIcon(theme == "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                onChangeText={handleMultiInput("email")}
                                value={input["email"]}
                                placeholder={i18n.t("placeholder.email")}
                            />
                        </Field>
                    )}
                    {input["phone"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <FontAwesome
                                    name="phone"
                                    size={25}
                                    color={colorIcon(theme == "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                onChangeText={handleMultiInput("phone")}
                                value={input["phone"]}
                                placeholder={i18n.t("placeholder.phone")}
                            />
                        </Field>
                    )}
                    {input["address"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <FontAwesome5
                                    name="home"
                                    size={25}
                                    color={colorIcon(theme == "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                onChangeText={handleMultiInput("address")}
                                value={input["address"]}
                                placeholder={i18n.t("placeholder.address")}
                            />
                        </Field>
                    )}
                    <SubmitButton
                        onPress={mapHandleSubmit[handleSubmit]}
                        themeColor={theme === "light"}
                    >
                        <TextSubmitButton themeColor={theme === "light"}>
                            {i18n.t("btn.post-model")}
                        </TextSubmitButton>
                    </SubmitButton>
                </FormView>
            </Container>
        )
    else return null
}

export default ModelEdit
