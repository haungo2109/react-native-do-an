import api from "./apiClient"

const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

const paymentMethodApi = {
    getPaymentMethod: () => {
        const url = "/payment-method/?page_size=20"
        return api.get(url)
    },
}

export default paymentMethodApi
