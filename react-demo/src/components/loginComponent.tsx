import * as React from 'react';
import { hashHistory } from 'react-router';

// const style:any = require('../style.css');
import * as style from '../style.css';

export function commonAjax(requestOption: myComponent.Option | null): Promise<any> {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open(requestOption.method, requestOption.url, true)

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText))
                } else {
                    var resJson = { code: this.status, response: JSON.parse(this.response) }
                    reject(resJson)
                }
            }
        }

        xhr.send(JSON.stringify(requestOption.data))
    })
}

export class Login extends React.Component<myComponent.Props, myComponent.State> {
    constructor(props: myComponent.Props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            loginStatus: ' '
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async loginMethod(): Promise<any> {
        let option:myComponent.Option = {
            url: 'http://192.168.138.41:9998/v1/auth2?method=getconfig',
            method: 'POST',
            data: null
        }
        let option2:myComponent.Option = {
            url: 'http://192.168.138.41:9998/v1/auth2?method=login',
            method: 'POST',
            data: {
                grant_type: 'anyshare_plain',
                token_type: 'short-lived',
                params: {
                    account: this.state.userName,
                    password: this.state.passWord
                }
            }
        }
        commonAjax(option).then((res) => {
            // console.log(res);
        })
        commonAjax(option2).then((res) => {
            this.setState({
                loginStatus: '登录成功'
            })
            console.log(res);
            hashHistory.replace('/menu');
        }).catch(error => {
            // alert(error.response.errmsg);
            this.setState({
                loginStatus: error.response.errmsg
            })
        })
    }

    handleSubmit(event: any) {
        event.preventDefault();
        // alert(`用户名：${this.sta te.userName}\n密码：${this.state.passWord}`)
        if (this.state.userName && this.state.passWord) {
            this.loginMethod()
        } else {
            this.setState({
                loginStatus: '用户名或者密码不能为空'
            })
        }
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className={style.loginWrap}>
                <form onSubmit={this.handleSubmit} className={style.form}>
                    <h1 className={style.title}>登录</h1>
                    <div className={style.inputGroup}>
                        <span>用户名:</span>
                        <input type="text" className={style.input} name="userName" value={this.state.userName} onChange={this.handleChange} />
                    </div>
                    <div className={style.inputGroup}>
                        <span>密码:</span>
                        <input type="password" className={style.input} name="passWord" value={this.state.passWord} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className={style.btn}>登录</button>
                    <div className={style.loginTips}>{this.state.loginStatus}</div>
                </form>
            </div>
        );
    }
}