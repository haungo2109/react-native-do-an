import Colors from "./Colors"

const bgBack = (p) => (p.themeColor ? Colors.gray3 : Colors.gray7)
const bgView = (p) => (p.themeColor ? Colors.gray2 : Colors.gray6)
const bgModel = (p) => (p.themeColor ? Colors.gray6o5 : Colors.gray6o5)
const bgItem = (p) => (p.themeColor ? Colors.gray1 : Colors.gray5)
const bgBtn = (p) => (p.themeColor ? Colors.gray3 : Colors.gray4)
const bgBtnSubmit = (p) => (p.themeColor ? Colors.facebookColor : Colors.gray4)

const colorText = (p) => (p.themeColor ? Colors.gray7 : Colors.gray3)
const colorTextTitle = (p) => (p.themeColor ? Colors.gray8 : Colors.gray2)
const colorPlaceholder = (p) => (p.themeColor ? Colors.gray5 : Colors.gray4)
const colorCaption = (p) => (p.themeColor ? Colors.gray4 : Colors.gray4)
const colorIcon = (themeColor) => (themeColor ? Colors.gray6 : Colors.gray4)
const colorBtn = (p) => (p.themeColor ? Colors.gray8 : Colors.gray7)
const colorBtnSubmit = (p) => (p.themeColor ? Colors.gray3 : Colors.gray8)

const colorIconDrawLight = (p) => (p ? "#7cc" : Colors.gray5)
const colorIconDrawDark = (p) => (p ? "#7cc" : Colors.gray4)

export {
    bgBack,
    bgItem,
    bgModel,
    bgView,
    bgBtnSubmit,
    bgBtn,
    colorBtn,
    colorCaption,
    colorPlaceholder,
    colorText,
    colorTextTitle,
    colorIcon,
    colorBtnSubmit,
    colorIconDrawDark,
    colorIconDrawLight,
}
