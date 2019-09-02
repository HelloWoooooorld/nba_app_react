import React, { Component } from 'react';

import { firebase, fireBaseDB, fireBaseLooper, fireBaseTeams} from '../../../../firebase';

import style from '../../../articles/articles.css'
import Header from './header';


class NewsArticle extends Component {
    state = {
        article: [],
        team: [],
        imageURL: ''
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
                this.getImageURL(article.image)
            })
        })
    }

    getImageURL = (filename) => {
        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then(url => {
            this.setState({
                imageURL: url
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
                             background: `url('${this.state.imageURL}')`
                         }}
                    >

                    </div>
                        <div className={style.articleText}
                            dangerouslySetInnerHTML={{
                                __html: article.body
                            }}
                        >
                            
                        </div>
                </div>
                
            </div>
        );
    }
}

export default NewsArticle;