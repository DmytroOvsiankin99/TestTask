import React from "react";
import {NavLink} from "react-router-dom";
import style from './Good.module.css';
const Good = (props) =>{
    console.log(props)
    let spanPrice;
    if(props.discount) {
        let date = new Date();
        let discountEndData = Date.parse(props.discount.endDate);
        let leftDays = Math.ceil((discountEndData - date) / (60 * 60 * 24 * 1000));
        if(leftDays<=0){
            spanPrice = <span>{props.price}</span>
        }
    else
        {
            spanPrice = <span className={style.discountSpan}>
            <span className={style.price}>{props.price}</span>
            <span className={style.discount}>(-{props.discount.percent}%)</span>
            <span className={style.priceWithDiscount}>{+(props.price * (100 - props.discount.percent) / 100)}!!!</span>
            <div><span className={style.leftDays}>{leftDays}</span> days is left before end of discount</div>
        </span>
        }
    }
    else{
        debugger
        spanPrice = <span>{props.price}</span>
    }
    return <div className={style.good}>
        <img src={props.photoURL} alt='photoURL'/>
        <div>
            <div>title - <span>{props.title}</span></div>
            <div>price: {spanPrice}</div>
            <div>about: <div className={style.aboutField}>{props.about}</div></div>
        </div>
        <div className={style.control}>
            <NavLink to={`/edit/${props.id}`}><div>Edit</div></NavLink>
            <div onClick = {()=>{props.deleteGood(props.id)}}>Delete</div>
        </div>
    </div>
}
export default Good;