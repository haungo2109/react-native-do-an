import React, { useMemo, useState } from "react"
import styled from "styled-components/native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import Colors from "../config/Colors"
import { AssetsSelector } from "expo-images-picker"
import { MediaType } from "expo-media-library"
import { Modal } from "react-native"
import { useSelector } from "react-redux"
import useModelImageSelection from "../hooks/useModelImageSelection"
import i18n from "i18n-js"

const Container = styled.View`
    flex: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
`
const ModelView = styled.View`
    height: 100%;
    width: 100%;
`
const ModelImageSelection = () => {
    const { show, max, min } = useSelector(
        (state) => state.controller.imageSelection
    )
    const { hiddenModelImageSelection } = useModelImageSelection()

    const widgetSettings = useMemo(
        () => ({
            getImageMetaData: false,
            initialLoad: 50,
            assetsType: [MediaType.photo],
            minSelection: min,
            maxSelection: max,
            portraitCols: 4,
            landscapeCols: 4,
        }),
        []
    )
    const widgetErrors = useMemo(
        () => ({
            errorTextColor: Colors.red7,
            errorMessages: {
                hasErrorWithPermissions: "Vui lòng cho quyền truy cập vào ảnh.",
                hasErrorWithLoading: "Có lỗi xảy ra trong quá trình tải ảnh.",
                hasErrorWithResizing: "Có lỗi xảy ra trong quá trình sửa ảnh.",
                hasNoAssets: "Không có tấm ảnh nào được tìm thấy.",
            },
        }),
        []
    )
    const widgetStyles = useMemo(
        () => ({
            margin: 2,
            bgColor: Colors.gray1,
            spinnerColor: Colors.blue6,
            widgetWidth: 99,
            videoIcon: {
                Component: Ionicons,
                iconName: "ios-videocam",
                color: "tomato",
                size: 20,
            },
            selectedIcon: {
                Component: Ionicons,
                iconName: "ios-checkmark-circle-outline",
                color: "white",
                bg: "#0eb14970",
                size: 26,
            },
        }),
        []
    )
    const widgetNavigator = useMemo(
        () => ({
            Texts: {
                finish: i18n.t("btn.finish-model-image"),
                back: i18n.t("btn.back-model-image"),
                selected: i18n.t("txt.selected-image"),
            },
            midTextColor: Colors.gray8,
            minSelection: 1,
            buttonTextStyle: {
                color: Colors.gray2,
            },
            buttonStyle: {
                backgroundColor: "orange",
                borderRadius: 5,
            },
            onBack: () => hiddenModelImageSelection(),
            onSuccess: (data) => onSuccess(data),
        }),
        []
    )

    const onSuccess = async (data) => {
        hiddenModelImageSelection(data)
    }

    return (
        <Container>
            <Modal animationType="slide" visible={show}>
                <ModelView>
                    <AssetsSelector
                        Settings={widgetSettings}
                        Errors={widgetErrors}
                        Styles={widgetStyles}
                        Navigator={widgetNavigator}
                    />
                </ModelView>
            </Modal>
        </Container>
    )
}

export default ModelImageSelection
