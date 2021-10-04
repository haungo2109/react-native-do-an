import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ListAuction from "../components/ListAuction"
import { bgBack } from "../config/PropertyCss"
import { getAuctionYouJoin, getMoreJoinAuctionAction } from "../redux/actions"

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${bgBack};
`

function UserAuctionJoinScreen(props) {
    const dispatch = useDispatch()
    const theme = useSelector((s) => s.setting.theme)
    const { data, nextPage } = useSelector((s) => s.auctionJoin)

    useEffect(() => {
        dispatch(getAuctionYouJoin())
    }, [])

    const handleRefresh = () => {
        return dispatch(getAuctionYouJoin())
    }
    const handleLoadMore = () => {
        return dispatch(getMoreJoinAuctionAction(nextPage))
    }

    return (
        <Container themeColor={theme === "light"}>
            <ListAuction
                handleRefresh={handleRefresh}
                data={data}
                handleLoadMore={handleLoadMore}
                nextPage={nextPage}
            />
        </Container>
    )
}

export default UserAuctionJoinScreen
