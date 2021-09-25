import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, ScrollView } from "react-native"
import AppBar from "../components/AppBar"
import ListFeed from "../components/ListFeed"
import MakerPost from "../components/MakerPost"
import Users from "../components/Users"
import styled from "styled-components/native"
import { useDispatch, useSelector } from "react-redux"
import { getAllPostAction } from "../redux/reducers/postReducer"
import Colors from "../config/Colors"

const WrapperList = styled.View`
    background-color: ${Colors.gray2};
    flex: 1;
`

function PostScreen(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPostAction())
    }, [])
    const renderHeaderListAuction = () => (
        <>
            <MakerPost />
            <Users />
        </>
    )

    return (
        <WrapperList>
            <ListFeed headerComponent={renderHeaderListAuction} />
        </WrapperList>
    )
}

export default PostScreen
