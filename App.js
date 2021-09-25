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
                </NavigationContainer>
                <WrapperModel>
                    <ModelMenu />
                    <ModelEdit />
                    <ModelImageSelection />
                </WrapperModel>
            </PersistGate>
        </Provider>
    )
}
