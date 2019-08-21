import React from 'react';
import styles from '../videoList.css';

import VideosListTemplate from '../videosTemplate';

const videosRelated = (props) => (
    <div className={styles.relatedWrapper}>
        <VideosListTemplate
            data={props.data}
            teams={props.teams}
        />
    </div>
)

export default videosRelated;