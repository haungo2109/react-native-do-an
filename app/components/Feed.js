import React, { useState } from "react"
import { FlatList, View } from "react-native"
import styled from "styled-components/native"
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import Avatar from "./Avatar"
import { baseURL } from "../api/apiClient"
import { useDispatch, useSelector } from "react-redux"
import { dislikePost, likePost } from "../redux/reducers/postReducer"
import Colors from "../config/Colors"
import Font from "../config/Font"
import { Photo, WrapperImage } from "./Auction"
import { useNavigation } from "@react-navigation/core"

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
const Post = styled.Text`
    font-size: ${Font.nomal};
    color: ${Colors.gray7};
    line-height: 20px;
    padding: 0 11px;
    margin: 3px 0;
`
const TextHashTag = styled(Post)`
    background-color: ${Colors.gray2};
    margin-left: 11px;
    margin-top: 2px;
    padding: 0 2px;
    border-radius: 3px;
`
const WrapperTextHashTag = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`
const Footer = styled.View`
    padding: 0 11px;
`
const FooterCount = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 9px 0;
`
const IconCount = styled.View`
    background: #1878f3;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
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

const Feed = ({
    content,
    create_at,
    hashtag = [],
    id,
    like = false,
    isLike,
    post_images,
    user,
    count_comment,
    handlePressMenu,
}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLikeButton = () => {
        dispatch(likePost(id))
    }

    const handleDislikeButton = () => {
        dispatch(dislikePost(id))
    }

    return (
        <Container
            heightContainer={post_images.length === 0 ? "180px" : "500px"}
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
                            content,
                            hashtag,
                            id,
                            post_images,
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

            <Post>{content}</Post>
            {hashtag?.length !== 0 && (
                <WrapperTextHashTag>
                    <TextHashTag>
                        {hashtag.map((c) => "#" + c.name).join(", ")}
                    </TextHashTag>
                </WrapperTextHashTag>
            )}
            {post_images?.length !== 0 ? (
                <FlatList
                    data={post_images}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={true}
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
                            navigation.navigate("PostDetail", {
                                content,
                                create_at,
                                hashtag,
                                id,
                                like,
                                isLike,
                                post_images,
                                user,
                                count_comment,
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

export default Feed
