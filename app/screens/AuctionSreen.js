import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components/native"
import ListAuction from "../components/ListAuction"
import MakerAuction from "../components/MakerAuction"
import { bgBack } from "../config/PropertyCss"
import { getAllAuctionAction } from "../redux/reducers/auctionReducer"

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${bgBack};
`

function AuctionScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)
    useEffect(() => {
        dispatch(getAllAuctionAction())
    })
    const renderHeaderListAuction = () => <MakerAuction />

    return (
        <>
            <Container themeColor={theme === "light"}>
                <ListAuction headerComponent={renderHeaderListAuction} />
            </Container>
        </>
    )
}

export default AuctionScreen
