import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import { uid as uuid } from "uid"

const firebaseConfig = {
    apiKey: "AIzaSyAWOgTbnXUxPUo3EIu46tMSAuHJ2otlsPM",
    authDomain: "serverhost-9edd6.firebaseapp.com",
    databaseURL: "https://serverhost-9edd6.firebaseio.com",
    projectId: "serverhost-9edd6",
    storageBucket: "serverhost-9edd6.appspot.com",
    messagingSenderId: "972868105319",
    appId: "1:972868105319:web:70e37bfc1f7321353310c2",
}

var app = firebase.initializeApp(firebaseConfig)
var db = app.database()

export function onMessageApi(chatId, callback) {
    return db.ref(`chats/${chatId}`).on("value", (snapshot) => {
        if (snapshot && snapshot.exists()) callback(snapshot.val())
    })
}
export function onMemberApi(userId, callback) {
    return db.ref(`members/${userId}`).on("value", (snapshot) => {
        if (snapshot && snapshot.exists()) callback(snapshot.val())
    })
}
export function getChatApi(uid, userId) {
    return db
        .ref(`members/${uid}/${userId}`)
        .get()
        .then((snapshot) => {
            if (snapshot && snapshot.exists()) {
                console.log(snapshot.val())
                return snapshot.val().chatId
            } else {
                console.log("No data available")
                return null
            }
        })
        .catch((error) => {
            console.error(error)
        })
}
export function getLastMessage(chatId) {
    return db
        .ref(`chats/${chatId}`)
        .limitToLast(1)
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                return Object.values(snapshot.val())[0]
            } else {
                console.log("No data available")
                return {}
            }
        })
        .catch((error) => {
            console.error(error)
        })
}
export function addMessage(chatId, data) {
    return db.ref(`chats/${chatId}/${data.timestamp}`).set(data)
}

export function addMember(uid, userId) {
    const chatId = uuid(16)
    db.ref(`members/${userId}/${uid}`).set({ active: true, chatId })
    return db
        .ref(`members/${uid}/${userId}`)
        .set({ active: true, chatId })
        .then(() => chatId)
        .catch((error) => {
            console.log(error.message)
        })
}
