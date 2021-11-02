import React, { useEffect, useState } from "react"
import { Alert, ScrollView, ToastAndroid } from "react-native"
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
    addRatingAuctionAction,
    changeStatusAuctionComment,
    getOneAuctionAction,
} from "../redux/actions"
import {
    bgBack,
    bgBtn,
    bgBtnSubmit,
    bgItem,
    colorBtn,
    colorBtnSubmit,
    colorIcon,
    colorPlaceholder,
    colorText,
} from "../config/PropertyCss"
import { Rating, AirbnbRating } from "react-native-ratings"

const Container = styled.ScrollView`
    background-color: ${bgBack};
`

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
    color: ${colorText};
    background-color: ${bgItem};
`
const CommentPriceText = styled.Text`
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    color: ${colorText};
    background-color: ${bgItem};
`
const TextInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    color: ${colorText};
    background-color: ${bgItem};
`
const PriceInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    color: ${colorText};
    background-color: ${bgItem};
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
const ButtonPayment = styled(SubmitButton)`
    background-color: ${bgBtnSubmit};
`
const TextButtonPayment = styled(TextSubmitButton)`
    color: ${colorBtnSubmit};
`
const WrapperTextInfo = styled.View`
    margin-top: 5px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${bgBtn};
`
const TextInfo = styled.Text`
    font-size: ${Font.big};
    color: ${colorText};
`
const WrapperRating = styled.View`
    flex: 1;
    padding: 11px;
    border-radius: 7px;
    background-color: ${bgItem};
    margin-bottom: 10px;
`
const TextRating = styled.Text`
    flex: 1;
    color: ${colorText};
`
function AuctionDetailScreen({ route, navigation }) {
    const dispatch = useDispatch()

    const item = useSelector(
        (s) =>
            s.auction.data.find((c) => c.id == route.params.id) ||
            s.auctionJoin.data.find((c) => c.id == route.params.id) ||
            s.myAuction.data.find((c) => c.id == route.params.id)
    )

    const { data } = useSelector((state) => state.comment)
    const user = useSelector((state) => state.user)
    const payment = useSelector((state) => state.paymentMethod)
    const theme = useSelector((s) => s.setting.theme)
    const { showModelMenu } = useModelMenu()

    useEffect(() => {
        dispatch(fetchAuctionComment(route.params.id))
        if (!item?.user) {
            dispatch(getOneAuctionAction(route.params.id))
                .unwrap()
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
    const checkLiked = (like = []) => {
        if (user) {
            return like.includes(user.id)
        }
        return false
    }
    const paywithMomo = () => {
        let comment = data.find((c) => c.status_transaction == "in process")
        if (comment === undefined) return

        navigation.navigate("MomoPayment", {
            amount: comment.price,
            auction_id: item.id,
            comment_id: comment.id,
        })
    }
    const handleRating = (rating) => {
        let data = new FormData()
        data.append("rating", rating.toString())
        dispatch(addRatingAuctionAction({ auctionId: item.id, data })).catch(err=>{
            ToastAndroid.SHORT("Thêm không thành công.")
        })
    }
    const renderActionForBuyler = () => {
        switch (item.status_auction) {
            case "fail":
            case "succ":
                if (item.payment_method === 1)
                    return (
                        <WrapperRating themeColor={theme === "light"}>
                            <TextRating themeColor={theme === "light"}>
                                Đánh giá sản phẩm
                            </TextRating>
                            <AirbnbRating
                                defaultRating={item.rating || 0}
                                count={10}
                                size={20}
                                reviewSize={20}
                                showRating={false}
                                onFinishRating={handleRating}
                            />
                        </WrapperRating>
                    )
                return null
            case "in process":
                if (item.payment_method === 1)
                    return (
                        <ButtonPayment themeColor={theme === "light"}>
                            <TextButtonPayment
                                onPress={paywithMomo}
                                themeColor={theme === "light"}
                            >
                                Thanh toán bằng Momo
                            </TextButtonPayment>
                        </ButtonPayment>
                    )
                else {
                    return (
                        <WrapperTextInfo themeColor={theme === "light"}>
                            <TextInfo themeColor={theme === "light"}>
                                Vui lòng liên hệ với {item.user.full_name} để
                                thanh toán
                            </TextInfo>
                        </WrapperTextInfo>
                    )
                }
            default:
                return (
                    <InputCommentForm
                        user={user}
                        auctionId={item.id}
                        theme={theme}
                    />
                )
        }
    }
    return (
        <Container themeColor={theme === "light"}>
            {item?.payment_method && (
                <Auction
                    showAll={true}
                    {...item}
                    isLike={checkLiked(item.like)}
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
                            theme={theme}
                        />
                    ))}
                    {/* RENDER ACTION FOR OWNER AND BUYLER */}
                    {user.id === item.user.id ? (
                        item.status_auction === "being auctioned" ? (
                            <SelectStatusComment
                                data={data}
                                auctionId={item.id}
                                theme={theme}
                            />
                        ) : null
                    ) : (
                        renderActionForBuyler()
                    )}
                </WrapperComment>
            )}
        </Container>
    )
}
const InputCommentForm = ({ user, auctionId, theme }) => {
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
                    placeholderTextColor={colorPlaceholder({
                        themeColor: theme === "light",
                    })}
                    themeColor={theme === "light"}
                />
                <PriceInput
                    onChangeText={setInputPrice}
                    value={inputPrice}
                    placeholder="Nhập định giá của bạn..."
                    placeholderTextColor={colorPlaceholder({
                        themeColor: theme === "light",
                    })}
                    themeColor={theme === "light"}
                />
            </WrapperInput>
            <ButtonSendComment onPress={handleSendComment}>
                <Icon>
                    <FontAwesome
                        name="send"
                        size={24}
                        color={colorIcon(theme === "light")}
                    />
                </Icon>
            </ButtonSendComment>
        </WrapperInputComment>
    )
}
const ItemComment = ({ user, content, price, status_transaction, theme }) => {
    return (
        <>
            <WrapperInputComment>
                <AvatarToProfile
                    source={{
                        uri: baseURL + user.avatar,
                    }}
                    user_id={user.id}
                />
                <CommentText themeColor={theme === "light"}>
                    {content}
                    {status_transaction !== "none" && (
                        <TextStatusComment>
                            {" " + status_transaction}
                        </TextStatusComment>
                    )}
                </CommentText>
                <CommentPriceText themeColor={theme === "light"}>
                    {price}
                </CommentPriceText>
            </WrapperInputComment>
        </>
    )
}
const SelectStatusComment = ({
    data,
    auctionId,
    theme,
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
            .catch((err) => Alert.alert("Lỗi", err.message))
    }
    return (
        <>
            <FieldCustom themeColor={theme === "light"}>
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
                    {data.map((c, i) =>
                        c.status_transaction === "none" ? (
                            <Picker.Item
                                key={i}
                                label={c.content + " " + c.price}
                                value={c.id.toString()}
                            />
                        ) : null
                    )}
                </Picker>
            </FieldCustom>
            <ButtonSubmitCommentAuction
                onPress={handlSubmitStatusComment}
                themeColor={theme === "light"}
            >
                <TextButtonSubmit themeColor={theme === "light"}>
                    ĐẶT ĐỊNH GIÁ
                </TextButtonSubmit>
            </ButtonSubmitCommentAuction>
        </>
    )
}

export default AuctionDetailScreen
