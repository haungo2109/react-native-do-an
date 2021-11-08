import React from "react"
import Colors from "../config/Colors"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { baseURL } from "../api/apiClient"
import { AirbnbRating, Rating } from "react-native-ratings"
import ICON_STAR from "./../assets/icon/icons8-star-48.png"
import { AntDesign } from "@expo/vector-icons"
import { colorIconDrawDark, colorIconDrawLight } from "../config/PropertyCss"

const Avatar = styled.Image`
    border-radius: 200px;
    width: 50px;
    height: 50px;
`
const Container = styled.View`
    padding-left: 20px;
    margin-bottom: 15px;
`
const WrapperAvatar = styled.View`
    flex-direction: row;
    margin-top: 15px;
`
const WrapperTextAvatar = styled.View`
    margin-left: 15px;
    flex-direction: column;
`
const TextName = styled.Text`
    font-size: 16px;
    margin-top: 3px;
    font-weight: bold;
    color: ${(p) => (!p.themeColor ? Colors.gray3 : Colors.gray5)};
`
const Caption = styled.Text`
    font-size: 14px;
    line-height: 14px;
    color: ${(p) => (!p.themeColor ? Colors.gray3 : Colors.gray5)};
`
const WrapperExtraInfo = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
function TopDrawer(props) {
    const user = useSelector((s) => s.user)
    const theme = useSelector((s) => s.setting.theme)

    return (
        <>
            <Container themeColor={theme === "light"}>
                <WrapperAvatar>
                    <Avatar source={{ uri: baseURL + user.avatar }} />

                    <WrapperTextAvatar
                        style={{ marginLeft: 15, flexDirection: "column" }}
                    >
                        <TextName themeColor={theme === "light"}>
                            {user.first_name + " " + user.last_name}
                        </TextName>
                        <Caption themeColor={theme === "light"}>@Kanj</Caption>
                    </WrapperTextAvatar>
                </WrapperAvatar>
                {user.rating && (
                    <WrapperExtraInfo>
                        {[0, 2, 4, 6, 8].map((c, i) =>
                            c <= user.rating ? (
                                <AntDesign
                                    key={i}
                                    name="star"
                                    size={24}
                                    color={
                                        theme === "light"
                                            ? colorIconDrawLight(
                                                  c < user.rating
                                              )
                                            : colorIconDrawDark(c < user.rating)
                                    }
                                />
                            ) : (
                                <AntDesign
                                    key={i}
                                    name="staro"
                                    size={24}
                                    color={
                                        theme === "light"
                                            ? colorIconDrawLight(
                                                  c < user.rating
                                              )
                                            : colorIconDrawDark(c < user.rating)
                                    }
                                />
                            )
                        )}
                    </WrapperExtraInfo>
                )}
            </Container>
        </>
    )
}

export default TopDrawer
