import React, {useState} from 'react';
import GoodForm from "../GoodForm/GoodForm";
import style from './../GoodForm/GoodForm.module.css'
import {reduxForm} from 'redux-form';
import {addNewGood} from "../../redux/goodsReducers";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
const AddGoodForm = (props) =>{
    let [result,setResult] = useState('in_progress');
    const customSubmit = (data) =>{
        let discount=false;
        if(data.percent && data.last_date){
            discount = {percent: data.percent, endDate: data.last_date};
        }
        let newGood = {...data, discount, photoURL: data.photoURL};
        props.addNewGood(newGood,setResult);
    }
    if(result==='in_progress'){
        return <div className={style.GoodBlock}>
            <p>Add good</p>
            <AddGoodFormWithRF onSubmit={customSubmit}/>
        </div>
    }
    else return <Redirect to='/'/>
}
let mapStateToProps = null;
let mapDispatchToProps={
    addNewGood
}
const AddGoodFormWithRF = reduxForm({form: 'addGood'})(GoodForm);
export default connect(mapStateToProps,mapDispatchToProps)(AddGoodForm);