import { createStore,applyMiddleware } from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootreducer from "./rootreducer";


const middleware=[thunk];

//logger only working in dev mode

if(process.env.NODE_ENV === 'development') {
    middleware.push(logger)
}

const store=createStore(rootreducer,applyMiddleware(...middleware));

export default store;