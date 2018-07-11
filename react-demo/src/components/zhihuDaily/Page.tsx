import * as React from 'react';
import Header from './Header';
import Content from './Content';

export default class Page extends React.Component<any, any> {
    render() {
        return (
            <div className={'zhihu-daily'}>
                <Header />
                <Content></Content>
            </div>
        )
    }
}