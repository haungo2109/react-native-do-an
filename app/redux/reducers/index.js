import userReducer from "./userReducer"
import postReducer from "./postReducer"
import controllerReducer from "./controllerReducer"
import commentReducer from "./commentReducer"
import auctionReducer from "./auctionReducer"
import categoryAuctionReducer from "./categoryAuctionReducer"
import reportReducer from "./reportReducer"
import notificationReducer from "./notificationReducer"
import paymentMethodReducer from "./paymentMethodReducer"
import settingReducer from "./settingReducer"
import auctionJoinReducer from "./auctionJoinReducer"
import myAuctionReducer from "./myAuctionReducer"
import myPostReducer from "./myPostReducer"
import postUserReducer from "./postUserReducer"

const reducers = {
    user: userReducer,
    post: postReducer,
    auction: auctionReducer,
    controller: controllerReducer,
    comment: commentReducer,
    categoryAuction: categoryAuctionReducer,
    reportType: reportReducer,
    notification: notificationReducer,
    paymentMethod: paymentMethodReducer,
    setting: settingReducer,
    auctionJoin: auctionJoinReducer,
    myAuction: myAuctionReducer,
    myPost: myPostReducer,
    postUser: postUserReducer,
}

export default reducers
