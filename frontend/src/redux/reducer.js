import * as types from './action_types';

const initialState ={
    users:[],
    user:{},
    msg:""
}


const userreducer=(state=initialState,action)=>{
    switch(action.type){

        case types.GET_USERS:
            return {
                ...state,users:action.payload
            }   
        case types.GET_SINGLE_USER:
            return {
                ...state,user:action.payload
            }
        
        case types.ADD_USER:
            return {
                ...state,msg:action.payload
            }
        
        case types.DELETE_USER:
            return {
                ...state,msg:action.payload
            }        
        case types.UPDATE_USER:
            return {
                ...state,msg:action.payload
            }

        default:
            return state;
    }
}



export default userreducer;