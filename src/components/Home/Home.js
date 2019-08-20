import React from 'react';

import NewsSlider from '../widgets/newsSlider/slider';
import NewsList from '../widgets/newsList/newsList';

const Home = () => {
    return (
        <div>
            <NewsSlider
                type="featured"
                start={0}
                end={6}
                settings={{
                    dots: true
                }}
            />
            <NewsList 
            type="card" 
            loadmore={true}
            start={10}
            amount={3} 
            />
        </div>
    );
};

export default Home;