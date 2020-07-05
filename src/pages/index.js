/*
 * @Description: 
 * @Date: 2020-06-20 23:04:53
 * @Author: wangzhijie
 * @LastEditors: wangzhijie
 * @LastEditTime: 2020-07-04 19:49:16
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

class Loadable extends React.PureComponent {

}
function loadComponent(fn) {
    class LoadComponent extends React.PureComponent {
        constructor() {
            super();
            this.state = {
                isDone: false
            }
        }
        componentDidMount() {
            fn().then((Result) => {
                this.Ele = Result.default;
                this.setState({
                    isDone: true
                })
            })
        }
        render() {
            if (this.state.isDone) {
                const Ele = this.Ele;
                return <Ele {...this.props} />
            } else {
                return null
            }

        }

    }
    return LoadComponent;

}

const Dashboard = loadComponent(() => import(/* webpackChunkName: "Dashboard" */'./container/Dashboard'))
const Detail = loadComponent(() => import(/* webpackChunkName: "Detail" */'./container/Detail'))
const About = loadComponent(() => import(/* webpackChunkName: "About" */'./container/About'))



class APP extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard" component={Dashboard}></Route>
                    <Route path="/detail" component={Detail}></Route>
                    <Route path="/about" component={About}></Route>
                    <Redirect to="/dashboard" ></Redirect>
                </Switch>
            </BrowserRouter>
        )
    }
}



ReactDOM.render(<APP />, document.getElementById('root'))