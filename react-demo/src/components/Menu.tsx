import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import { Hello } from "../components/hello";
import * as style from '../style.css'

function NavList(props: any):any {
    return (
        <Link {...props} activeClassName={style.active} />
    )
}

export class Menu extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={style.menu}>
                <ul role="nav" className={style.menuNav}>
                    <li className={style.menuNavLi}><NavList to="/hello">Hello</NavList></li>
                    <li className={style.menuNavLi}><NavList to="/login">Login</NavList></li>
                    <li className={style.menuNavLi}><NavList to="/todo">Todo List</NavList></li>
                    <li className={style.menuNavLi}><NavList to="/todoRedux">Todo List Redux</NavList></li>
                    <li className={style.menuNavLi}><NavList to="/usingContext">context</NavList></li>
                    <li className={style.menuNavLi}><IndexLink to="/menu" activeClassName={style.active}>Menu</IndexLink></li>
                </ul>
                <div className={style.container}>
                    {this.props.children || <Hello compiler="typescript" framework="react"/>}
                </div>
            </div>
        )
    }
}