import React, { useState } from "react"
import styled from "styled-components/native"
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons"
import Colors from "../config/Colors"
import { useDispatch, useSelector } from "react-redux"
import { deletePostAction } from "../redux/reducers/postReducer"
import useModelMenu from "../hooks/useModelMenu"
import { baseURL } from "../api/apiClient"
import {
    changeStatusAuctionComment,
    deleteAuctionAction,
    setFailAuctionAction,
} from "../redux/reducers/auctionReducer"
import { Alert, Modal, ToastAndroid } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Font from "../config/Font"
import { useNavigation } from "@react-navigation/core"
import {
    reportAuctionAction,
    reportPostAction,
} from "../redux/reducers/reportReducer"
import i18n from "i18n-js"
import { bgBack, bgView, colorIcon, colorText } from "../config/PropertyCss"

const ViewCheckEven = styled.TouchableWithoutFeedback`
    flex: 1;
`
const ViewNone = styled.View`
    flex: 1;
    opacity: 0.5;
    background-color: ${Colors.gray6};
`
const Container = styled.View`
    flex: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: ${bgBack};
`
const Text = styled.Text`
    color: ${colorText};
    font-weight: bold;
`
const Icon = styled.View`
    margin-right: 10px;
`
const Button = styled.TouchableOpacity`
    height: 50px;
    flex: 1;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
    background: ${bgView};
`
const Field = styled.View`
    height: ${(props) => props.height || "50px"};
    width: 95%;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
    background: ${Colors.gray2};
`
const TextInput = styled.TextInput`
    flex: 1;
    color: ${Colors.gray7};
    font-size: ${Font.big};
`
const TextTitle = styled.Text`
    font-size: ${Font.bigger};
    color: ${Colors.gray8};
    font-weight: bold;
    margin-bottom: 15px;
`
const Row = styled.View`
    width: 95%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const WrapperModelReport = styled.View`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.gray6o5};
`
const FormView = styled.View`
    width: 95%;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    background-color: ${Colors.gray1};
    border-radius: 10px;
`
const SubmitButton = styled.TouchableOpacity`
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
const TextSubmitButton = styled.Text`
    color: ${Colors.gray2};
    font-weight: bold;
`
const WrapperButtonClose = styled.View`
    position: absolute;
    right: 0;
    top: 0;
`
const ButtonClose = styled.TouchableWithoutFeedback`
    border-radius: 10px;
    background-color: ${Colors.gray9};
`
const ModelMenu = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false)
    const [report, setReport] = useState({ type: "", content: "" })
    const listRepostType = useSelector((s) => s.reportType)
    const theme = useSelector((s) => s.setting.theme)
    const { id, show, listChoose, data } = useSelector(
        (s) => s.controller.menuPost
    )

    const { hiddenModelMenu } = useModelMenu()

    const listButton = {
        edit: {
            icon: (
                <AntDesign
                    name="edit"
                    size={25}
                    color={colorIcon(theme === "light")}
                />
            ),
            text: i18n.t("btn.model-menu-edit-post"),
            handle: () => {
                hiddenModelMenu()
                let newData = Object.assign(data, {})
                let hashtag = ""
                let post_images = []

                if (newData?.hashtag) {
                    hashtag = newData.hashtag.map((c) => c.name).join(",")
                }
                if (newData?.post_images) {
                    post_images = newData.post_images.map((c) => ({
                        uri: baseURL + c,
                    }))
                }
                navigation.navigate("CreateEditPost", {
                    id,
                    handleSubmit: "editPost",
                    data: { ...newData, hashtag, post_images },
                })
            },
        },
        editAuction: {
            icon: (
                <AntDesign
                    name="edit"
                    size={25}
                    color={colorIcon(theme === "light")}
                />
            ),
            text: i18n.t("btn.model-menu-edit-auction"),
            handle: () => {
                hiddenModelMenu()
                let newData = Object.assign(data, {})
                let auction_images = []

                if (newData?.auction_images) {
                    auction_images = newData.auction_images.map((c) => ({
                        uri: baseURL + c,
                    }))
                }
                let category = newData.category
                category = category.toString()

                let base_price = newData.base_price
                base_price = base_price.toString()
                navigation.navigate("CreateEditAuction", {
                    id,
                    handleSubmit: "editAuction",
                    data: { ...newData, auction_images, category, base_price },
                })
            },
        },
        delete: {
            icon: (
                <AntDesign
                    name="delete"
                    size={25}
                    color={colorIcon(theme === "light")}
                />
            ),
            text: i18n.t("btn.model-menu-delete-post"),
            handle: () => {
                dispatch(deletePostAction(id))
                    .unwrap()
                    .catch((err) => Alert.alert(err.message))
                hiddenModelMenu()
            },
        },
        deleteAuction: {
            icon: (
                <AntDesign
                    name="delete"
                    size={25}
                    color={colorIcon(theme === "light")}
                />
            ),
            text: i18n.t("btn.model-menu-delete-auction"),
            handle: () => {
                dispatch(deleteAuctionAction(id))
                    .unwrap()
                    .catch((err) => Alert.alert(err.message))
                hiddenModelMenu()
            },
        },
        report: {
            icon: (
                <MaterialIcons
                    name="report"
                    size={25}
                    color={colorIcon(theme === "light")}
                />
            ),
            text: i18n.t("btn.model-menu-report-post"),
            handle: () => {
                setModalVisible(true)
            },
        },
        reportAuction: {
            icon: (
                <MaterialIcons
                    name="report"
                    size={25}
                    color={colorIcon(theme === "light")}
                />
            ),
            text: i18n.t("btn.model-menu-report-auction"),
            handle: () => {
                setModalVisible(true)
            },
        },
        setFailComment: {
            icon: <AntDesign name="minus" size={25} color={Colors.red5} />,
            text: i18n.t("btn.model-menu-set-fail-comment"),
            handle: () => {
                dispatch(
                    changeStatusAuctionComment({
                        auctionId: id,
                        commentId: data.commentId,
                        statusComment: "fail",
                    })
                )
                    .unwrap()
                    .then(() => hiddenModelMenu())
                    .catch((err) => Alert.alert(err.message))
            },
        },
        setSuccessComment: {
            icon: <AntDesign name="check" size={24} color={Colors.green5} />,
            text: i18n.t("btn.model-menu-set-success-comment"),
            handle: () => {
                dispatch(
                    changeStatusAuctionComment({
                        auctionId: id,
                        commentId: data.commentId,
                        statusComment: "success",
                    })
                )
                    .unwrap()
                    .then(() => hiddenModelMenu())
                    .catch((err) => Alert.alert(err.message))
            },
        },
        setFailAuction: {
            icon: <AntDesign name="close" size={24} color={Colors.red5} />,
            text: i18n.t("btn.model-menu-set-fail-auction"),
            handle: () => {
                dispatch(setFailAuctionAction(id))
                    .unwrap()
                    .then(() => hiddenModelMenu())
                    .catch((err) => Alert.alert(err.message))
            },
        },
    }
    const handleError = (err) => {
        ToastAndroid.show("Đã gửi thất bại", ToastAndroid.SHORT)
    }
    const handleSuccess = () => {
        ToastAndroid.show("Đã gửi thành công", ToastAndroid.SHORT)
        setModalVisible(false)
        setReport({ type: "", content: "" })
        hiddenModelEdit()
    }
    const handleMultiInput = (name) => {
        return (value) => {
            setReport((preState) => ({ ...preState, [name]: value }))
        }
    }
    const handleReport = () => {
        if (data.category) {
            dispatch(
                reportAuctionAction({
                    auction: data.id,
                    ...report,
                })
            )
                .unwrap()
                .then(handleSuccess)
                .catch(handleError)
        } else if (data.hashtag) {
            dispatch(
                reportPostAction({
                    post: data.id,
                    ...report,
                })
            )
                .unwrap()
                .then(handleSuccess)
                .catch(handleError)
        }
    }
    if (show)
        return (
            <>
                <ViewCheckEven onPress={() => hiddenModelMenu(false)}>
                    <ViewNone />
                </ViewCheckEven>
                <Container themeColor={theme === "light"}>
                    {listChoose &&
                        listChoose.map((c, i) => (
                            <Button
                                onPress={listButton[c].handle}
                                key={i}
                                themeColor={theme === "light"}
                            >
                                <Icon>{listButton[c].icon}</Icon>
                                <Text themeColor={theme === "light"}>
                                    {listButton[c].text}
                                </Text>
                            </Button>
                        ))}
                </Container>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <WrapperModelReport>
                        <FormView>
                            <Row>
                                <TextTitle>Báo cáo</TextTitle>
                                <WrapperButtonClose>
                                    <ButtonClose
                                        onPress={() =>
                                            setModalVisible(!modalVisible)
                                        }
                                    >
                                        <AntDesign
                                            name="close"
                                            size={25}
                                            color={Colors.gray6}
                                        />
                                    </ButtonClose>
                                </WrapperButtonClose>
                            </Row>
                            <Field height={"70px"}>
                                <Icon>
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.gray6}
                                    />
                                </Icon>
                                <TextInput
                                    onChangeText={handleMultiInput("content")}
                                    value={report["content"]}
                                    placeholder="Nhập nội dung báo cáo..."
                                />
                            </Field>
                            <Field>
                                <Icon>
                                    <MaterialIcons
                                        name="category"
                                        size={25}
                                        color={Colors.gray6}
                                    />
                                </Icon>
                                <Picker
                                    selectedValue={report["type"] || "default"}
                                    onValueChange={handleMultiInput("type")}
                                    style={{ flex: 1 }}
                                >
                                    <Picker.Item
                                        value={"default"}
                                        label="Chọn loại báo cáo"
                                        enabled={false}
                                        style={{ color: Colors.gray5 }}
                                    />
                                    {listRepostType.map((c, i) => (
                                        <Picker.Item
                                            key={i}
                                            label={c.name}
                                            value={c.id.toString()}
                                        />
                                    ))}
                                </Picker>
                            </Field>
                            <SubmitButton onPress={handleReport}>
                                <TextSubmitButton>GỬI</TextSubmitButton>
                            </SubmitButton>
                        </FormView>
                    </WrapperModelReport>
                </Modal>
            </>
        )
    else return null
}

export default ModelMenu
