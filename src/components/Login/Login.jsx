import React from 'react';
import {Field,reduxForm} from 'redux-form';
import style from './Login.module.css';
import {setUserData} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
const Login = (props) =>{
    if(!props.isAuth){
        return <div className={style.login}>
            <LoginFormWithRF onSubmit={(data) => {
                props.setUserData(data)
            }}/>
        </div>
    }else{
        return <Redirect to='/'/>
    }
}
const LoginForm = (props) =>{
    return <form onSubmit={props.handleSubmit}>
        <div><label>Login</label></div>
        <div><Field component='input' name='email'></Field></div>
        <div><label>Password</label></div>
        <div><Field component='input' type='password' name='password'></Field></div>
        <div><Field component='input' type='checkbox' name='remember'></Field><label>Remember me</label></div>
        <button>Sign up</button>
    </form>
}
let mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})
let mapDispatchToProps = {
    setUserData
}
const LoginFormWithRF = reduxForm({form: 'authorizationForm'})(LoginForm);
export default connect(mapStateToProps,mapDispatchToProps)(Login);