import React from "react"

import { ScrollView } from "react-native"

import styled from "styled-components/native"

import { MaterialCommunityIcons } from "@expo/vector-icons"

import AvatarToProfile from "./Avatar"

const Container = styled.View`
    width: 100%;
    height: 58px;
    flex-direction: row;
    align-items: center;
`
const Room = styled.TouchableOpacity`
    width: 115px;
    height: 40px;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    border-width: 1px;
    border-color: #82b1ff;
    padding: 0 15px;
    margin-right: 12px;
`
const Text = styled.Text`
    color: #1777f2;
    font-size: 12px;
    padding-left: 6px;
`
const User = styled.View`
    margin-right: 13px;
`
const BottomDivider = styled.View`
    width: 100%;
    height: 9px;
    background: #f0f2f5;
`

const Users = () => {
    return (
        <>
            <Container>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: 11 }}
                >
                    <User>
                        <AvatarToProfile
                            source={require("../assets/images/users/user1.jpg")}
                            online={true}
                        />
                    </User>
                    <User>
                        <AvatarToProfile
                            source={require("../assets/images/users/user3.jpg")}
                            online={true}
                        />
                    </User>
                    <User>
                        <AvatarToProfile
                            source={require("../assets/images/users/user4.jpg")}
                        />
                    </User>
                    <User>
                        <AvatarToProfile
                            source={require("../assets/images/users/user5.jpg")}
                        />
                    </User>
                    <User>
                        <AvatarToProfile
                            source={require("../assets/images/users/user3.jpg")}
                        />
                    </User>
                    <User>
                        <AvatarToProfile
                            source={require("../assets/images/users/user3.jpg")}
                        />
                    </User>
                    <User>
                        <AvatarToProfile
                            source={require("../assets/images/users/user3.jpg")}
                        />
                    </User>
                </ScrollView>
            </Container>
            <BottomDivider />
        </>
    )
}

export default Users
