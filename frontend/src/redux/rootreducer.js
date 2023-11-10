import {combineReducers} from 'redux';
import userreducer from './reducer';



const rootreducer=combineReducers({
    data:userreducer
})


export default rootreducer;