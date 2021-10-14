import React from "react"
import { Text } from "react-native"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Font from "../config/Font"
import { bgBack, colorText, colorTextTitle } from "../config/PropertyCss"
import i18n from "i18n-js"

const Container = styled.View`
    flex: 1;
    padding: 11px;
    background-color: ${bgBack};
`
const TextTitle = styled.Text`
    text-align: center;
    padding: 5px;
    font-size: ${Font.bigger};
    font-weight: bold;
    color: ${colorTextTitle};
`
const TextSession = styled.Text`
    padding: 5px;
    font-size: ${Font.bigger};
    font-weight: bold;
    text-align: left;
    color: ${colorTextTitle};
`
const TextContent = styled.Text`
    font-size: ${Font.big};
    color: ${colorText};
    line-height: 20px;
    margin: 3px 0;
    text-align: justify;
`

function IntroductionScreen(props) {
    const theme = useSelector((s) => s.setting.theme)
    return (
        <Container themeColor={theme === "light"}>
            <TextTitle themeColor={theme === "light"}>
                {i18n.t("txt.title-introduction")}
            </TextTitle>
            <TextContent themeColor={theme === "light"}>
                {i18n.t("txt.content-introduction")}
            </TextContent>
            <TextSession themeColor={theme === "light"}>
                {i18n.t("txt.feature-app")}
            </TextSession>
            <TextContent themeColor={theme === "light"}>
                {i18n.t("txt.content-feature")}
            </TextContent>
        </Container>
    )
}

export default IntroductionScreen
