import React from 'react';

import NewsSlider from '../../../widgets/newsSlider/slider';
import NewsList from '../../../widgets/newsList/newsList';

const NewsMain = () => {
    return (
        <div>
            <NewsSlider
                type='featured'
                settings={{dots: false}}
                start={0}
                end={9}
            />
            <NewsList
                type="cardMain"
                loadmore={true}
                start={0}
                amount={10}
            />
        </div>
    );
};

export default NewsMain;