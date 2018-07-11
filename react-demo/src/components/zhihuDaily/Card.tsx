import * as React from 'react';
const styles = require('./styles.css');

export default class Card extends React.Component<any, any> {
    render() {
        const { id, images, title } = this.props;
        console.log(images)
        return (
            <div className={styles['daily-item']}>
                <a href="#" className={styles['item-link']}>
                    <img src={images &&  images[0]} alt="图片" className={styles['img-wrap']}/>
                    <div className={styles['short-graph']}>
                        {title}
                    </div>
                </a>
            </div>
        )
    }
}