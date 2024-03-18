import { SAVE_TRANSACTION_SUCCESS, SAVE_TRANSACTION_FAILED } from "../action/type";

const initialState = {
    records: {},
    loading: false,
    error: ''
}

export type SaveTransactionSuccessAction = {
    type: typeof SAVE_TRANSACTION_SUCCESS;
    payload: 'YourPayloadTypeHere';
}

export type SaveTransactionFailedAction = {
    type: typeof SAVE_TRANSACTION_FAILED;
    payload: 'YourErrorPayloadTypeHere';
}

const transactionReducer = (state = initialState, action: SaveTransactionSuccessAction | SaveTransactionFailedAction) => {

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
