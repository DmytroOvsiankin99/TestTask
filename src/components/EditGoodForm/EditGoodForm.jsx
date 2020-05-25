import React, {useState} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import style from './../GoodForm/GoodForm.module.css';
import GoodForm from "../GoodForm/GoodForm";
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {editExistGood,setGoods} from "../../redux/goodsReducers";
const EditGoodForm = (props) =>{
    let [result, setResult] = useState('in_progress');
    let editingGood = {};
    for(let i=0;i<props.goods.length;i++){
        if(props.goods[i].id===props.match.params.id){
            editingGood = {...props.goods[i]};
        }
    }
    const customSubmit = (data) =>{
        let discount=false;
        if(data.percent && data.last_date){
            discount={percent: data.percent, endDate: data.last_date}
        }
        let {percent, last_date, ...datanew} = data;
        let newData={...datanew, discount}
        props.editExistGood(editingGood.id,newData,setResult);
    }
   if(result === 'in_progress' && props.match){
       if(props.goods.length!==0){
           return <div className={style.GoodBlock}>
               <p>Edit good</p>
               <GoodFormWithRF good={editingGood} onSubmit={(data) => {
                   customSubmit(data);
               }}/>
           </div>
       }
       else{
           props.setGoods();
           return null;
       }
    }
   else{
       return <Redirect to='/'/>
   }
}
const GoodFormWithRF = reduxForm({form: 'editGood'})(GoodForm);
const mapStateToProps = (state) =>({
    goods: state.goods.goods
})
const mapDispatchToProps = {
    editExistGood,
    setGoods
}
const EditGoodFormWithURL = withRouter(connect(mapStateToProps,mapDispatchToProps)(EditGoodForm));
export default EditGoodFormWithURL;
