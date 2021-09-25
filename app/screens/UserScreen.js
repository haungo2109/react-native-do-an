import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import Colors from "../config/Colors"
import { useDispatch, useSelector } from "react-redux"
import { baseURL } from "../api/apiClient"
import { getMyPost } from "../redux/reducers/postReducer"
import ListFeed from "../components/ListFeed"
import { ScrollView } from "react-native"
import { getUserBaseInfoAction } from "../redux/reducers/userReducer"

const Container = styled.SafeAreaView`
    flex: 1;
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
`
const ContainerProfile = styled.View`
    /* flex: 1; */
    width: 100%;
    padding: 15px;
    align-items: center;
    background-color: ${Colors.gray1};
`

function UserScreen(props) {
    const { user_id } = props.route.params
    const dispatch = useDispatch()
    const [user, setUser] = useState()

    useEffect(() => {
        dispatch(getUserBaseInfoAction(user_id))
            .unwrap()
            .then((res) => {
                setUser(res)
            })
        dispatch(getMyPost())
    }, [user_id])

    const renderHeader = () => (
        <ContainerProfile>
            <WrrapperAvatar>
                {user && <Avatar source={{ uri: baseURL + user.avatar }} />}
            </WrrapperAvatar>
            <TextTitle>{user && user.full_name}</TextTitle>
        </ContainerProfile>
    )
    return (
        <Container>
            <ListFeed headerComponent={renderHeader} />
        </Container>
    )
}

export default UserScreen
