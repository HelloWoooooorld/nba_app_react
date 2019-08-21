import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../../config';

import style from '../../../articles/articles.css'
import Header from './header';


class NewsArticle extends Component {
    state = {
        article: [],
        team: []
    }
    componentWillMount() {
        axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
            .then(response => {
                let article = response.data[0];

                axios.get(`${URL}/teams?id=${article.team}`)
                    .then(response => {
                        this.setState({
                            article,
                            team: response.data
                        })
                    })
            })
    }
    render() {
        const { article, team } = this.state;
        return (
            <div className={style.article_Wrap}>
                <Header 
                author={article.author}
                date={article.date} 
                teamData={team[0]}/>
                <div className={style.body}>
                    <h1>{article.title}</h1>
                    <div className={style.articleImage}
                         style={{
                             background: `url('/images/articles/${article.image}')`
                         }}
                    >

                    </div>
                        <div className={style.articleText}>
                            {article.body}
                        </div>
                </div>
                
            </div>
        );
    }
}

export default NewsArticle;