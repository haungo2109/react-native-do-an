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

function UserScreen(props) {
    const { user_id } = props.route.params
    const dispatch = useDispatch()
    const [user, setUser] = useState()
    const theme = useSelector((s) => s.setting.theme)
    const { data, nextPage } = useSelector((s) => s.postUser)

    useEffect(() => {
        dispatch(getUserBaseInfoAction(user_id))
            .unwrap()
            .then((res) => {
                setUser(res)
            })
        dispatch(getPostOfUserAction(user_id))
    }, [user_id])

    const renderHeader = () => (
        <ContainerProfile themeColor={theme === "light"}>
            <WrrapperAvatar>
                {user && <Avatar source={{ uri: baseURL + user.avatar }} />}
            </WrrapperAvatar>
            <TextTitle themeColor={theme === "light"}>
                {user && user.full_name}
            </TextTitle>
            {user && user.rating && <AirbnbRating
                defaultRating={user.rating}
                count={10}
                size={20}
                reviewSize={20}
                showRating={false}
            />}
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
