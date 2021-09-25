import React, { useState } from "react"
import { Feather } from "@expo/vector-icons"
import styled from "styled-components"
import { Picker } from "@react-native-picker/picker"
import Font from "../config/Font"
import Colors from "../config/Colors"
import { useDispatch, useSelector } from "react-redux"
import { getAllAuctionAction } from "../redux/reducers/auctionReducer"
import { getAllPostAction } from "../redux/reducers/postReducer"
import ListAuction from "../components/ListAuction"
import ListFeed from "../components/ListFeed"
import { ScrollView } from "react-native-gesture-handler"

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
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const ButtonSendComment = styled.TouchableOpacity``
const Icon = styled.View`
    margin: 0 10px;
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
        <>
            <ItemComment>
                <Picker
                    selectedValue={type}
                    onValueChange={(val) => setType(val)}
                    style={{ flex: 1 }}
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
            {params.type === "post" ? (
                <ScrollView>
                    <ListFeed />
                </ScrollView>
            ) : (
                <ListAuction />
            )}
        </>
    )
}

export default SearchSreen
