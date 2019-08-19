import React from 'react';

import NewsSlider from '../widgets/newsSlider/slider'

const Home = () => {
    return (
        <div>
            <NewsSlider
                type="featured"
                start={0}
                end={3}
                settings={{
                    dots: true
                }}
            />
        </div>
    );
};

export default Home;