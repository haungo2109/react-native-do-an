import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import {
    FontAwesome,
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
    AntDesign,
} from "@expo/vector-icons"
import Colors from "../config/Colors"
import { useDispatch, useSelector } from "react-redux"
import Font from "../config/Font"
import { Platform, ToastAndroid } from "react-native"
import ImageInput from "../components/ImageInput"
import {
    postAuctionAction,
    updateAuction,
} from "../redux/reducers/auctionReducer"
import { Picker } from "@react-native-picker/picker"

export const TextTitle = styled.Text`
    font-size: ${Font.bigger};
    color: ${Colors.gray8};
    font-weight: bold;
    margin-bottom: 15px;
`
const FormView = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    background-color: ${Colors.gray1};
`
const Container = styled.ScrollView`
    flex: 1;
    background-color: ${Colors.gray6o5};
`
const TextInput = styled.TextInput`
    flex: 1;
    padding: 7px 0;
    color: ${Colors.gray7};
    font-size: ${Font.big};
`
const Icon = styled.View`
    margin-right: 10px;
`
export const Field = styled.View`
    height: ${(props) => props.height || "50px"};
    width: 95%;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
    background: ${Colors.gray2};
`
const FieldImage = styled(Field)`
    height: 150px;
`
export const SubmitButton = styled.TouchableOpacity`
    height: 42px;
    width: 95%;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
    justify-content: center;
    margin-top: 10px;
    background-color: ${Colors.facebookColor};
`
export const TextSubmitButton = styled.Text`
    color: ${Colors.gray2};
    font-weight: bold;
`
const ErrorText = styled.Text`
    color: ${Colors.gray1};
    font-size: 12px;
    padding: 2px;
    border-radius: 2px;
    background-color: ${Colors.red5};
`
const CreateEditAuctionScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { data, handleSubmit } = route.params
    const listCategory = useSelector((s) => s.categoryAuction)
    const paymentMethod = useSelector((s) => s.paymentMethod)
    const [error, setError] = useState("")
    const [input, setInput] = useState({ ...data })

    const handleMultiInput = (name) => {
        return (value) => {
            setInput((preState) => ({ ...preState, [name]: value }))
        }
    }
    useEffect(() => {
        if (data !== undefined && input.id !== data.id) setInput({ ...data })
    }, [data])
    // useEffect(() => {
    //     dispatch(getAllAuctionAction())
    // }, [])

    const mapHandleSubmit = {
        addAuction: () => {
            handelSubmitAddAuction()
        },
        editAuction: () => {
            handelSubmitEditAuction()
        },
    }
    const handelSubmitEditAuction = () => {
        const {
            id,
            content,
            auction_images,
            base_price,
            condition,
            deadline,
            category,
            title,
            payment_method,
        } = input
        const data = new FormData()
        if (auction_images?.length)
            auction_images.forEach((item, i) => {
                data.append("images", {
                    uri:
                        Platform.OS === "ios"
                            ? item.uri.replace("file://", "")
                            : item.uri,
                    type:
                        "image/" +
                        item.uri.slice(item.uri.lastIndexOf(".") + 1),
                    name: item.filename || `filename${i}.jpg`,
                })
            })

        data.append("content", content)
        data.append("category", parseInt(category))
        data.append("base_price", parseFloat(base_price))
        data.append("condition", condition)
        data.append("deadline", deadline)
        data.append("payment_method", parseInt(payment_method))
        data.append("title", title)

        dispatch(updateAuction({ id, data }))
            .unwrap()
            .then(handleSuccess)
            .catch(handleError)
    }
    const handelSubmitAddAuction = () => {
        const {
            content,
            auction_images,
            base_price,
            condition,
            deadline,
            category,
            title,
            payment_method,
        } = input
        const data = new FormData()
        if (auction_images.length !== 0)
            auction_images.forEach((item, i) => {
                data.append("images", {
                    uri:
                        Platform.OS === "ios"
                            ? item.uri.replace("file://", "")
                            : item.uri,
                    type:
                        "image/" +
                        item.uri.slice(item.uri.lastIndexOf(".") + 1),
                    name: item.filename || `filename${i}.jpg`,
                })
            })

        data.append("title", title)
        data.append("content", content)
        data.append("base_price", parseFloat(base_price))
        data.append("condition", condition)
        data.append("deadline", deadline)
        data.append("category", parseInt(category))
        data.append("payment_method", parseInt(payment_method))

        dispatch(postAuctionAction(data))
            .unwrap()
            .then(handleSuccess)
            .catch(handleError)
    }
    const handleError = (err) => {
        setError(err.message)
        ToastAndroid.show("Đăng không thành công", ToastAndroid.SHORT)
    }
    const handleSuccess = () => {
        setError("")
        ToastAndroid.show("Đăng thành công", ToastAndroid.SHORT)
        navigation.goBack()
    }
    if (data && data?.category)
        return (
            <Container>
                <FormView>
                    {error !== "" && <ErrorText>{error}</ErrorText>}
                    {input["title"] !== undefined && (
                        <Field>
                            <Icon>
                                <MaterialIcons
                                    name="title"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <TextInput
                                onChangeText={handleMultiInput("title")}
                                value={input["title"]}
                                placeholder="Nhập tiêu đề đấu giá..."
                            />
                        </Field>
                    )}
                    {input["content"] !== undefined && (
                        <Field height={"110px"}>
                            <Icon>
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={handleMultiInput("content")}
                                value={input["content"]}
                                placeholder="Nhập nội dung bài viết"
                            />
                        </Field>
                    )}
                    {input["base_price"] !== undefined && (
                        <Field>
                            <Icon>
                                <MaterialCommunityIcons
                                    name="currency-usd"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <TextInput
                                onChangeText={handleMultiInput("base_price")}
                                value={input["base_price"].toString()}
                                placeholder="Nhập giá thấp nhất của sản phẩm..."
                            />
                        </Field>
                    )}
                    {input["condition"] !== undefined && (
                        <Field height={"70px"}>
                            <Icon>
                                <AntDesign
                                    name="filetext1"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <TextInput
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={handleMultiInput("condition")}
                                value={input["condition"]}
                                placeholder="Nhập điều kiện đấu giá..."
                            />
                        </Field>
                    )}
                    {input["deadline"] !== undefined && (
                        <Field>
                            <Icon>
                                <Ionicons
                                    name="timer"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <TextInput
                                onChangeText={handleMultiInput("deadline")}
                                value={input["deadline"]}
                                placeholder="Nhập thời hạn đấu giá..."
                            />
                        </Field>
                    )}
                    {input["payment_method"] !== undefined && (
                        <Field>
                            <Icon>
                                <MaterialIcons
                                    name="category"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <Picker
                                selectedValue={input[
                                    "payment_method"
                                ].toString()}
                                onValueChange={handleMultiInput(
                                    "payment_method"
                                )}
                                style={{ flex: 1 }}
                            >
                                <Picker.Item
                                    value={"default"}
                                    label="Chọn phương thức thanh toán"
                                    enabled={false}
                                    style={{ color: Colors.gray5 }}
                                />
                                {paymentMethod.map((c, i) => (
                                    <Picker.Item
                                        key={i}
                                        label={c.name}
                                        value={c.id.toString()}
                                    />
                                ))}
                            </Picker>
                        </Field>
                    )}
                    {input["category"] !== undefined && (
                        <Field>
                            <Icon>
                                <MaterialIcons
                                    name="category"
                                    size={25}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <Picker
                                selectedValue={input["category"].toString()}
                                onValueChange={handleMultiInput("category")}
                                style={{ flex: 1 }}
                            >
                                <Picker.Item
                                    label="Loại sản phẩm đấu giá"
                                    value="default"
                                    enabled={false}
                                    style={{ color: Colors.gray5 }}
                                />
                                {listCategory.map((c, i) => (
                                    <Picker.Item
                                        key={i}
                                        label={c.name}
                                        value={c.id.toString()}
                                    />
                                ))}
                            </Picker>
                        </Field>
                    )}
                    {input["auction_images"] !== undefined && (
                        <FieldImage>
                            <Icon>
                                <FontAwesome
                                    name="image"
                                    size={24}
                                    color={Colors.gray6}
                                />
                            </Icon>
                            <ImageInput
                                photo={input["auction_images"]}
                                setPhoto={handleMultiInput("auction_images")}
                            />
                        </FieldImage>
                    )}
                    <SubmitButton onPress={mapHandleSubmit[handleSubmit]}>
                        <TextSubmitButton>ĐĂNG</TextSubmitButton>
                    </SubmitButton>
                </FormView>
            </Container>
        )
    else
        return (
            <Container>
                <FormView>
                    <SubmitButton
                        onPress={() => {
                            navigation.navigate("App")
                        }}
                    >
                        <TextSubmitButton>Quay lại</TextSubmitButton>
                    </SubmitButton>
                </FormView>
            </Container>
        )
}

export default CreateEditAuctionScreen
