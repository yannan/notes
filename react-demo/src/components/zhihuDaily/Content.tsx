import * as React from 'react';
import Card from './Card';
import fetch from 'node-fetch'
const styles = require('./styles.css');

export default class Content extends React.Component<Daily.Content.Props, Daily.Content.State> {
    state = {
        items: [] as Array<{}>
    }
    componentDidMount() {
        fetch('/api/zhihu/last-stories')
            .then(res => res.json())
            .then(json => this.setState({
                items: json.data.stories
            }))
    }

    render() {
        const { items } = this.state;
        return (
            <div className={styles['zh-content']}>
                {
                    items.map(item => (
                        <Card {...item}></Card>
                    ))
                }
            </div>
        )
    }
}