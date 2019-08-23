import React, { Component } from 'react';

import {fireBaseDB, fireBaseLooper, fireBaseTeams} from '../../../../firebase';

import style from '../../../articles/articles.css'
import Header from './header';


class NewsArticle extends Component {
    state = {
        article: [],
        team: []
    }
    componentWillMount() {
        fireBaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();
            fireBaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot) => {
                const team = fireBaseLooper(snapshot)
                this.setState({
                    article,
                    team
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