import * as React from 'react';
import { Router, Route, hashHistory} from 'react-router'
import { Login } from '../components/loginComponent';
import { Hello } from '../components/hello';
import { Menu } from '../components/Menu';
import TodoApp from '../components/TodoApp';
import TodoAppRedux from '../components/TodoAppRedux';
import UsingContext from '../components/usingContext';
import ZhihuDaily from '../components/zhihuDaily/Page'

export class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Login} />
                <Route path="/zhihuDaily" component={ZhihuDaily} />
                <Route path="/menu" component={Menu}>
                    <Route path="/hello" component={Hello} />
                    <Route path="/login" component={Login} />
                    <Route path="/todo" component={TodoApp} />
                    <Route path="/todoRedux" component={TodoAppRedux} />
                    <Route path="/usingContext" component={UsingContext} />
                </Route>
            </Router>
        );
    }
}