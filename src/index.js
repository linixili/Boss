import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {createStore,applyMiddleware} from "redux"
import reducers from './reducer'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import './config.js'
import Login from "./container/login/login.js"
import Register from "./container/register/register.js"
import BossInfo from "./container/bossinfo/bossinfo.js"
import GeniusInfo from "./container/geniusinfo/geniusinfo.js"
import  AuthRoute from "./component/authroute/authroute.js"
import DashBoard from "./component/dashboard/dashboard"
import Chat from "./container/chat/chat"
const store=createStore(reducers,applyMiddleware(thunk))
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path="/bossinfo" component={BossInfo}></Route>
                        <Route path="/geniusinfo" component={GeniusInfo}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/chat/:user" component={Chat}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route component={DashBoard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>, document.getElementById('root'));
