import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import Colors from "../config/Colors"
import Font from "../config/Font"
import { dislikeAuction, likeAuction } from "../redux/reducers/auctionReducer"
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import Avatar from "./Avatar"
import { baseURL } from "../api/apiClient"
import { Dimensions, FlatList, Modal, View } from "react-native"
import { useNavigation } from "@react-navigation/core"
import i18n from "i18n-js"
const { width: windowWidth } = Dimensions.get("window")

const ColorStatusAuction = {
    "being auctioned": Colors.gray1,
    "in process": Colors.yellow5,
    succ: Colors.green5,
    fail: Colors.red5,
}

const Container = styled.View`
    height: ${(props) => props.heightContainer};
    margin-bottom: 10px;
    background-color: ${Colors.gray};
    justify-content: space-between;
`
const Header = styled.View`
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
    padding: 0 11px;
`
const Row = styled.View`
    align-items: center;
    flex-direction: row;
`
const User = styled.Text`
    font-size: ${Font.big};
    font-weight: bold;
    color: ${Colors.gray8};
`
const Time = styled.Text`
    font-size: ${Font.small};
    color: ${Colors.gray5};
`
const WrapperText = styled.View`
    padding: 0 11px;
    border-left-color: ${(props) =>
        ColorStatusAuction[props.status] || "palevioletred"};
    border-left-width: 5px;
`
const TextContent = styled.Text`
    font-size: ${Font.nomal};
    color: ${Colors.gray7};
    line-height: 20px;
    margin: 3px 0;
`
const TextTitle = styled.Text`
    font-size: ${Font.big};
    font-weight: bold;
`

export const Photo = styled.Image`
    height: 100%;
    width: 100%;
    flex: 1;
`

export const WrapperImage = styled.Pressable`
    max-height: 500px;
    min-height: 400px;
    width: ${windowWidth}px;
    justify-content: center;
    align-items: center;
`
const Footer = styled.View`
    padding: 0 11px;
`
const Separator = styled.View`
    width: 100%;
    height: 1px;
    background: #f9f9f9;
`
const FooterMenu = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 9px 0;
`
const Button = styled.TouchableOpacity`
    flex-direction: row;
    padding: 5px;
    border-radius: 7px;
    background-color: ${Colors.gray2};
`
const Icon = styled.View`
    margin-right: 6px;
`
const Text = styled.Text`
    font-size: ${Font.small};
    color: ${Colors.gray7};
`
const ButtonMenu = styled.TouchableOpacity`
    padding: 7px;
    border-radius: 5px;
`
export const WrapperModelImage = styled.View`
    flex: 1;
`
export const FullImage = styled.Image`
    /* flex: 1; */
    height: 100%;
    width: ${windowWidth}px;
`
export const WrapperButtonClose = styled.View`
    position: absolute;
    right: 7px;
    top: 7px;
    z-index: 2;
`
export const ButtonClose = styled.TouchableOpacity`
    border-radius: 100px;
    padding: 5px;
    background-color: ${Colors.gray2};
`
function Auction({
    content,
    create_at,
    id,
    like = false,
    isLike,
    auction_images,
    user,
    count_comment,
    handlePressMenu,
    title,
    base_price,
    condition,
    deadline,
    status_auction,
    category,
    payment_method,
    showAll = false,
    date_success,
    buyer,
    accept_price,
}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [managePressImage, setManagePressImage] = useState({
        show: false,
        uri: "",
    })
    const handleLikeButton = () => {
        dispatch(likeAuction(id))
    }

    const handleDislikeButton = () => {
        dispatch(dislikeAuction(id))
    }

    const handlePressImage = (uri) => {
        setManagePressImage({
            show: true,
            uri,
        })
    }
    return (
        <>
            <Container
                heightContainer={
                    auction_images.length === 0 ? "200px" : "700px"
                }
            >
                <Header>
                    <Row>
                        <Avatar
                            source={{
                                uri: baseURL + user.avatar,
                            }}
                            user_id={user.id}
                        />
                        <View style={{ paddingLeft: 10 }}>
                            <User>{user.full_name}</User>
                            <Row>
                                <Time>{create_at}</Time>
                                <Entypo
                                    name="dot-single"
                                    size={12}
                                    color="#747476"
                                />
                                <Entypo
                                    name="globe"
                                    size={10}
                                    color="#747476"
                                />
                            </Row>
                        </View>
                    </Row>
                    <ButtonMenu
                        onPress={() =>
                            handlePressMenu(user.id, {
                                content,
                                create_at,
                                id,
                                like,
                                isLike,
                                auction_images,
                                user,
                                count_comment,
                                title,
                                base_price,
                                condition,
                                deadline,
                                status_auction,
                                category,
                                payment_method,
                                date_success,
                                buyer,
                                accept_price,
                            })
                        }
                    >
                        <Entypo
                            name="dots-three-horizontal"
                            size={15}
                            color="#222121"
                        />
                    </ButtonMenu>
                </Header>
                <WrapperText status={status_auction}>
                    <TextTitle>{title}</TextTitle>
                    <TextContent>{content}</TextContent>
                    <TextContent>
                        {i18n.t("txt.condition") + ": " + condition}
                    </TextContent>
                    <TextContent>
                        {i18n.t("txt.base-price") + ": " + base_price}
                    </TextContent>
                    {showAll === true ? (
                        <>
                            <TextContent>
                                {i18n.t("txt.deadline") +
                                    ": " +
                                    deadline.slice(0, 10)}
                            </TextContent>
                            <TextContent>
                                {i18n.t("txt.payment-method") +
                                    ": " +
                                    payment_method}
                            </TextContent>
                            <TextContent>
                                {i18n.t("txt.status-auction") +
                                    ": " +
                                    status_auction}
                            </TextContent>
                            {status_auction === "succ" ? (
                                <>
                                    <TextContent>
                                        {i18n.t("txt.date-success") +
                                            ": " +
                                            date_success}
                                    </TextContent>
                                    <TextContent>
                                        {i18n.t("txt.buyer") +
                                            ": " +
                                            buyer.full_name}
                                    </TextContent>
                                    <TextContent>
                                        {i18n.t("txt.accept-price") +
                                            ": " +
                                            accept_price}
                                    </TextContent>
                                </>
                            ) : null}
                        </>
                    ) : null}
                </WrapperText>
                {auction_images?.length !== 0 ? (
                    <FlatList
                        data={auction_images}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        style={{ flex: 1 }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <WrapperImage
                                onPress={() => handlePressImage(item)}
                            >
                                <Photo source={{ uri: baseURL + item }} />
                            </WrapperImage>
                        )}
                    />
                ) : null}
                <Footer>
                    <Separator />
                    <FooterMenu>
                        <Button
                            onPress={
                                isLike ? handleDislikeButton : handleLikeButton
                            }
                        >
                            <Icon>
                                <AntDesign
                                    name="like2"
                                    size={20}
                                    color={isLike ? "blue" : "#424040"}
                                />
                            </Icon>
                            <Text>{like.length}</Text>
                        </Button>

                        <Button
                            onPress={() => {
                                navigation.navigate("AuctionDetail", {
                                    content,
                                    create_at,
                                    id,
                                    like,
                                    isLike,
                                    auction_images,
                                    user,
                                    count_comment,
                                    title,
                                    base_price,
                                    condition,
                                    deadline,
                                    status_auction,
                                    category,
                                    payment_method,
                                    date_success,
                                    buyer,
                                    accept_price,
                                })
                            }}
                        >
                            <Icon>
                                <MaterialCommunityIcons
                                    name="comment-outline"
                                    size={20}
                                    color="#424040"
                                />
                            </Icon>
                            <Text>
                                {count_comment +
                                    " " +
                                    i18n.t("btn.comment-auction")}
                            </Text>
                        </Button>
                    </FooterMenu>
                </Footer>
            </Container>
            <Modal
                animationType="fade"
                transparent={false}
                visible={managePressImage["show"]}
            >
                <WrapperModelImage>
                    <WrapperButtonClose>
                        <ButtonClose
                            onPress={() =>
                                setManagePressImage({ uri: "", show: false })
                            }
                        >
                            <AntDesign
                                name="close"
                                size={28}
                                color={Colors.gray6}
                            />
                        </ButtonClose>
                    </WrapperButtonClose>
                    <FullImage
                        resizeMode={"contain"}
                        source={{ uri: baseURL + managePressImage["uri"] }}
                    />
                </WrapperModelImage>
            </Modal>
        </>
    )
}

export default Auction
