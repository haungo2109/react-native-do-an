import React from "react"
import styled from "styled-components"
import { Field, TextTitle } from "../components/ModelEdit"
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons"
import Colors from "../config/Colors"
import { Picker } from "@react-native-picker/picker"
import i18n from "i18n-js"
import { useDispatch, useSelector } from "react-redux"
import { setLanguage, setTheme } from "../redux/reducers/settingReducer"

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

const languages = [
    { name: "Việt Nam", value: "vi" },
    { name: "English", value: "en" },
]
function SettingScreen(props) {
    const dispatch = useDispatch()

    const currentTheme = useSelector((s) => s.setting.theme)
    const currentLanguage = useSelector((s) => s.setting.language)

    const themes = [
        { name: i18n.t("txt.light"), value: "light" },
        { name: i18n.t("txt.dark"), value: "dark" },
    ]
    const handleChangeLanguage = (value) => {
        i18n.locale = value
        dispatch(setLanguage(value))
    }

    const handleChangeTheme = (value) => {
        dispatch(setTheme(value))
    }

    return (
        <Container>
            <FormView>
                <Row>
                    <TextTitle>{i18n.t("txt.title-setting")}</TextTitle>
                </Row>
                <WrapperLabel>
                    <LabelField>{i18n.t("txt.label-language")}</LabelField>
                </WrapperLabel>
                <Field>
                    <Icon>
                        <Entypo
                            name="language"
                            size={25}
                            color={Colors.gray6}
                        />
                    </Icon>
                    <Picker
                        selectedValue={currentLanguage}
                        onValueChange={handleChangeLanguage}
                        style={{ flex: 1 }}
                    >
                        {languages.map((c, i) => (
                            <Picker.Item
                                key={i}
                                label={c.name}
                                value={c.value}
                            />
                        ))}
                    </Picker>
                </Field>
                <WrapperLabel>
                    <LabelField>{i18n.t("txt.label-theme")}</LabelField>
                </WrapperLabel>
                <Field>
                    <Icon>
                        <MaterialCommunityIcons
                            name="theme-light-dark"
                            size={25}
                            color={Colors.gray6}
                        />
                    </Icon>
                    <Picker
                        selectedValue={currentTheme}
                        onValueChange={handleChangeTheme}
                        style={{ flex: 1 }}
                    >
                        {themes.map((c, i) => (
                            <Picker.Item
                                key={i}
                                label={c.name}
                                value={c.value}
                            />
                        ))}
                    </Picker>
                </Field>
            </FormView>
        </Container>
    )
}

export default SettingScreen
