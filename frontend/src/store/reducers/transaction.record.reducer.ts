import { SAVE_TRANSACTION_SUCCESS, SAVE_TRANSACTION_FAILED } from "../action/type";

const initialState = {
    records: {},
    loading: false,
    error: ''
}

const transactionReducer = (state = initialState, action: any) => {

    const { type, payload } = action

    switch (type) {
        case SAVE_TRANSACTION_FAILED:
            return {
                ...state,
                error: payload
            }
        case SAVE_TRANSACTION_SUCCESS:
            return {
                ...state,
                records: payload
            }
        default:
            return state
    }

}

export default transactionReducer
