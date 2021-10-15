import React, { useState } from "react"
import styled from "styled-components"
import DateTimePicker from "@react-native-community/datetimepicker"
import Font from "../config/Font"
import { colorText } from "../config/PropertyCss"
import moment from "moment"

const ButtonControlDatePicker = styled.TouchableOpacity`
    flex: 1;
    padding: 7px 0;
`
const TextHolder = styled.Text`
    color: ${(props) => props.placeholderTextColor};
    font-size: ${Font.big};
`
const TextContent = styled.Text`
    color: ${colorText};
    font-size: ${Font.big};
`

function DateTimeInput({
    onChangeText,
    value,
    placeholder,
    theme,
    placeholderTextColor,
}) {
    const [date, setDate] = useState(new Date())
    const [showPickDate, setShowPickDate] = useState(false)

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date
        let date = new Date(currentDate)
        setShowPickDate(false)
        setDate(date)
        onChangeText(
            moment(date).utcOffset("+07:00").format("YYYY-MM-DD hh:mm")
        )
    }

    return (
        <ButtonControlDatePicker onPress={() => setShowPickDate(!showPickDate)}>
            {showPickDate && (
                <DateTimePicker
                    value={date}
                    mode={"date"}
                    display="calendar"
                    onChange={onChangeDate}
                    textColor={colorText({
                        themeColor: theme === "light",
                    })}
                />
            )}
            {value !== "" ? (
                <TextContent themeColor={theme === "light"}>
                    {value}
                </TextContent>
            ) : (
                <TextHolder placeholderTextColor={placeholderTextColor}>
                    {placeholder}
                </TextHolder>
            )}
        </ButtonControlDatePicker>
    )
}

export default DateTimeInput
