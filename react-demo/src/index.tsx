import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./pages/App";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import App from './components/TodoAppRedux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
// ReactDOM.render(
//     <App />, 
//     rootElement
// );
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);