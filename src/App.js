import React from 'react';
import Header from "./components/Header/Header";
import {Route} from 'react-router-dom';
import Login from "./components/Login/Login";
import GoodList from "./components/GoodList/GoodList";
import EditGoodForm from "./components/EditGoodForm/EditGoodForm";
import './App.css';
import AddGoodForm from "./components/AddGoodForm/AddGoodForm";

class App extends React.Component {
    render() {
        return (
            <div className="App">

                <Header/>
                <Route exact path='/login' component={() => {
                    return <Login/>
                }}/>
                <Route exact path='/add' component={() => {
                    return <AddGoodForm/>
                }}/>
                <Route exact path='/edit/:id' component={() => {
                    return <EditGoodForm/>
                }}/>
                <Route exact path='/goods' component={() => {
                    return <GoodList/>
                }}/>
                <Route exact path='/' component={() => {
                    return <GoodList/>
                }}/>
            </div>
        );
    }
}

export default App;
