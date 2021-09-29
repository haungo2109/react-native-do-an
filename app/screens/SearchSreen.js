import React, { useState } from "react"
import { Feather } from "@expo/vector-icons"
import styled from "styled-components"
import { Picker } from "@react-native-picker/picker"
import Font from "../config/Font"
import { useDispatch, useSelector } from "react-redux"
import { getAllAuctionAction } from "../redux/reducers/auctionReducer"
import { getAllPostAction } from "../redux/reducers/postReducer"
import ListAuction from "../components/ListAuction"
import ListFeed from "../components/ListFeed"
import { ScrollView } from "react-native-gesture-handler"
import { bgBack, bgItem, bgView, colorText } from "../config/PropertyCss"

const ItemComment = styled.View`
    flex-direction: row;
    height: 42px;
    width: 100%;
    align-items: center;
    margin: 5px 0;
    /* background-color: ${bgView}; */
`
const TextInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    color: ${colorText};
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
                <Picker
                    selectedValue={type}
                    onValueChange={(val) => setType(val)}
                    style={{
                        flex: 1,
                        color: colorText({ themeColor: theme === "light" }),
                        backgroundColor: bgItem({
                            themeColor: theme === "light",
                        }),
                    }}
                    mode="dropdown"
                >
                    {typeSearch[params.type].type.map((c, i) => (
                        <Picker.Item key={i} label={c} value={c} />
                    ))}
                </Picker>
                {type === "category" ? (
                    <Picker
                        selectedValue={input}
                        onValueChange={(val) => setInput(val)}
                        style={{ flex: 1 }}
                    >
                        {listCategory.map((c, i) => (
                            <Picker.Item
                                key={i}
                                label={c.name}
                                value={c.id.toString()}
                            />
                        ))}
                    </Picker>
                ) : (
                    <TextInput
                        onChangeText={setInput}
                        value={input}
                        placeholder="Nhập từ khóa..."
                    />
                )}
                <ButtonSendComment onPress={handleSubmit}>
                    <Icon>
                        <Feather name="search" size={27} color="black" />
                    </Icon>
                </ButtonSendComment>
            </ItemComment>
            {params.type === "post" ? <ListFeed /> : <ListAuction />}
        </Container>
    )
}

export default SearchSreen
