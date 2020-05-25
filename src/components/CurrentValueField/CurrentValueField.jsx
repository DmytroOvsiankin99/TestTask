import React from 'react';
import style from './CurrentValueField.module.css';
const CurrentValueField = (props) =>{
    return <div className={style.field}>
        Current {props.title}: <b>{props.value}</b>
    </div>
}
export default CurrentValueField;