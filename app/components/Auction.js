import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import Colors from "../config/Colors"
import Font from "../config/Font"
import { dislikeAuction, likeAuction } from "../redux/reducers/auctionReducer"
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import Avatar from "./Avatar"
import { baseURL } from "../api/apiClient"
import { Dimensions, FlatList, Image, View } from "react-native"
import { useNavigation } from "@react-navigation/core"
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

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

export const WrapperImage = styled.View`
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
}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLikeButton = () => {
        dispatch(likeAuction(id))
    }

    const handleDislikeButton = () => {
        dispatch(dislikeAuction(id))
    }
    return (
        <Container
            heightContainer={auction_images.length === 0 ? "200px" : "700px"}
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
                            <Entypo name="globe" size={10} color="#747476" />
                        </Row>
                    </View>
                </Row>
                <ButtonMenu
                    onPress={() =>
                        handlePressMenu(user.id, {
                            id,
                            title,
                            content,
                            base_price,
                            condition,
                            deadline,
                            category,
                            auction_images,
                            status_auction,
                            category,
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
                <TextContent>Điều kiện: {condition}</TextContent>
                <TextContent>Giá cơ bản: {base_price}</TextContent>
                {showAll === true ? (
                    <>
                        <TextContent>
                            Hạn đấu giá: {deadline.slice(0, 10)}
                        </TextContent>
                        <TextContent>
                            Phương thức thanh toán: {payment_method}
                        </TextContent>
                        <TextContent>Trạng thái: {status_auction}</TextContent>
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
                        <WrapperImage>
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
                        <Text>{count_comment} comment</Text>
                    </Button>
                </FooterMenu>
            </Footer>
        </Container>
    )
}

export default Auction
