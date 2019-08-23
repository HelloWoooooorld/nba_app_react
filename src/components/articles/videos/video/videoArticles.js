import React, { Component } from 'react';

import {fireBaseLooper,fireBaseDB,fireBaseTeams, fireBaseVideos} from '../../../../firebase';

import style from '../../articles.css'

import Header from './header';
import VideoRelated from '../../../widgets/VideoList/videoRelated/videoRelated'

class VideoArticles extends Component {
    state={
        article: [],
        team: [],
        teams: [],
        related: []
    }

    componentWillMount() {
        fireBaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
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

    getRelated =() => {
        fireBaseTeams.once('value')
        .then((snapshot) => {
            const teams = fireBaseLooper(snapshot);
            fireBaseVideos
            .orderByChild("team")
            .equalTo(this.state.article.team)
            .limitToFirst(3)
            .once('value')
            .then((snapshot) => {
                const related = fireBaseLooper(snapshot)
                this.setState({
               
                    teams,
                    related
                })
            })
        })
        
    
    }

    render() {
        const {article, team} = this.state
        return (
            <div>
                <Header teamData={team[0]}/>
                <div className={style.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                    title="videoplayer"
                    width="100%"
                    height="300px"
                    src={`https://www.youtube.com/embed/${article.url}`}>

                    </iframe>
                </div>
                <VideoRelated
                data={this.state.related}
                teams={this.state.teams}
                />
            </div>
        );
    }
}

export default VideoArticles;