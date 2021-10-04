import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ListAuction from "../components/ListAuction"
import MakerAuction from "../components/MakerAuction"
import { bgBack } from "../config/PropertyCss"
import { getMoreMyAuctionAction, getMyAuction } from "../redux/actions"

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${bgBack};
`

function UserAuctionScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)
    const { data, nextPage } = useSelector((s) => s.myAuction)

    useEffect(() => {
        dispatch(getMyAuction())
    }, [])
    const renderHeaderListAuction = () => <MakerAuction />

    const handleRefresh = () => {
        return dispatch(getMyAuction())
    }
    const handleLoadMore = () => {
        return dispatch(getMoreMyAuctionAction(nextPage))
    }
    return (
        <Container themeColor={theme === "light"}>
            <ListAuction
                headerComponent={renderHeaderListAuction}
                handleRefresh={handleRefresh}
                data={data}
                nextPage={nextPage}
                handleLoadMore={handleLoadMore}
            />
        </Container>
    )
}

export default UserAuctionScreen
