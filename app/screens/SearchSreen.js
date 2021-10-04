import React, { useState } from "react"
import { Feather } from "@expo/vector-icons"
import styled from "styled-components"
import { Picker } from "@react-native-picker/picker"
import Font from "../config/Font"
import { useDispatch, useSelector } from "react-redux"
import { getAllAuctionAction, getMorePostAction } from "../redux/actions"
import { getAllPostAction } from "../redux/actions"
import ListAuction from "../components/ListAuction"
import ListFeed from "../components/ListFeed"
import {
    bgBack,
    bgItem,
    colorIcon,
    colorPlaceholder,
    colorText,
} from "../config/PropertyCss"

const ItemComment = styled.View`
    flex-direction: row;
    height: 42px;
    width: 100%;
    align-items: center;
    margin: 5px 0;
`
const TextInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 5px;
    color: ${colorText};
    background-color: ${bgItem};
`
const WrapperPicker = styled.View`
    flex: 1;
    margin-left: 5px;
    border-radius: 8px;
    background-color: ${bgItem};
`
const ButtonSendComment = styled.TouchableOpacity``
const Icon = styled.View`
    margin: 0 10px;
`
const Container = styled.View`
    flex: 1;
    background-color: ${bgBack};
`
const typeSearch = {
    post: {
        type: ["hashtag", "content", "user_name"],
    },
    auction: {
        type: ["user_name", "category", "base_price", "title"],
    },
}
function SearchSreen(props) {
    const { params } = props.route
    const [input, setInput] = useState("")
    const [type, setType] = useState(typeSearch[params.type].type[0])
    const theme = useSelector((s) => s.setting.theme)
    const listCategory = useSelector((s) => s.categoryAuction)

    const dispatch = useDispatch()

    const handleSubmit = () => {
        if (params.type === "auction") {
            handleSearchAution()
        } else if (params.type === "post") {
            handleSearchPost()
        }
    }
    const handleSearchAution = () => {
        let params = Object.assign({}, { [type]: input })
        dispatch(getAllAuctionAction(params))
    }
    const handleSearchPost = () => {
        let params = Object.assign({}, { [type]: input })
        dispatch(getAllPostAction(params))
    }

    return (
        <Container themeColor={theme === "light"}>
            <ItemComment themeColor={theme === "light"}>
                <WrapperPicker themeColor={theme === "light"}>
                    <Picker
                        selectedValue={type}
                        onValueChange={(val) => setType(val)}
                        style={{
                            flex: 1,
                        }}
                        itemStyle={{
                            color: colorText({ themeColor: theme === "light" }),
                        }}
                        dropdownIconColor={colorIcon(theme === "light")}
                        mode="dropdown"
                    >
                        {typeSearch[params.type].type.map((c, i) => (
                            <Picker.Item
                                key={i}
                                label={c}
                                value={c}
                                style={{
                                    color: colorText({
                                        themeColor: theme === "light",
                                    }),
                                    backgroundColor: bgItem({
                                        themeColor: theme === "light",
                                    }),
                                }}
                            />
                        ))}
                    </Picker>
                </WrapperPicker>
                {type === "category" ? (
                    <WrapperPicker themeColor={theme === "light"}>
                        <Picker
                            selectedValue={input}
                            onValueChange={(val) => setInput(val)}
                            style={{
                                flex: 1,
                                color: colorText({
                                    themeColor: theme === "light",
                                }),
                            }}
                            itemStyle={{
                                color: colorText({
                                    themeColor: theme === "light",
                                }),
                            }}
                            dropdownIconColor={colorIcon(theme === "light")}
                            mode="dropdown"
                        >
                            {listCategory.map((c, i) => (
                                <Picker.Item
                                    key={i}
                                    label={c.name}
                                    value={c.id.toString()}
                                    style={{
                                        color: colorText({
                                            themeColor: theme === "light",
                                        }),
                                        backgroundColor: bgItem({
                                            themeColor: theme === "light",
                                        }),
                                    }}
                                />
                            ))}
                        </Picker>
                    </WrapperPicker>
                ) : (
                    <TextInput
                        onChangeText={setInput}
                        value={input}
                        placeholder="Nhập từ khóa..."
                        themeColor={theme === "light"}
                        placeholderTextColor={colorPlaceholder({
                            themeColor: theme === "light",
                        })}
                    />
                )}
                <ButtonSendComment onPress={handleSubmit}>
                    <Icon>
                        <Feather
                            name="search"
                            size={27}
                            color={colorIcon(theme === "light")}
                        />
                    </Icon>
                </ButtonSendComment>
            </ItemComment>
            {params.type === "post" ? <ResultFeed /> : <ResultAuction />}
        </Container>
    )
}
const ResultAuction = () => {
    const { data, nextPage } = useSelector((state) => state.auction)
    const handleLoadMore = () => {
        return dispatch(getMoreAuctionAction(nextPage))
    }
    const handleRefresh = () => {
        return dispatch(getAllAuctionAction())
    }
    return (
        <ListAuction
            data={data}
            nextPage={nextPage}
            handleLoadMore={handleLoadMore}
            handleRefresh={handleRefresh}
        />
    )
}
const ResultFeed = () => {
    const { data, nextPage } = useSelector((state) => state.post)
    const handleLoadMore = () => {
        return dispatch(getMorePostAction(nextPage))
    }
    const handleRefresh = () => {
        return dispatch(getAllPostAction())
    }
    return (
        <ListFeed
            data={data}
            nextPage={nextPage}
            handleLoadMore={handleLoadMore}
            handleRefresh={handleRefresh}
        />
    )
}
export default SearchSreen
