import { SAVE_TRANSACTION_FAILED } from "./type";

const API_URL = 'http://127.0.0.1:8000'

export const saveTransaction = async (payType: string, amount: number, destinationAddress: string, txHash: string) => {
    const body = JSON.stringify(
        {
            payType,
            amount,
            destinationAddress,
            txHash,
        })

    try {

        // const token = window.localStorage.getItem('token');

        const res = await fetch(`${API_URL}/api/data-analysis/saveTransaction/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: body
        })

        const data = await res.json()

    }
    catch (e) {

        // dispatch({ type: SAVE_TRANSACTION_FAILED })
    }
}