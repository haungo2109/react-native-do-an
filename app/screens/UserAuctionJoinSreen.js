import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import ListAuction from "../components/ListAuction"
import MakerAuction from "../components/MakerAuction"
import {
    getAuctionYouJoin,
    getMyAuction,
} from "../redux/reducers/auctionReducer"

const Container = styled.SafeAreaView`
    flex: 1;
`

function UserAuctionJoinScreen(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuctionYouJoin())
    }, [])

    const handleRefresh = () => {
        return dispatch(getAuctionYouJoin())
    }
    return (
        <Container>
            <ListAuction handleRefresh={handleRefresh} />
        </Container>
    )
}

export default UserAuctionJoinScreen
