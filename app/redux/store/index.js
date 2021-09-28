import { configureStore } from "@reduxjs/toolkit"
import reducers from "../reducers"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "redux"

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
    whitelist: [
        "user",
        "categoryAuction",
        "reportType",
        "notification",
        "paymentMethod",
        "setting",
    ],
}

const combinedReducer = combineReducers(reducers)

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
        state = undefined
        AsyncStorage.removeItem("persist:root")
    }
    return combinedReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

let persistor = persistStore(store)

export { persistor, store }
