import React, { useState } from "react"
import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {
    ImageBackground,
    Container,
    Logo,
    ButtonLink,
    TextLink,
    SmallText,
} from "./WellcomeScreen"
import { FontAwesome, Feather } from "@expo/vector-icons"
import styled from "styled-components/native"
import i18n from "i18n-js"
import { client_id, client_secret } from "../api/apiClient"
import { useDispatch } from "react-redux"
import { loginAction } from "../redux/actions"
import Colors from "../config/Colors"
import { pushTokenUserAction } from "../redux/reducers/userReducer"

const WapperInput = styled.View`
    width: 75%;
    height: 42px;
    flex-direction: row;
    border-radius: 21px;
    background: #eeeeee;
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
const ErrorText = styled.Text`
    color: ${Colors.gray1};
    font-size: 12px;
    padding: 2px;
    border-radius: 2px;
    background-color: ${Colors.red5};
`
const Input = styled.TextInput``
const Icon = styled.View`
    margin-right: 6px;
    position: absolute;
    left: 15px;
`
function LoginScreen({ navigation, route }, props) {
    const [username, setUsername] = useState(
        route?.params?.username || "haungo1"
    )
    const [password, setPassword] = useState(
        route?.params?.password || "123456"
    )
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const handleLogin = () => {
        let formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        formData.append("client_id", client_id)
        formData.append("client_secret", client_secret)
        formData.append("grant_type", "password")

        dispatch(loginAction(formData))
            .unwrap()
            .then(() => {
                if (props?.expoPushToken && props.expoPushToken !== "") {
                    let formPushToken = new FormData()
                    formPushToken.append("push_token", expoPushToken)
                    dispatch(pushTokenUserAction(formPushToken))
                }
                navigation.navigate("App")
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    const handleSetPassword = () => {}

    return (
        <ImageBackground
            source={require("./../assets/images/background/story2.jpg")}
        >
            <Container>
                <Logo>
                    <Text>RegsterScreen view ahihi</Text>
                </Logo>
                <GroupButton colors={["rgba(2,0,36,0)", "rgba(10,9,15,1)"]}>
                    {error !== "" && <ErrorText>{error}</ErrorText>}
                    <WapperInput>
                        <Icon>
                            <FontAwesome
                                name="user-o"
                                size={24}
                                color="black"
                            />
                        </Icon>
                        <Input
                            onChangeText={setUsername}
                            value={username}
                            placeholder={i18n.t("placeholder.username")}
                        />
                    </WapperInput>
                    <WapperInput>
                        <Icon>
                            <Feather name="lock" size={24} color="black" />
                        </Icon>
                        <Input
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={password}
                            placeholder={i18n.t("placeholder.password")}
                        />
                    </WapperInput>
                    <ButtonBorder>
                        <TextButtonBorder onPress={handleLogin}>
                            {i18n.t("btn.login")}
                        </TextButtonBorder>
                    </ButtonBorder>
                    <SmallText>{i18n.t("txt.fogot-pass")}</SmallText>
                    <ButtonLink onPress={handleSetPassword}>
                        <TextLink>{i18n.t("btn.reset-pass")}</TextLink>
                    </ButtonLink>
                </GroupButton>
            </Container>
        </ImageBackground>
    )
}

export default LoginScreen
