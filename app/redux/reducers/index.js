import userReducer from "./userReducer"
import postReducer from "./postReducer"
import controllerReducer from "./controllerReducer"
import commentReducer from "./commentReducer"
import auctionReducer from "./auctionReducer"
import categoryAuctionReducer from "./categoryAuctionReducer"
import reportReducer from "./reportReducer"
import notificationReducer from "./notificationReducer"
import paymentMethodReducer from "./paymentMethodReducer"

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
}

export default reducers
