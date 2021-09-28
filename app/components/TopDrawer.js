import React from "react"
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
`
const Caption = styled.Text`
    font-size: 14px;
    line-height: 14px;
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

    return (
        <>
            <Container>
                <WrapperAvatar>
                    <Avatar source={{ uri: baseURL + user.avatar }} />

                    <WrapperTextAvatar
                        style={{ marginLeft: 15, flexDirection: "column" }}
                    >
                        <TextName>
                            {user.first_name + " " + user.last_name}
                        </TextName>
                        <Caption>@KanJ</Caption>
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
