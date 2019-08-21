import React from 'react';
import { Link } from 'react-router-dom'

import Slider from "react-slick";
import style from './slider.css'

const SliderTemplates = (props) => {
    let template = null;

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...props.settings
      };

    switch(props.type){
        case ('featured'):
            template = props.data.map( (item,i) =>{
                return(
                    <div key={i}>
                       <div className={style.featured_item}>
                            <div className={style.featured_image}
                                style={{
                                    background:`url(../images/articles/${item.image})`
                                }}></div>
                            <Link to={`/news/`}>
                                <div className={style.featured_caption}>
                                    {item.title}
                                </div>
                            </Link>
                       </div>
                    </div>
                )
            })
            break;
        default:
            template = null;

    }



    return(
        <Slider {...settings} >
            {template}
        </Slider>
    )
};

export default SliderTemplates;