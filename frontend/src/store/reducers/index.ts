import { combineReducers } from 'redux'
import transactionRecord from './transaction.record.reducer'

const rootReducer = combineReducers({
    transactionRecord: transactionRecord,
});

export default rootReducer;
