import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import useModelMenu from "../hooks/useModelMenu"
import { getAllAuctionAction, getMoreAuctionAction } from "../redux/actions"
import Auction from "./Auction"

const WrapperActivityIndicator = styled.View`
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
`

function ListAuction({
    handleRefresh,
    headerComponent,
    data,
    handleLoadMore,
    nextPage,
}) {
    const [refreshing, setRefreshing] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

    const user = useSelector((state) => state.user)
    const { showModelMenu } = useModelMenu()

    const handlePressMenu = (uid, auction) => {
        if (user.id === uid)
            showModelMenu({
                id: auction.id,
                listChoose: ["editAuction", "deleteAuction"],
                data: auction,
            })
        else
            showModelMenu({
                id: auction.id,
                listChoose: ["reportAuction"],
                data: auction,
            })
    }
    const checkLiked = (like = []) => {
        if (user) {
            return like.includes(user.id)
        }
        return false
    }
    const checkLoadMore = () => {
        if (!hasScrolled) {
            return null
        }
        if (nextPage && handleLoadMore) {
            handleLoadMore()
        }
    }
    const renderFooter = () => {
        return nextPage ? (
            <WrapperActivityIndicator>
                <ActivityIndicator size="large" color="#0000ff" />
            </WrapperActivityIndicator>
        ) : null
    }
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        if (handleRefresh) await handleRefresh()
        setRefreshing(false)
    }, [])
    return (
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            onScroll={() => {
                setHasScrolled(true)
            }}
            nestedScrollEnabled
            contentContainerStyle={{
                flexDirection: "column",
                width: "100%",
            }}
            data={data}
            onEndReached={checkLoadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                if (item?.user)
                    return (
                        <Auction
                            {...item}
                            isLike={checkLiked(item.like)}
                            handlePressMenu={handlePressMenu}
                        />
                    )
                else return null
            }}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={headerComponent}
        />
    )
}

export default ListAuction
