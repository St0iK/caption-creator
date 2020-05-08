import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
// import cueReducer from './reducers/cueReducer';

//Logger Middlware
const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("The action: ", action);
    const result = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return result;
};

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;