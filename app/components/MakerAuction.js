import React from "react"
import styled from "styled-components/native"
import {
    Ionicons,
    Feather,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons"

import AvatarToProfile from "./Avatar"
import { useDispatch, useSelector } from "react-redux"
import { baseURL } from "../api/apiClient"
import useModelEdit from "../hooks/useModelEdit"
import Colors from "../config/Colors"

const Container = styled.View`
    width: 100%;
    height: 92px;
`
const Row = styled.View`
    flex-direction: row;
    background: ${Colors.gray};
    width: 100%;
    padding: 0 11px;
    align-items: center;
`
const Input = styled.TextInput`
    height: 50px;
    width: 100%;
    padding: 0 8px;
`
const Divider = styled.View`
    width: 100%;
    height: 0.5px;
    background: #f0f0f0;
`
const Menu = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 42px;
`
const MenuText = styled.Text`
    padding-left: 11px;
    font-weight: 500;
    font-size: 12px;
`
const Separator = styled.View`
    width: 1px;
    height: 26px;
    background: #f0f0f0;
`
const BottomDivider = styled.View`
    width: 100%;
    height: 9px;
    background: #f0f2f5;
`
const ButtonType = styled.TouchableOpacity`
    flex: 1;
`

const MakerAuction = () => {
    const user = useSelector((state) => state.user)
    const { showModelEdit } = useModelEdit("Tạo đấu giá...")

    if (!user) {
        ;<></>
    } else
        return (
            <>
                <Container>
                    <Row>
                        <AvatarToProfile
                            source={{ uri: baseURL + user.avatar }}
                            user_id={user.id}
                        />
                        <ButtonType
                            onPress={() =>
                                showModelEdit({
                                    handleSubmit: "addAuction",
                                    data: {
                                        title: "",
                                        content: "",
                                        auction_images: [],
                                        base_price: "",
                                        condition: "",
                                        deadline: "",
                                        category: "0",
                                    },
                                })
                            }
                        >
                            <Input
                                editable={false}
                                placeholder="Hãy tạo đấu giá cho riêng bạn?"
                            />
                        </ButtonType>
                    </Row>
                    <Divider />
                    <Row>
                        <Menu>
                            <MaterialIcons
                                name="photo-size-select-actual"
                                size={20}
                                color="#4CAF50"
                            />
                            <MenuText>Hình ảnh</MenuText>
                        </Menu>
                        <Separator />

                        <Menu>
                            <Ionicons
                                name="text"
                                size={22}
                                color={Colors.yellow7}
                            />
                            <MenuText>Nội dung</MenuText>
                        </Menu>
                        <Separator />
                        <Menu>
                            <MaterialCommunityIcons
                                name="currency-usd"
                                size={22}
                                color={Colors.yellow4}
                            />
                            <MenuText>Giá</MenuText>
                        </Menu>
                    </Row>
                </Container>
                <BottomDivider />
            </>
        )
}

export default MakerAuction
