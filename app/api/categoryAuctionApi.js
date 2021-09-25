import api from "./apiClient"

const categoryAuctionApi = {
    getCategoryAuction: () => {
        const url = "/category/"
        return api.get(url)
    },
}
export default categoryAuctionApi
