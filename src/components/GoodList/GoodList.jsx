import React from 'react';
import style from './GoodList.module.css'
import Good from "./Good/Good";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {deleteGood, setGoods} from "../../redux/goodsReducers";

class GoodList extends React.Component {
    componentDidMount() {
        this.props.setGoods();
    }

    render() {
        let GoodListArray;
        if(this.props.goods.length!==0){
            GoodListArray = this.props.goods.map((el) => {
                return <Good key={el.id} id={el.id} photoURL={el.photoURL} title={el.title} about={el.about} price={el.price}
                             discount={el.discount} deleteGood={this.props.deleteGood}/>
            })}
        else GoodListArray=null;

            return <div className={style.goodList}>
                {GoodListArray}
                <div className={style.newElement}><NavLink to='/add'>
                    <div>
                        <div>
                            <div>+</div>
                        </div>
                    </div>
                </NavLink></div>
            </div>

    }
}

let mapStateToProps = (state) => ({
    goods: state.goods.goods
});
let mapDispatchToProps = {
    setGoods,
    deleteGood
}
export default connect(mapStateToProps, mapDispatchToProps)(GoodList);