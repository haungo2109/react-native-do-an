import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components/native"
import ListAuction from "../components/ListAuction"
import MakerAuction from "../components/MakerAuction"
import { bgBack } from "../config/PropertyCss"
import { getAllAuctionAction, getMoreAuctionAction } from "../redux/actions"

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${bgBack};
`

function AuctionScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)
    const { data, nextPage } = useSelector((s) => s.auction)

    useEffect(() => {
        dispatch(getAllAuctionAction())
    }, [])
    const handleRefresh = () => {
        return dispatch(getAllAuctionAction())
    }
    const renderHeaderListAuction = () => <MakerAuction />
    const handleLoadMore = () => {
        return dispatch(getMoreAuctionAction(nextPage))
    }
    return (
        <>
            <Container themeColor={theme === "light"}>
                <ListAuction
                    headerComponent={renderHeaderListAuction}
                    data={data}
                    nextPage={nextPage}
                    handleLoadMore={handleLoadMore}
                    handleRefresh={handleRefresh}
                />
            </Container>
        </>
    )
}

export default AuctionScreen
