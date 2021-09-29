import React from "react"
import { Text } from "react-native"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { bgBack } from "../config/PropertyCss"

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${bgBack};
`

function IntroductionScreen(props) {
    const theme = useSelector((s) => s.setting.theme)
    return (
        <Container themeColor={theme === "light"}>
            <Text>Đây là phần giới thiệu Kanj</Text>
        </Container>
    )
}

export default IntroductionScreen
