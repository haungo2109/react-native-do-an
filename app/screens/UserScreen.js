import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import Colors from "../config/Colors"
import { useDispatch, useSelector } from "react-redux"
import { baseURL } from "../api/apiClient"
import { getMorePostOfUserAction, getPostOfUserAction } from "../redux/actions"
import ListFeed from "../components/ListFeed"
import { getUserBaseInfoAction } from "../redux/reducers/userReducer"
import { bgBack, colorTextTitle } from "../config/PropertyCss"
import { AirbnbRating } from "react-native-ratings"
import { useNavigation } from "@react-navigation/core"
import { AntDesign } from "@expo/vector-icons"
import { addMember, getChatApi } from "../api/firebase"
import i18n from "i18n-js"

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${bgBack};
`
const WrrapperAvatar = styled.View`
    margin-top: 10px;
    width: 150px;
    height: 150px;
    border-radius: 200px;
    border: 5px solid ${Colors.facebookColor};
`
const Avatar = styled.Image`
    border-radius: 200px;
    width: 140px;
    height: 140px;
`
const TextTitle = styled.Text`
    margin-top: 15px;
    font-weight: bold;
    font-size: 20px;
    color: ${colorTextTitle};
`
const ContainerProfile = styled.View`
    /* flex: 1; */
    width: 100%;
    padding: 15px;
    align-items: center;
    background-color: ${bgBack};
`
const ButtonEditProfile = styled.TouchableOpacity`
    height: 42px;
    width: 100%;
    flex-direction: row;
    margin-top: 15px;
    color: ${Colors.facebookColor};
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.facebookColor};
`
const TextButtonEditProfile = styled.Text`
    color: ${Colors.gray1};
    font-weight: bold;
`
const Icon = styled.View`
    margin-right: 5px;
    justify-content: center;
    align-items: center;
`

function UserScreen(props) {
    const { user_id } = props.route.params
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [user, setUser] = useState()
    const [chatId, setChatId] = useState(null)
    const theme = useSelector((s) => s.setting.theme)
    const { data, nextPage } = useSelector((s) => s.postUser)
    const myUser = useSelector((s) => s.user)

    useEffect(() => {
        dispatch(getUserBaseInfoAction(user_id))
            .unwrap()
            .then((res) => {
                setUser(res)
            })
        dispatch(getPostOfUserAction(user_id))
        if (myUser?.id && user_id)
            getChatApi(myUser.id, user_id).then((id) => id && setChatId(id))
    }, [user_id])

    const handleChatWith = () => {
        if (chatId) {
            navigation.navigate("Chat", {
                chatId,
                chatWith: user,
            })
        } else {
            addMember(myUser.id, user_id).then((id) => {
                navigation.navigate("Chat", {
                    chatId: id,
                    chatWith: user,
                })
            })
        }
    }
    const renderHeader = () => (
        <ContainerProfile themeColor={theme === "light"}>
            <WrrapperAvatar>
                {user && <Avatar source={{ uri: baseURL + user.avatar }} />}
            </WrrapperAvatar>
            <TextTitle themeColor={theme === "light"}>
                {user && user.full_name}
            </TextTitle>
            {user && user.rating && (
                <AirbnbRating
                    defaultRating={user.rating}
                    count={10}
                    size={20}
                    reviewSize={20}
                    showRating={false}
                />
            )}
            <ButtonEditProfile
                onPress={handleChatWith}
                themeColor={theme === "light"}
            >
                <Icon>
                    <AntDesign name="wechat" size={15} color="white" />
                </Icon>
                <TextButtonEditProfile themeColor={theme === "light"}>
                    {i18n.t("btn.chat")}
                </TextButtonEditProfile>
            </ButtonEditProfile>
        </ContainerProfile>
    )
    const handleLoadMore = () => {
        return dispatch(getMorePostOfUserAction(nextPage))
    }
    const handleRefresh = () => {
        return dispatch(getPostOfUserAction(user_id))
    }
    return (
        <Container themeColor={theme === "light"}>
            <ListFeed
                headerComponent={renderHeader}
                data={data}
                nextPage={nextPage}
                handleLoadMore={handleLoadMore}
                handleRefresh={handleRefresh}
            />
        </Container>
    )
}

export default UserScreen
