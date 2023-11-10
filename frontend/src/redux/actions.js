import * as types from './action_types';
import axios from 'axios';

const API="http://127.0.0.1:5000"

// action type-------------------

const getusers=(users)=>({
    type: types.GET_USERS,
    payload:users
})

const useradded=(msg)=>({
    type:types.ADD_USER,
    payload:msg
})

const getsingleuser=(userdata)=>({
    type:types.GET_SINGLE_USER,
    payload:userdata
})
const userdeleted=(msg)=>({
    type:types.DELETE_USER,
    payload:msg
})

const updateduser=(data)=>({
    type:types.UPDATE_USER,
    payload:data
})


// dispatcher-------------------------
export const loadUsers=()=>{
    return function(dispatch){
        axios.get(`${API}/users`).then((resp)=>{
            dispatch(getusers(resp.data));
        }).catch((err)=>{
            console.log(err);
        })
    }
}

export const adduser=(user)=>{
    return function(dispatch){
        axios.post(`${API}/users`,user).then((resp)=>{
            dispatch(useradded(resp.data.msg));
            //to fetch the updated data
            dispatch(loadUsers());
        }).catch((err)=>{
            console.log(err);
        })
    }
}

export const deleteuser=(id)=>{
    return function(dispatch){
        axios.delete(`${API}/user/${id}`).then((resp)=>{
            dispatch(userdeleted(resp.data.msg));
            //to fetch the updated data
            dispatch(loadUsers());
        }).catch((err)=>{
            console.log(err);
        })
    }
}
export const loadsingleuser=(id)=>{
    return function(dispatch){
        axios.get(`${API}/user/${id}`).then((resp)=>{
            dispatch(getsingleuser(resp.data));
        }).catch((err)=>{
            console.log(err);
        })
    }
}


export const userupdate=(user,id)=>{
    return function(dispatch){
        axios.put(`${API}/user/${id}`,user).then((resp)=>{
            dispatch(updateduser(resp.data.msg));
            //to fetch the updated data
            dispatch(loadUsers());
        }).catch((err)=>{
            console.log(err);
        })
    }
}

