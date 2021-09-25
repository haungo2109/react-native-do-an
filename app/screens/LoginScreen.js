import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text } from "react-native"
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
import converObjToFormData from "../utils/ObjectToFormData"
import { client_id, client_secret } from "../api/apiClient"
import { useDispatch, useSelector } from "react-redux"
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
        // let formData = converObjToFormData({ username, password, client_secret, client_id });
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
        <ImageBackground source={require("./../assets/story2.jpg")}>
            <Container>
                <Logo>
                    <Text>RegsterScreen view ahihi</Text>
                </Logo>
                <GroupButton colors={["rgba(2,0,36,0)", "rgba(10,9,15,1)"]}>
                    {error !== "" && <ErrorText>{error}</ErrorText>}
                    {/* {loading && (
						<ActivityIndicator size="small" color="white" />
					)} */}
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
                            placeholder="Username"
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
                            placeholder="Password"
                        />
                    </WapperInput>
                    <ButtonBorder>
                        <TextButtonBorder onPress={handleLogin}>
                            Login
                        </TextButtonBorder>
                    </ButtonBorder>
                    <SmallText>Forgot your password?</SmallText>
                    <ButtonLink onPress={handleSetPassword}>
                        <TextLink>Reset Password</TextLink>
                    </ButtonLink>
                </GroupButton>
            </Container>
        </ImageBackground>
    )
}

export default LoginScreen
