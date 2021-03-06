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
import { postAuctionAction, updateAuction } from "../redux/actions"
import { Picker } from "@react-native-picker/picker"
import {
    bgBack,
    bgBtnSubmit,
    bgItem,
    bgModel,
    bgView,
    colorBtnSubmit,
    colorCaption,
    colorIcon,
    colorPlaceholder,
    colorText,
    colorTextTitle,
} from "../config/PropertyCss"
import DateTimeInput from "../components/DateTimeInput"

export const TextTitle = styled.Text`
    font-size: ${Font.bigger};
    color: ${colorTextTitle};
    font-weight: bold;
    margin-bottom: 15px;
`
const FormView = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    /* background-color: ${bgItem}; */
`
const Container = styled.ScrollView`
    flex: 1;
    background-color: ${bgBack};
`
const TextInput = styled.TextInput`
    flex: 1;
    padding: 7px 0;
    color: ${colorText};
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
    background: ${bgItem};
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
    background-color: ${bgBtnSubmit};
`
export const TextSubmitButton = styled.Text`
    color: ${colorBtnSubmit};
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

    const [error, setError] = useState("")
    const [input, setInput] = useState({ ...data })

    const listCategory = useSelector((s) => s.categoryAuction)
    const paymentMethod = useSelector((s) => s.paymentMethod)
    const theme = useSelector((s) => s.setting.theme)

    const handleMultiInput = (name) => {
        return (value) => {
            setInput((preState) => ({ ...preState, [name]: value }))
        }
    }
    useEffect(() => {
        if (data !== undefined && input.id !== data.id) setInput({ ...data })
    }, [data])

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
        ToastAndroid.show("????ng kh??ng th??nh c??ng", ToastAndroid.SHORT)
    }
    const handleSuccess = () => {
        setError("")
        ToastAndroid.show("????ng th??nh c??ng", ToastAndroid.SHORT)
        navigation.goBack()
    }
    if (data && data?.category)
        return (
            <Container themeColor={theme === "light"}>
                <FormView themeColor={theme === "light"}>
                    {error !== "" && <ErrorText>{error}</ErrorText>}
                    {input["title"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <MaterialIcons
                                    name="title"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                onChangeText={handleMultiInput("title")}
                                value={input["title"]}
                                placeholder="Nh???p ti??u ????? ?????u gi??..."
                                themeColor={theme === "light"}
                            />
                        </Field>
                    )}
                    {input["content"] !== undefined && (
                        <Field height={"110px"} themeColor={theme === "light"}>
                            <Icon>
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={handleMultiInput("content")}
                                value={input["content"]}
                                placeholder="Nh???p n???i dung b??i vi???t"
                            />
                        </Field>
                    )}
                    {input["base_price"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <MaterialCommunityIcons
                                    name="currency-usd"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                onChangeText={handleMultiInput("base_price")}
                                value={input["base_price"].toString()}
                                placeholder="Nh???p gi?? th???p nh???t c???a s???n ph???m..."
                            />
                        </Field>
                    )}
                    {input["condition"] !== undefined && (
                        <Field height={"70px"} themeColor={theme === "light"}>
                            <Icon>
                                <AntDesign
                                    name="filetext1"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <TextInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                themeColor={theme === "light"}
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={handleMultiInput("condition")}
                                value={input["condition"]}
                                placeholder="Nh???p ??i???u ki???n ?????u gi??..."
                            />
                        </Field>
                    )}
                    {input["deadline"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <Ionicons
                                    name="timer"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <DateTimeInput
                                placeholderTextColor={colorPlaceholder({
                                    themeColor: theme === "light",
                                })}
                                theme={theme}
                                onChangeText={handleMultiInput("deadline")}
                                value={input["deadline"]}
                                placeholder="Nh???p th???i h???n ?????u gi??..."
                            />
                        </Field>
                    )}
                    {input["payment_method"] !== undefined && (
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <MaterialIcons
                                    name="category"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <Picker
                                selectedValue={input[
                                    "payment_method"
                                ].toString()}
                                onValueChange={handleMultiInput(
                                    "payment_method"
                                )}
                                style={{
                                    flex: 1,
                                    color: colorText({
                                        themeColor: theme === "light",
                                    }),
                                }}
                            >
                                <Picker.Item
                                    value={"default"}
                                    label="Ch???n ph????ng th???c thanh to??n"
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
                        <Field themeColor={theme === "light"}>
                            <Icon>
                                <MaterialIcons
                                    name="category"
                                    size={25}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <Picker
                                selectedValue={input["category"].toString()}
                                onValueChange={handleMultiInput("category")}
                                style={{
                                    flex: 1,
                                    color: colorText({
                                        themeColor: theme === "light",
                                    }),
                                }}
                            >
                                <Picker.Item
                                    label="Lo???i s???n ph???m ?????u gi??"
                                    value="default"
                                    enabled={false}
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
                        <FieldImage themeColor={theme === "light"}>
                            <Icon>
                                <FontAwesome
                                    name="image"
                                    size={24}
                                    color={colorIcon(theme === "light")}
                                />
                            </Icon>
                            <ImageInput
                                photo={input["auction_images"]}
                                setPhoto={handleMultiInput("auction_images")}
                            />
                        </FieldImage>
                    )}
                    <SubmitButton
                        onPress={mapHandleSubmit[handleSubmit]}
                        themeColor={theme === "light"}
                    >
                        <TextSubmitButton themeColor={theme === "light"}>
                            ????NG
                        </TextSubmitButton>
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
                        <TextSubmitButton>Quay l???i</TextSubmitButton>
                    </SubmitButton>
                </FormView>
            </Container>
        )
}

export default CreateEditAuctionScreen
