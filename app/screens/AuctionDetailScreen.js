import React, { useEffect, useState } from "react"
import { Alert, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { baseURL } from "../api/apiClient"
import AvatarToProfile from "../components/Avatar"
import Auction from "../components/Auction"
import Colors from "../config/Colors"
import Font from "../config/Font"
import useModelMenu from "../hooks/useModelMenu"
import { FontAwesome } from "@expo/vector-icons"
import {
    fetchAuctionComment,
    sendAuctionComment,
} from "../redux/reducers/commentReducer"
import { Picker } from "@react-native-picker/picker"
import { Field, SubmitButton, TextSubmitButton } from "../components/ModelEdit"
import {
    changeStatusAuctionComment,
    getOneAuctionAction,
} from "../redux/reducers/auctionReducer"

const WrapperComment = styled.View`
    padding: 0px 11px;
`
const WrapperInputComment = styled.View`
    flex-direction: row;
    min-height: 42px;
    width: 100%;
    align-items: center;
    margin: 5px 0;
`
const CommentText = styled.Text`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const CommentPriceText = styled.Text`
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
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
const PriceInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const WrapperInput = styled.View`
    flex: 1;
`
const ButtonSendComment = styled.TouchableOpacity``
const Icon = styled.View`
    margin: 0 10px;
`
const ButtonSubmitCommentAuction = styled(SubmitButton)``
const TextButtonSubmit = styled(TextSubmitButton)``
const FieldCustom = styled(Field)`
    margin-top: 10px;
`
const TextStatusComment = styled.Text`
    color: ${Colors.gray1};
    font-size: 12px;
    padding: 2px;
    background-color: ${Colors.red5};
`
const ButtonPayment = styled(SubmitButton)``
const TextButtonPayment = styled(TextSubmitButton)``
const WrapperTextInfo = styled.View`
    margin-top: 5px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`
const TextInfo = styled.Text`
    font-size: ${Font.big};
`

function AuctionDetailScreen({ route, navigation }) {
    const dispatch = useDispatch()

    const [item, setItem] = useState(route.params)

    const { data } = useSelector((state) => state.comment)
    const user = useSelector((state) => state.user)
    const payment = useSelector((state) => state.paymentMethod)
    const { showModelMenu } = useModelMenu()

    useEffect(() => {
        dispatch(fetchAuctionComment(item.id))
        if (!item?.user) {
            dispatch(getOneAuctionAction(item.id))
                .unwrap()
                .then((res) => {
                    setItem(res)
                })
                .catch((err) => Alert.alert("Lỗi", err.message))
        }
    }, [])

    const handlePressMenu = (uid, auction) => {
        let comment = data.find(
            (c) => c.status_transaction == "in process"
        ) || { id: 0 }
        if (user.id === uid) {
            let listChoose = ["editAuction", "deleteAuction"]
            if (item.status_auction === "in process") {
                listChoose.push(
                    "setSuccessComment",
                    "setFailComment",
                    "setFailAuction"
                )
            } else if (item.status_auction === "being auctioned") {
                listChoose.push("setFailAuction")
            }
            showModelMenu({
                id: auction.id,
                listChoose,
                data: { ...auction, commentId: comment.id },
            })
        } else
            showModelMenu({
                id: auction.id,
                listChoose: ["report"],
                data: auction,
            })
    }

    const getNamePaymentMethod = (id) => {
        let index = parseInt(id) - 1
        return payment[index].name
    }

    const paywithMomo = () => {
        let comment = data.find((c) => c.status_transaction == "in process")
        if (comment === undefined) return

        navigation.navigate("MomoPayment", { amount: comment.price })
    }
    const renderActionForBuyler = () => {
        switch (item.status_auction) {
            case "fail":
            case "success":
                return null
            case "in process":
                if (item.payment_method === 1)
                    return (
                        <ButtonPayment>
                            <TextButtonPayment onPress={paywithMomo}>
                                Thanh toán bằng Momo
                            </TextButtonPayment>
                        </ButtonPayment>
                    )
                else {
                    return (
                        <WrapperTextInfo>
                            <TextInfo>
                                Vui lòng liên hệ với {item.user.full_name} để
                                thanh toán
                            </TextInfo>
                        </WrapperTextInfo>
                    )
                }
            default:
                return <InputCommentForm user={user} auctionId={item.id} />
        }
    }
    return (
        <ScrollView>
            {item.payment_method !== undefined && (
                <Auction
                    showAll={true}
                    {...item}
                    payment_method={getNamePaymentMethod(item.payment_method)}
                    handlePressMenu={handlePressMenu}
                />
            )}
            {item?.user && (
                <WrapperComment>
                    {/* RENDER COMMENT */}
                    {data.map((c) => (
                        <ItemComment
                            user={c.user}
                            content={c.content}
                            price={c.price}
                            status_transaction={c.status_transaction}
                            key={c.id}
                        />
                    ))}
                    {/* RENDER ACTION FOR OWNER AND BUYLER */}
                    {user.id === item.user.id ? (
                        item.status_auction === "being auctioned" ? (
                            <SelectStatusComment
                                data={data}
                                auctionId={item.id}
                                setItem={setItem}
                            />
                        ) : null
                    ) : (
                        renderActionForBuyler()
                    )}
                </WrapperComment>
            )}
        </ScrollView>
    )
}
const InputCommentForm = ({ user, auctionId }) => {
    const [inputComment, setInputComment] = useState("")
    const [inputPrice, setInputPrice] = useState("")
    const dispatch = useDispatch()

    const handleSendComment = () => {
        const data = new FormData()
        data.append("content", inputComment)
        data.append("price", inputPrice)
        dispatch(sendAuctionComment({ id: auctionId, data })).then(() => {
            setInputComment("")
            setInputPrice("")
        })
    }
    return (
        <WrapperInputComment>
            <AvatarToProfile
                source={{
                    uri: baseURL + user.avatar,
                }}
                user_id={user.id}
            />
            <WrapperInput>
                <TextInput
                    onChangeText={setInputComment}
                    value={inputComment}
                    placeholder="Nhập bình luận..."
                />
                <PriceInput
                    onChangeText={setInputPrice}
                    value={inputPrice}
                    placeholder="Nhập định giá của bạn..."
                />
            </WrapperInput>
            <ButtonSendComment onPress={handleSendComment}>
                <Icon>
                    <FontAwesome name="send" size={24} color="black" />
                </Icon>
            </ButtonSendComment>
        </WrapperInputComment>
    )
}
const ItemComment = ({ user, content, price, status_transaction }) => {
    return (
        <>
            <WrapperInputComment>
                <AvatarToProfile
                    source={{
                        uri: baseURL + user.avatar,
                    }}
                    user_id={user.id}
                />
                <CommentText>
                    {content}
                    {status_transaction !== "none" && (
                        <TextStatusComment>
                            {" " + status_transaction}
                        </TextStatusComment>
                    )}
                </CommentText>
                <CommentPriceText>{price}</CommentPriceText>
            </WrapperInputComment>
        </>
    )
}
const SelectStatusComment = ({
    data,
    auctionId,
    setItem,
    statusComment = "in_process",
}) => {
    const dispatch = useDispatch()
    const [commentSelect, setCommentSelect] = useState("")
    const handlSubmitStatusComment = () => {
        dispatch(
            changeStatusAuctionComment({
                auctionId,
                commentId: parseInt(commentSelect),
                statusComment,
            })
        )
            .unwrap()
            .then((res) => {
                setItem((s) => ({ ...s, status_auction: res.status_auction }))
            })
    }
    return (
        <>
            <FieldCustom>
                <Picker
                    selectedValue={commentSelect || "default"}
                    onValueChange={(val) => setCommentSelect(val)}
                    style={{
                        flex: 1,
                    }}
                >
                    <Picker.Item
                        enabled={false}
                        label="Chọn một định giá"
                        value="default"
                        style={{ color: Colors.gray5 }}
                    />
                    {data.map((c, i) => (
                        <Picker.Item
                            key={i}
                            label={c.content + " " + c.price}
                            value={c.id.toString()}
                        />
                    ))}
                </Picker>
            </FieldCustom>
            <ButtonSubmitCommentAuction onPress={handlSubmitStatusComment}>
                <TextButtonSubmit>ĐẶT ĐỊNH GIÁ</TextButtonSubmit>
            </ButtonSubmitCommentAuction>
        </>
    )
}

//diango để hỏi có chắc k
export default AuctionDetailScreen
