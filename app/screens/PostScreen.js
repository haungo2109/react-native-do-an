import React, { useEffect } from "react"
import ListFeed from "../components/ListFeed"
import MakerPost from "../components/MakerPost"
import Users from "../components/Users"
import styled from "styled-components/native"
import { useDispatch, useSelector } from "react-redux"
import { getAllPostAction } from "../redux/reducers/postReducer"
import { bgBack } from "../config/PropertyCss"

const WrapperList = styled.View`
    background-color: ${bgBack};
    flex: 1;
`

function PostScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)

    useEffect(() => {
        dispatch(getAllPostAction())
    }, [])
    const renderHeaderListAuction = () => (
        <>
            <MakerPost />
            {/* <Users /> */}
        </>
    )

    return (
        <WrapperList themeColor={theme === "light"}>
            <ListFeed headerComponent={renderHeaderListAuction} />
        </WrapperList>
    )
}

export default PostScreen
