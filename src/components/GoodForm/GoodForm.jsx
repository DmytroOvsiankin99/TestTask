import React, {useState} from 'react';
import photoDefault from "../../assets/defaultPhoto.jpg";
import {Field} from 'redux-form';
import style from './GoodForm.module.css';
import CurrentValueField from "../CurrentValueField/CurrentValueField";
import {preventUpload} from "../../firebaseOperations/firebaseOperations";
import {
    discountSize,
    less100millions,
    maximumSizeFieldAbout,
    moreThanToday, requiredBeInteger,
    requiredField,
    requiredSizeField
} from "../../utils/validators/validators";
import {Input, TextArea} from "../FormControls/FormControls";

const adaptFileEventToValue = (delegate) =>
    (e) => {
        delegate(e.target.files[0])
    }
const FileInput = ({
                       input: {
                           value: omitValue,
                           onChange,
                           onBlur,
                           ...inputProps
                       },
                       meta: omitMeta,
                       ...props
                   }) => {
    return <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        accept="image/png, image/jpeg"
        {...inputProps}
        {...props}
    />
}
const GoodForm = (props) => {
    let baseImgUrl = '';
    if (props.good) {
        if (props.good.photoURL !== '') {
            baseImgUrl = props.good.photoURL;
        } else baseImgUrl = photoDefault;
    } else {
        baseImgUrl = photoDefault;
    }
    const [file, setFile] = useState(baseImgUrl);
    const [progress, setProgress] = useState('no_started');
    const [size, setSize] = useState('no_image');
    const [isDiscountPercent, setDiscountPercent] = useState(false);
    const [isDiscountDate, setDiscountDate] = useState(false);
    let twoDiscountFieldsValidator=isDiscountPercent===isDiscountDate;
    const loaderStyle = {width: `${progress}%`, height: '100%', backgroundColor: 'green', transition: 'all 0.5s ease'}
    const loaderBlockStyle = {position: 'relative', width: 200, height: 20, border: '1px solid black'}
    const loader = <div style={loaderStyle}></div>
    const loaderBlock = <div style={loaderBlockStyle}>{loader}</div>
    const currentValuesExists = props.good ? true : false;
    const requiredFieldValue = currentValuesExists ? () => {
    } : requiredField;
    let currentDiscountExists = false;
    if (currentValuesExists) {
        currentDiscountExists = props.good.discount ? true : false;
    }
    let customFileValidator;
    if (size === 'no_image') {
        customFileValidator = true;
    } else {
        if ((size.width >= 200 && size.width <= 4000) && (size.height >= 200 && size.height <= 4000)) {
            customFileValidator = true;
        } else {
            customFileValidator = false;
        }
    }
    return <form className={style.goodForm} onSubmit={(customFileValidator && twoDiscountFieldsValidator) ? props.handleSubmit : (e) => {
        e.preventDefault();
    }}>
        <div><label>title</label><Field component={Input} name='title'
                                        validate={[requiredFieldValue, requiredSizeField]}/></div>
        {
            currentValuesExists && <CurrentValueField title='title' value={props.good.title}/>
        }
        <div><label>price</label><Field component={Input} name='price'
                                        validate={[requiredFieldValue, less100millions]}/></div>
        {
            currentValuesExists && <CurrentValueField title='price' value={props.good.price}/>
        }
        <div>
            <span>Discount?</span>
        </div>
        {
            currentValuesExists && <CurrentValueField title='discount' value={props.good.discount ? 'Yes' : 'No'}/>}
        {
            !twoDiscountFieldsValidator && <div style={{color: 'red'}}>All fields about discount should be filled</div>
        }
        <div><label>%</label><Field component={Input} name='percent' validate={[discountSize, requiredBeInteger]} onChange = {(e)=>{e.target.value ? setDiscountPercent(true) : setDiscountPercent(false)}}/>
            <label>last date</label><Field component={Input} type='date' name='last_date' validate={[moreThanToday]} onChange = {(e)=>{e.target.value ? setDiscountDate(true) : setDiscountDate(false)}}/>
        </div>
        {
            currentDiscountExists && <CurrentValueField title='%' value={props.good.discount.percent}/>
        }
        {
            currentDiscountExists ? <CurrentValueField title='last date'
                                                       value={`${props.good.discount.endDate}`}/> : null
        }
        <div><label>photo</label>
            <Field component={FileInput} name='photoURL' validate={[requiredFieldValue]} onChange={(e) => {
                preventUpload(e, setFile, setProgress);
            }}/>
        </div>
        <div>
            {(typeof progress === typeof 1 && loaderBlock)}
            <img src={file} alt='goodImage' onLoad={(e) => {
                setSize({width: e.target.naturalWidth, height: e.target.naturalHeight})
            }}/>
        </div>
        {(!customFileValidator &&
            <div style={{color: 'red'}}>Entered image need to have 200&#60;(width and
                height)&#60;4000 px</div>)}
        <div><label>about</label><Field component={TextArea} name='about' validate={[maximumSizeFieldAbout]}/></div>
        {
            currentValuesExists && <CurrentValueField title='about' value={props.good.about}/>
        }
        <button>Save</button>
    </form>
}
export default GoodForm;
