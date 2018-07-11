"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
/**
 * 这是一个reducer，形式为(state, action) => state的纯函数
 * 描述了action如何将state转变为下一个state
 * state的形式可以是任意的，唯一的要点是：
 * 当state变化时需要返回全新的对象，而不是修改传入的参数
 *
 */
function counter(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
// 创建Redux store来存放应用的状态
// API是{subscribe, dispatch, getState}
var store = redux_1.createStore(counter);
// 可以手动订阅更新。也可以事件绑定到视图层
store.subscribe(function () {
    return console.log(store.getState());
});
// 改变内部state的唯一方法是dispatch一个action
// action可以被序列化，用日志记录和存储下来，后期还可以以回放的形式执行
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
