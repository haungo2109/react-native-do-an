import React, { useEffect } from "react"
import styled from "styled-components/native"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/core"
import Colors from "../config/Colors"
import { useSelector } from "react-redux"
import { bgItem, bgView } from "../config/PropertyCss"

const Container = styled.View`
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    /* background-color: ${bgView}; */
`
const ButtonDrawer = styled.TouchableOpacity``
const Text = styled.Text`
    color: ${(props) =>
        props.themeColor ? Colors.facebookColor : Colors.blue4};
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
`
const Row = styled.View`
    justify-content: center;
    flex-direction: row;
    margin-right: 16px;
`
const Button = styled.TouchableOpacity`
    border-radius: 21px;
    background: ${bgItem};
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    padding: 4px;
`

const AppBar = ({ navigation, route }) => {
    const theme = useSelector((s) => s.setting.theme)

    const handleButton = () => {
        if (route.name === "PostStack") {
            navigation.navigate("Search", { type: "post" })
        } else if (route.name === "AuctionStack") {
            navigation.navigate("Search", { type: "auction" })
        }
    }
    return (
        <Container>
            <ButtonDrawer
                onPress={() => {
                    navigation.toggleDrawer()
                }}
            >
                <Text themeColor={theme === "light"}>Kanj</Text>
            </ButtonDrawer>
            <Row>
                <Button onPress={handleButton} themeColor={theme === "light"}>
                    <Feather name="search" size={27} color="black" />
                </Button>
            </Row>
        </Container>
    )
}

export default AppBar
