import * as React from 'react';
const styles = require('./styles.css');

export default class Header extends React.Component<Daily.Header.Props, Daily.Header.State> {
    render() {
        return (
            <div className={styles['zh-header']}>
                <div className={styles['header-inner']}>
                    <h1 className={styles.logo}>
                        <a href="#" title={"logo"} className={styles["link-logo"]}></a>
                    </h1>
                </div>
            </div>
        )
    }
}