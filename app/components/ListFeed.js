import React, { useCallback, useState } from "react"
import Feed from "./Feed"
import { useDispatch, useSelector } from "react-redux"
import { ActivityIndicator, FlatList } from "react-native"
import useModelMenu from "../hooks/useModelMenu.js"
import { useNavigation } from "@react-navigation/native"
import { fetchPostComment } from "../redux/reducers/commentReducer"
import { getAllPostAction, getMorePostAction } from "../redux/actions"
import styled from "styled-components"

const WrapperActivityIndicator = styled.View`
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
`
const TextEndFooter = styled.Text`
    flex: 1;
`

function ListFeed({
    handleRefresh,
    headerComponent,
    data = [],
    handleLoadMore,
    nextPage,
}) {
    const [refreshing, setRefreshing] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

    const user = useSelector((state) => state.user)
    const { showModelMenu } = useModelMenu()

    const handlePressMenu = (uid, post) => {
        if (user.id === uid)
            showModelMenu({
                id: post.id,
                listChoose: ["edit", "delete"],
                data: post,
            })
        else showModelMenu({ id: post.id, listChoose: ["report"], data: post })
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

    const renderItem = ({ item }) => {
        if (item?.user)
            return (
                <Feed
                    {...item}
                    isLike={checkLiked(item.like)}
                    handlePressMenu={handlePressMenu}
                />
            )
        else return null
    }
    const onScroll = () => {
        if (hasScrolled) return
        setHasScrolled(true)
    }
    return (
        <>
            <FlatList
                onScroll={onScroll}
                onRefresh={onRefresh}
                refreshing={refreshing}
                removeClippedSubviews={true}
                nestedScrollEnabled
                contentContainerStyle={{
                    flexDirection: "column",
                    width: "100%",
                }}
                data={data}
                style={{ flex: 1 }}
                onEndReached={checkLoadMore}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                ListHeaderComponent={headerComponent}
            />
        </>
    )
}

export default ListFeed
