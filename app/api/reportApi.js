import api from "./apiClient"

const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

const reportApi = {
    /**
     * To make report Aution
     * @param {{type: number, auction: number, content: string}}
     * data type is typeId, auction is auctionId, content not required
     * @returns
     */
    postReportAuction: (data) => {
        const url = "/auction-report/"
        return api.post(url, data, config)
    },
    postReportPost: (data) => {
        const url = "/post-report/"
        return api.post(url, data, config)
    },
    getReportType: () => {
        const url = "/report-type/"
        return api.get(url)
    },
}

export default reportApi
