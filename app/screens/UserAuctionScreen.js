import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ListAuction from "../components/ListAuction"
import MakerAuction from "../components/MakerAuction"
import { bgBack } from "../config/PropertyCss"
import { getMyAuction } from "../redux/reducers/auctionReducer"

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${bgBack};
`

function UserAuctionScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)
    useEffect(() => {
        dispatch(getMyAuction())
    }, [])
    const renderHeaderListAuction = () => <MakerAuction />

    const handleRefresh = () => {
        return dispatch(getMyAuction())
    }
    return (
        <Container themeColor={theme === "light"}>
            <ListAuction
                headerComponent={renderHeaderListAuction}
                handleRefresh={handleRefresh}
            />
        </Container>
    )
}

export default UserAuctionScreen
