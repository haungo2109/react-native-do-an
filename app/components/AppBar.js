import React, { useEffect } from "react"
import styled from "styled-components/native"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/core"
import Colors from "../config/Colors"

const Container = styled.View`
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`
const ButtonDrawer = styled.TouchableOpacity``
const Text = styled.Text`
    color: ${Colors.facebookColor};
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
    background: #eeeeee;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    padding: 4px;
`

const AppBar = ({ navigation, route }) => {
    const handleButton = () => {
        if (route.name === "HomeStack") {
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
                <Text>Kanj</Text>
            </ButtonDrawer>
            <Row>
                <Button onPress={handleButton}>
                    <Feather name="search" size={27} color="black" />
                </Button>
            </Row>
        </Container>
    )
}

export default AppBar
