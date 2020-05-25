import {deleteGoodFB, editExistGoodFB, getGoodsFB, uploadPhotoFB} from "../firebaseOperations/firebaseOperations";

const SET_GOODS = 'SET_GOODS';
const EDIT_EXIST_GOOD ='EDIT_EXIST_GOOD';
const ADD_NEW_GOOD = 'ADD_NEW_GOOD';
const DELETE_GOOD = 'DELETE_GOOD';
/*const initialState = {
    goods: [{
        id: 1,
        photo: 'https://lh3.googleusercontent.com/FC__jrAeN5kFZ8knQuD6a5Sp7Zh-oxvJQ5HwxWHiDtKxY7ex5ptlpSvHYCOuR-TtxbI=s180',
        title: 'grapefruit',
        about: 'very delicious',
        price: '300',
        discount: {
            percent: 30,
            endDate: {
                day: 31,
                month: 11,
                year: 2020
            }
        }
    },{
        id: 2,
        photo: 'https://lh3.googleusercontent.com/FC__jrAeN5kFZ8knQuD6a5Sp7Zh-oxvJQ5HwxWHiDtKxY7ex5ptlpSvHYCOuR-TtxbI=s180',
        title: 'gape',
        about: 'just sweet',
        price: '100',
        discount: {
            percent: 70,
            endDate: {
                day: 20,
                month: 5,
                year: 2020
            }
        }
    },{
        id: 3,
        photo: 'https://lh3.googleusercontent.com/FC__jrAeN5kFZ8knQuD6a5Sp7Zh-oxvJQ5HwxWHiDtKxY7ex5ptlpSvHYCOuR-TtxbI=s180',
        title: 'apple',
        about: 'very sweet',
        price: '230',
        discount: false
    },
        {
            id: 4,
            photo: 'https://lh3.googleusercontent.com/FC__jrAeN5kFZ8knQuD6a5Sp7Zh-oxvJQ5HwxWHiDtKxY7ex5ptlpSvHYCOuR-TtxbI=s180',
            title: 'tomato',
            about: 'red',
            price: '111',
            discount: {
                percent: 45,
                endDate: {
                    day: 23,
                    month: 7,
                    year: 2020
                }
            }
        }
    ]
}*/
export const goodsReducer = (state= {goods: []},action) =>{
    switch(action.type){
        case SET_GOODS:{
            return {...state,
            goods: action.data};
        }
        case EDIT_EXIST_GOOD:{
            return {...state, goods: action.data};
        }
        case ADD_NEW_GOOD:{
            return {...state, goods: [...state.goods, action.data]};
        }
        case DELETE_GOOD:{
            let array = [...state.goods];
            for(let i=0;i<array.length;i++){
                if(array[i].id===action.id){
                    array.splice(i,1);
                }
            }
            return {...state, goods: array}
        }
        default: return state;
    }
}
const setGoodsSuccess = (data) =>({type: SET_GOODS, data});
export const setGoods = () =>(dispatch)=>{
    const dispatchCallback = (array) =>{
        dispatch(setGoodsSuccess(array));
    }
    getGoodsFB(dispatchCallback);
}
const editExistGoodSuccess = (data) =>({type: EDIT_EXIST_GOOD, data});
const addNewGoodSuccess = (data) =>({type: ADD_NEW_GOOD, data});
const deleteGoodSuccess = (id) =>({type: DELETE_GOOD, id});
export const editExistGood = (id, editingFields,setResult) =>(dispatch) =>{
    const dispatchCallback = (data) =>{
        dispatch(editExistGoodSuccess(data));
        setResult('done');
    }
    editExistGoodFB(dispatchCallback,id, editingFields);
}
export const addNewGood = (newGood,setResult) =>(dispatch) =>{
    const dispatchCallback = (object) =>{
        dispatch(addNewGoodSuccess(object));
        setResult('done');
    }
    uploadPhotoFB(dispatchCallback,newGood);
}
export const deleteGood = (id) => (dispatch)=>{
    const dispatchCallback = (id) =>{
        dispatch(deleteGoodSuccess(id));
    }
    deleteGoodFB(dispatchCallback,id);
}