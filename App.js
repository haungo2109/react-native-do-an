import React from "react"
import { ActivityIndicator, StatusBar, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { store, persistor } from "./app/redux/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import styled from "styled-components"
import ModelEdit from "./app/components/ModelEdit"
import ModelMenu from "./app/components/ModelMenu"
import ModelImageSelection from "./app/components/ModelImageSelection"
import "react-native-gesture-handler"
import AppContainer from "./app/navigations"
import i18n from "i18n-js"
import translations from "./app/assets/locales"

i18n.translations = translations
i18n.fallbacks = true

const WrapperModel = styled.View`
    flex: 1;
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
`
const LoadingMarkup = () => (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
        }}
    >
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
)
export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingMarkup />} persistor={persistor}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <NavigationContainer>
                    <AppContainer />
                    <WrapperModel>
                        <ModelMenu />
                        <ModelEdit />
                        <ModelImageSelection />
                    </WrapperModel>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}
const listPrices = () => {
    console.log(lobbies)
    if (lobbies?.wedding_lobby_prices?.length) {
        console.log(lobbies.wedding_lobby_prices)
        return lobbies.wedding_lobby_prices.map((p) => {
            return (
                <div key={p.time}>
                    {p.time === 1 && <div>Buổi sáng: {p.price} VNĐ</div>}
                    {p.time === 2 && <div>Buổi trưa: {p.price} VNĐ</div>}
                    {p.time === 3 && <div>Buổi tối: {p.price} VNĐ</div>}
                </div>
            )
        })
    }
    return null
}
