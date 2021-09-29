import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ListAuction from "../components/ListAuction"
import { bgBack } from "../config/PropertyCss"
import { getAuctionYouJoin } from "../redux/reducers/auctionReducer"

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${bgBack};
`

function UserAuctionJoinScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)

    useEffect(() => {
        dispatch(getAuctionYouJoin())
    }, [])

    const handleRefresh = () => {
        return dispatch(getAuctionYouJoin())
    }
    return (
        <Container themeColor={theme === "light"}>
            <ListAuction handleRefresh={handleRefresh} />
        </Container>
    )
}

export default UserAuctionJoinScreen
