import api from "./apiClient"

const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

const paymentMethodApi = {
    getPaymentMethod: () => {
        const url = "/payment-method/"
        return api.get(url)
    },
}

export default paymentMethodApi
