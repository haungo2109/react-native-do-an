import React from "react"
import Colors from "../config/Colors"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { baseURL } from "../api/apiClient"

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
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
`
const WrapperTextInfo = styled.View`
    flex-direction: row;
    align-items: center;
    margin-right: 15px;
`
const TextFigure = styled.Text`
    font-weight: bold;
    margin-right: 3px;
    font-size: 14px;
    line-height: 14px;
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
                        <Caption themeColor={theme === "light"}>@KanJ</Caption>
                    </WrapperTextAvatar>
                </WrapperAvatar>
                {/* <WrapperExtraInfo>
                    <WrapperTextInfo>
                        <TextFigure>80</TextFigure>
                        <Caption>Following</Caption>
                    </WrapperTextInfo>
                    <WrapperTextInfo>
                        <TextFigure>100</TextFigure>
                        <Caption>Followers</Caption>
                    </WrapperTextInfo>
                </WrapperExtraInfo> */}
            </Container>
        </>
    )
}

export default TopDrawer
