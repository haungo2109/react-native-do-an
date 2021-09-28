import React, { useState } from "react"
import styled from "styled-components"
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome,
} from "@expo/vector-icons"
import Colors from "../config/Colors"
import { Picker } from "@react-native-picker/picker"
import {
    Field,
    SubmitButton,
    TextSubmitButton,
    TextTitle,
} from "./CreateEditAuctionScreen"
import Font from "../config/Font"
import i18n from "i18n-js"

const Container = styled.View`
    flex: 1;
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
const Row = styled.View`
    width: 95%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const Icon = styled.View`
    margin-right: 10px;
`
const WrapperLabel = styled.View`
    width: 95%;
    margin-top: 15px;
    margin-bottom: 5px;
`
const LabelField = styled.Text`
    justify-content: center;
    align-items: flex-start;
`
const TextInput = styled.TextInput`
    flex: 1;
    padding: 7px 0;
    color: ${Colors.gray7};
    font-size: ${Font.big};
`
function FeedbackScreen(props) {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    return (
        <Container>
            <FormView>
                <Row>
                    <TextTitle>{i18n.t("txt.title-feedback")}</TextTitle>
                </Row>
                <WrapperLabel>
                    <LabelField>{i18n.t("txt.label-title")}</LabelField>
                </WrapperLabel>
                <Field>
                    <Icon>
                        <MaterialIcons
                            name="title"
                            size={25}
                            color={Colors.gray6}
                        />
                    </Icon>
                    <TextInput
                        onChangeText={setTitle}
                        value={title}
                        placeholder={i18n.t("placeholder.exam-title-feedback")}
                    />
                </Field>
                <WrapperLabel>
                    <LabelField>{i18n.t("txt.label-content")}</LabelField>
                </WrapperLabel>
                <Field height={"200px"}>
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
                        onChangeText={setContent}
                        value={content}
                        placeholder={i18n.t(
                            "placeholder.exam-content-feedback"
                        )}
                    />
                </Field>
                <SubmitButton>
                    <TextSubmitButton>GỬI</TextSubmitButton>
                </SubmitButton>
            </FormView>
        </Container>
    )
}

export default FeedbackScreen
