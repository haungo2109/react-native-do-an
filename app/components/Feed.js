import React, { useState } from "react"
import { FlatList, Modal, View } from "react-native"
import styled from "styled-components/native"
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import Avatar from "./Avatar"
import { baseURL } from "../api/apiClient"
import { useDispatch } from "react-redux"
import { dislikePost, likePost } from "../redux/reducers/postReducer"
import Colors from "../config/Colors"
import Font from "../config/Font"
import {
    ButtonClose,
    FullImage,
    Photo,
    WrapperButtonClose,
    WrapperImage,
    WrapperModelImage,
} from "./Auction"
import { useNavigation } from "@react-navigation/core"
import i18n from "i18n-js"

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
    const [managePressImage, setManagePressImage] = useState({
        show: false,
        uri: "",
    })

    const handleLikeButton = () => {
        dispatch(likePost(id))
    }

    const handleDislikeButton = () => {
        dispatch(dislikePost(id))
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
                {post_images?.length !== 0 ? (
                    <FlatList
                        data={post_images}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        style={{ flex: 1 }}
                        showsHorizontalScrollIndicator={true}
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
                            <Text>
                                {count_comment +
                                    " " +
                                    i18n.t("btn.comment-post")}
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

export default Feed
