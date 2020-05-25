import React from "react";
import fc from './FormControls.module.css';
export const FormControl = ({input, meta, ...props}) =>{
    const errorClass = meta.error && meta.touched ? fc.error : '';
    return <div className={fc.formControls + ' ' + errorClass}>
        {props.children}
        {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
}
export const TextArea = (props) => {
    return <FormControl {...props}>
        <textarea {...props.input} {...props}/>
    </FormControl>
}
export const Input = (props) => {
    return <FormControl {...props}>
        <input {...props.input} {...props}/>
    </FormControl>
}