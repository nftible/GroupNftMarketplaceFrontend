import { combineReducers } from '@reduxjs/toolkit';
import entityReducer from './slices/entitySlice';

const parentReducer = combineReducers({
    entity: entityReducer
})


export default parentReducer;