import api from "./apiClient"

const categoryAuctionApi = {
    getCategoryAuction: () => {
        const url = "/category/?page_size=20"
        return api.get(url)
    },
}
export default categoryAuctionApi
