export const requiredSizeField = (value) =>{
    if(value){
        return (value.length >= 20 && value.length <= 60 && value) ? undefined : 'Need at 20 to 60 symbols'
    }
    return undefined
}
export const requiredBeInteger = (value) =>{
    return ((Math.round(value)!=value) && value) ? 'Required be integer' : undefined
}
export const requiredBePositive = (value) =>{
    return value>0 ? undefined : 'Required be positive'
}
export const onlyNumbers = (value) =>{
    return typeof value === 'number' ? undefined : 'Required only numbers'
}
export const requiredField = (value) =>{
    return value ? undefined : 'Field is required'
}
export const maximumSizeFieldAbout = (value) =>{
    if(value){
        return (value.length <= 200) ? undefined : 'Maximum 200 symbols'
    }
    else{
        return undefined;
    }
}
export const moreThanToday = (value) =>{
    if(value){
        let date = new Date();
        return ((Date.parse(value) - date) > 0) ? undefined : 'Not earlier than today'
    }
    else{
        return undefined
    }
}
export const less100millions = (value) =>{
    return value<=99999999.99 || !value ? undefined : 'Too expensive good'
}
export const discountSize = (value) =>{
    return ((value>=10 && value<=90) || !value) ? undefined : 'Discount should be at 10 to 90 %'
}