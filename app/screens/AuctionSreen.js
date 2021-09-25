import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import styled from "styled-components/native"
import ListAuction from "../components/ListAuction"
import MakerAuction from "../components/MakerAuction"
import MakerPost from "../components/MakerPost"
import { getAllAuctionAction } from "../redux/reducers/auctionReducer"

const Container = styled.SafeAreaView`
    flex: 1;
`

function AuctionScreen(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAuctionAction())
    })
    const renderHeaderListAuction = () => <MakerAuction />

    return (
        <>
            <Container>
                <ListAuction headerComponent={renderHeaderListAuction} />
            </Container>
        </>
    )
}

export default AuctionScreen
