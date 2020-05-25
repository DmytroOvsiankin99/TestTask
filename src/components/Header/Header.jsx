import React from 'react';
import logo from './../../assets/Logo_Cleveroad.png';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {setUserData, unsetUserData} from "../../redux/authReducer";
const Header = (props) =>{
    const infoBlock = props.auth.isAuth ? <div>
                        <div>You entered as {props.auth.email}</div>
                        <div className={style.login} onClick={props.unsetUserData}>Logout</div>
                        </div>
        : <div>
        <div className={style.login}>
            <NavLink to = '/login'>Login</NavLink>
        </div>
    </div>
    return <div className={style.header}>
            <NavLink to='/'><img src = {logo} alt={'logo'}/></NavLink>
        {infoBlock}
    </div>
}
let mapStateToProps = (state) =>({
    auth: state.auth
})
let mapDispatchToProps = {
    setUserData,
    unsetUserData
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);