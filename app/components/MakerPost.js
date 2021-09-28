import React from "react"
import styled from "styled-components/native"
import { Feather, MaterialIcons } from "@expo/vector-icons"

import AvatarToProfile from "./Avatar"
import { useSelector } from "react-redux"
import { baseURL } from "../api/apiClient"
import Colors from "../config/Colors"
import { useNavigation } from "@react-navigation/core"
import i18n from "i18n-js"

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

const MakerPost = () => {
    const user = useSelector((state) => state.user)
    const navigation = useNavigation()

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
                            onPress={() => {
                                navigation.navigate("CreateEditPost", {
                                    handleSubmit: "addPost",
                                    data: {
                                        content: "",
                                        hashtag: "",
                                        post_images: [],
                                    },
                                })
                            }}
                        >
                            <Input
                                editable={false}
                                placeholder={i18n.t("placeholder.maker-post")}
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
                            <MenuText>{i18n.t("txt.picture")}</MenuText>
                        </Menu>
                        <Separator />

                        <Menu>
                            <MaterialIcons
                                name="insert-emoticon"
                                size={22}
                                color={Colors.yellow4}
                            />
                            <MenuText>{i18n.t("txt.emoji")}</MenuText>
                        </Menu>
                        <Separator />

                        <Menu>
                            <Feather
                                name="hash"
                                size={22}
                                color={Colors.yellow7}
                            />
                            <MenuText>{i18n.t("txt.hashtag")}</MenuText>
                        </Menu>
                    </Row>
                </Container>
                <BottomDivider />
            </>
        )
}

export default MakerPost
