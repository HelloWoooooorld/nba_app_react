import React from 'react';
import style from '../articles.css';

import moment from 'moment';

const postData = (props) => {
    const formatDate = (date) => {
        return moment(date).format(' MM-DD-YYYY')
    }

    return (
        <div className={style.articlePostData}>
            <div>
                Date:
                <span>{formatDate(props.data.date)}</span>
            </div>
            <div>
                Author:
                <span>{props.data.author}</span>
            </div>

        </div>
    );
};

export default postData;