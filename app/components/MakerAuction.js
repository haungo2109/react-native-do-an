import React from "react"
import styled from "styled-components/native"
import {
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons"
import i18n from "i18n-js"
import AvatarToProfile from "./Avatar"
import { useSelector } from "react-redux"
import { baseURL } from "../api/apiClient"
import Colors from "../config/Colors"
import { useNavigation } from "@react-navigation/core"
import { bgView, colorPlaceholder, colorText } from "../config/PropertyCss"

const Container = styled.View`
    width: 100%;
    height: 100px;
    margin: 10px 0;
`
const Row = styled.View`
    flex-direction: row;
    background: ${bgView};
    width: 100%;
    padding: 0 11px;
    align-items: center;
`
const Input = styled.TextInput`
    height: 58px;
    width: 100%;
    padding: 0 8px;
`
const Divider = styled.View`
    width: 100%;
    height: 0.5px;
    background: ${Colors.gray3};
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
    color: ${colorText};
`
const Separator = styled.View`
    width: 1px;
    height: 26px;
    background: ${Colors.gray3};
`
const ButtonType = styled.TouchableOpacity`
    flex: 1;
`

const MakerAuction = () => {
    const user = useSelector((state) => state.user)
    const navigation = useNavigation()
    const theme = useSelector((s) => s.setting.theme)
    if (!user) {
        ;<></>
    } else
        return (
            <>
                <Container themeColor={theme === "light"}>
                    <Row themeColor={theme === "light"}>
                        <AvatarToProfile
                            source={{ uri: baseURL + user.avatar }}
                            user_id={user.id}
                        />
                        <ButtonType
                            onPress={() => {
                                navigation.navigate("CreateEditAuction", {
                                    handleSubmit: "addAuction",
                                    data: {
                                        title: "",
                                        content: "",
                                        auction_images: [],
                                        base_price: "",
                                        condition: "",
                                        deadline: "",
                                        payment_method: "default",
                                        category: "default",
                                    },
                                })
                            }}
                            themeColor={theme === "light"}
                        >
                            <Input
                                editable={false}
                                placeholder={i18n.t(
                                    "placeholder.maker-auction"
                                )}
                                themeColor={theme === "light"}
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                            />
                        </ButtonType>
                    </Row>
                    <Divider themeColor={theme === "light"} />
                    <Row themeColor={theme === "light"}>
                        <Menu>
                            <MaterialIcons
                                name="photo-size-select-actual"
                                size={20}
                                color="#4CAF50"
                            />
                            <MenuText themeColor={theme === "light"}>
                                {i18n.t("txt.picture")}
                            </MenuText>
                        </Menu>
                        <Separator themeColor={theme === "light"} />

                        <Menu>
                            <Ionicons
                                name="text"
                                size={22}
                                color={Colors.yellow7}
                            />
                            <MenuText themeColor={theme === "light"}>
                                {i18n.t("txt.content")}
                            </MenuText>
                        </Menu>
                        <Separator themeColor={theme === "light"} />
                        <Menu>
                            <MaterialCommunityIcons
                                name="currency-usd"
                                size={22}
                                color={Colors.yellow4}
                            />
                            <MenuText themeColor={theme === "light"}>
                                {i18n.t("txt.price")}
                            </MenuText>
                        </Menu>
                    </Row>
                </Container>
            </>
        )
}

export default MakerAuction
