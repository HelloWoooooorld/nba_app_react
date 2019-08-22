import React, { Component } from 'react';

import {fireBaseArticles, fireBaseLooper} from '../../../firebase';

import SliderTemplates from './slider_templates';




class NewsSlider extends Component {

    state = {
        news:[]
    }

    componentWillMount(){
        fireBaseArticles.limitToFirst(3).once('value')
        .then((snapshot) => {
            const news = fireBaseLooper(snapshot)
                this.setState({
                    news
                })
           
        })
        // axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
        // .then( response => {
        //     this.setState({
        //         news:response.data 
        //     })
         
        // })

    }

    render(){

        return(
            <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings} />
        )
    }

}

export default NewsSlider;