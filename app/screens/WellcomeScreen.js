import React, { useEffect, useState } from "react"
import { Alert, Text } from "react-native"
import styled from "styled-components/native"
import { FontAwesome5 } from "@expo/vector-icons"
import Colors from "../config/Colors"
import i18n from "i18n-js"
import * as GoogleSignIn from "expo-google-sign-in"
import * as Facebook from "expo-facebook"
import { useDispatch } from "react-redux"
import { loginByGoogleAction } from "../redux/actions"
import { pushTokenUserAction } from "../redux/reducers/userReducer"

const ImageBackground = styled.ImageBackground`
    flex: 1;
    height: 100%;
    resize-mode: cover;
    border-radius: 20px;
`
const Container = styled.View`
    flex: 1;
    flex-direction: column;
`
const LogoWrapper = styled.View`
    flex: 3;
    align-items: center;
    justify-content: center;
`
const LogoImage = styled.Image`
    width: 150px;
    height: 150px;
`
const LogoText = styled.Text`
    color: white;
    font-size: 15px;
`
const GroupButton = styled.View`
    flex: 6;
    align-items: center;
    justify-content: center;
`
const Button = styled.TouchableOpacity`
    width: 75%;
    height: 42px;
    flex-direction: row;
    border-radius: 21px;
    background: #eeeeee;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`
const ButtonFacebook = styled(Button)`
    background-color: ${Colors.facebookColor};
`
const ButtonLogin = styled(Button)`
    background-color: transparent;
    border: 1px solid;
`
const TextButtonFacebook = styled.Text`
    color: #f3f4f6;
`
const TextButtonLogin = styled.Text`
    color: #f3f4f6;
`
const ButtonLink = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    margin-top: 5px;
`
const Icon = styled.View`
    margin-right: 6px;
    position: absolute;
    left: 15px;
`
const TextLink = styled.Text`
    font-weight: bold;
    font-size: 13px;
    color: #d1d5db;
`
const SmallText = styled.Text`
    margin-top: 20px;
    font-size: 11px;
    color: #9ca3af;
`
export {
    ImageBackground,
    Container,
    LogoWrapper,
    LogoImage,
    LogoText,
    ButtonLink,
    TextLink,
    SmallText,
}

function WellcomeScreen({ navigation }, props) {
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        initAsync()
    }, [])
    const handleLoginGoogle = () => {
        signInAsync()
    }
    const handleLoginFacebook = () => {
        logInFacebook()
    }
    const handleLoginAccount = () => {
        navigation.navigate("Login")
    }
    const handleCreate = () => {
        navigation.navigate("Register")
    }
    const initAsync = async () => {
        await GoogleSignIn.initAsync({
            clientId:
                "972868105319-oc23en8rdr7bg9h9ja8agt48btuu32m4.apps.googleusercontent.com",
        })
    }
    const _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync()
        if (user) {
            dispatch(loginByGoogleAction(user))
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
                    Alert.alert("Lỗi", err.message)
                })
        }
        setUser(user)
    }
    const signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync()
            const { type, user } = await GoogleSignIn.signInAsync()
            if (type === "success") {
                _syncUserWithStateAsync()
            }
        } catch ({ message }) {
            alert("login: Error:" + message)
        }
    }
    const signOutAsync = async () => {
        await GoogleSignIn.signOutAsync()
        setUser(null)
    }
    async function logInFacebook() {
        try {
            await Facebook.initializeAsync({
                appId: "232435275583717",
            })
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            })
            if (type === "success") {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}`
                )
                Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`)
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`)
        }
    }

    return (
        <ImageBackground
            source={require("./../assets/images/background/story2.jpg")}
        >
            <Container>
                <LogoWrapper>
                    <LogoImage source={require("./../assets/logo/logo.png")} />
                    <LogoText>{i18n.t("txt.slogan-app")}</LogoText>
                </LogoWrapper>
                <GroupButton>
                    <ButtonFacebook onPress={handleLoginFacebook}>
                        <Icon>
                            <FontAwesome5
                                name="facebook-f"
                                size={24}
                                color="white"
                            />
                        </Icon>
                        <TextButtonFacebook>Facebook</TextButtonFacebook>
                    </ButtonFacebook>
                    <Button onPress={handleLoginGoogle}>
                        <Icon>
                            <FontAwesome5
                                name="google"
                                size={24}
                                color={"red"}
                            />
                        </Icon>
                        <Text>Google</Text>
                    </Button>
                    <ButtonLogin onPress={handleLoginAccount}>
                        <TextButtonLogin>{i18n.t("btn.login")}</TextButtonLogin>
                    </ButtonLogin>
                    <SmallText>{i18n.t("txt.dont-have-account")}</SmallText>
                    <ButtonLink onPress={handleCreate}>
                        <TextLink>{i18n.t("btn.create-account")}</TextLink>
                    </ButtonLink>
                </GroupButton>
            </Container>
        </ImageBackground>
    )
}

export default WellcomeScreen
