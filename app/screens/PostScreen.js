import React, { useEffect } from "react"
import ListFeed from "../components/ListFeed"
import MakerPost from "../components/MakerPost"
import styled from "styled-components/native"
import { useDispatch, useSelector } from "react-redux"
import { getAllPostAction, getMorePostAction } from "../redux/actions"
import { bgBack } from "../config/PropertyCss"

const WrapperList = styled.View`
    background-color: ${bgBack};
    flex: 1;
`

function PostScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)
    const { data, nextPage } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getAllPostAction())
    }, [])
    const renderHeaderListAuction = () => (
        <>
            <MakerPost />
        </>
    )
    const handleLoadMore = () => {
        return dispatch(getMorePostAction(nextPage))
    }
    const handleRefresh = () => {
        return dispatch(getAllPostAction())
    }
    return (
        <WrapperList themeColor={theme === "light"}>
            <ListFeed
                headerComponent={renderHeaderListAuction}
                data={data}
                nextPage={nextPage}
                handleLoadMore={handleLoadMore}
                handleRefresh={handleRefresh}
            />
        </WrapperList>
    )
}

export default PostScreen
