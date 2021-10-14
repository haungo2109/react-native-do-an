import React, { useState } from "react"
import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {
    ImageBackground,
    Container,
    LogoWrapper,
    LogoImage,
} from "./WellcomeScreen"
import { Feather } from "@expo/vector-icons"
import styled from "styled-components/native"
import useModelImageSelection from "../hooks/useModelImageSelection"
import { useDispatch, useSelector } from "react-redux"
import { registerUserAction } from "../redux/reducers/userReducer"
import Colors from "../config/Colors"
import i18n from "i18n-js"

const WapperInput = styled.View`
    width: 75%;
    height: 42px;
    flex-direction: row;
    border-radius: 21px;
    background: #f3f4f6;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`
const GroupButton = styled(LinearGradient)`
    flex: 6;
    width: 100%;
    align-items: center;
    justify-content: center;
`
const ButtonBorder = styled.TouchableOpacity`
    width: 75%;
    height: 42px;
    border-radius: 21px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    background-color: transparent;
    border: 1px solid #f3f4f6;
`
const TextButtonBorder = styled.Text`
    color: #f3f4f6;
`
const Input = styled.TextInput`
    flex: 1;
    justify-content: center;
    text-align: center;
`
const InputImageButton = styled.TouchableOpacity``
const TextInputImage = styled.Text``
const Icon = styled.View`
    margin-right: 6px;
    position: absolute;
    left: 15px;
`
const ErrorText = styled.Text`
    color: ${Colors.gray1};
    font-size: 12px;
    padding: 2px;
    border-radius: 2px;
    background-color: ${Colors.red5};
`
const initState = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    error: "",
}
function RegisterScreen({ navigation }, props) {
    const dispatch = useDispatch()

    const [input, setInput] = useState(initState)

    const handleMultiInput = (name) => {
        return (value) => {
            setInput((preState) => ({ ...preState, [name]: value }))
        }
    }

    const { showModelImageSelection, hiddenModelImageSelection } =
        useModelImageSelection(1, 1)
    const { images } = useSelector((state) => state.controller.imageSelection)

    const handleRegister = () => {
        const { username, password, email, first_name, last_name } = input
        let data = new FormData()
        let item = images[0]
        data.append("avatar", {
            uri:
                Platform.OS === "ios"
                    ? item.uri.replace("file://", "")
                    : item.uri,
            type: "image/" + item.uri.slice(item.uri.lastIndexOf(".") + 1),
            name: item.filename || `filename${i}.jpg`,
        })
        data.append("first_name", first_name)
        data.append("last_name", last_name)
        data.append("username", username)
        data.append("password", password)
        data.append("email", email)

        dispatch(registerUserAction(data))
            .unwrap()
            .then((res) => {
                hiddenModelImageSelection()
                navigation.navigate("Login", { username, password })
            })
            .catch((err) => {
                setInput((state) => ({ ...state, error: err.message }))
            })
    }

    return (
        <ImageBackground
            source={require("./../assets/images/background/story2.jpg")}
        >
            <Container>
                <LogoWrapper>
                    <LogoImage source={require("./../assets/logo/logo.png")} />
                </LogoWrapper>

                <GroupButton colors={["rgba(2,0,36,0)", "rgba(10,9,15,1)"]}>
                    {input.error !== "" ? (
                        <ErrorText>{input.error}</ErrorText>
                    ) : null}
                    <InputImageForm
                        onPress={showModelImageSelection}
                        images={images}
                    />
                    <InputForm
                        icon="edit-3"
                        placeholder={i18n.t("placeholder.first-name")}
                        value={input.first_name}
                        onChangeText={handleMultiInput("first_name")}
                    />
                    <InputForm
                        icon="edit-3"
                        placeholder={i18n.t("placeholder.last-name")}
                        value={input.last_name}
                        onChangeText={handleMultiInput("last_name")}
                    />
                    <InputForm
                        icon="user"
                        placeholder={i18n.t("placeholder.username")}
                        value={input.username}
                        onChangeText={handleMultiInput("username")}
                    />
                    <InputForm
                        icon="mail"
                        placeholder={i18n.t("placeholder.email")}
                        value={input.email}
                        onChangeText={handleMultiInput("email")}
                    />
                    <InputForm
                        icon="lock"
                        placeholder={i18n.t("placeholder.password")}
                        value={input.password}
                        onChangeText={handleMultiInput("password")}
                        secureTextEntry={true}
                    />
                    <ButtonBorder onPress={handleRegister}>
                        <TextButtonBorder>
                            {i18n.t("btn.register")}
                        </TextButtonBorder>
                    </ButtonBorder>
                </GroupButton>
            </Container>
        </ImageBackground>
    )
}

const InputForm = ({
    icon,
    value,
    placeholder,
    onChangeText,
    secureTextEntry,
}) => {
    return (
        <WapperInput>
            <Icon>
                <Feather name={icon} size={24} color="black" />
            </Icon>
            <Input
                secureTextEntry={secureTextEntry || false}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
            />
        </WapperInput>
    )
}
const InputImageForm = ({ onPress, images }) => {
    return (
        <WapperInput>
            <Icon>
                <Feather name="image" size={24} color="black" />
            </Icon>
            <InputImageButton onPress={onPress}>
                <TextInputImage>
                    {images
                        ? images[0].filename.slice(0, 25)
                        : i18n.t("placeholder.avatar")}
                </TextInputImage>
            </InputImageButton>
        </WapperInput>
    )
}

export default RegisterScreen
