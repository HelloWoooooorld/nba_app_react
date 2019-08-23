import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom';

import {fireBaseArticles,fireBaseLooper,fireBaseTeams} from '../../../firebase';

import style from './newsList.css'



import Button from '../Buttons/buttons'
import CardInfo from '../cardInfo/cardInfo';

class NewsList extends Component {
    state = {
        items: [],
        teams: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
    }


    componentWillMount() {
        this.request(this.state.start, this.state.end)
    }

    request = (start,end) => {
        if(this.state.teams.length < 1){
            fireBaseTeams.once('value')
            .then((snapshot)=>{
                const teams = fireBaseLooper(snapshot);
                this.setState({
                    teams
                })
            })



        }

        fireBaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const articles = fireBaseLooper(snapshot);
            this.setState({
                items:[...this.state.items,...articles],
                start,
                end
            })
        })
        .catch(e=>{
            console.log(e)
        })

    }

    loadMore = () => {
        let end = this.state.end + this.state.amount
        this.request(this.state.end + 1, end)
    }

    renderNews = (type) => {
        let template = null

        switch (type) {
            case ('card'):
                template = this.state.items.map((item, i) => {
                    return (
                        <CSSTransition
                        classNames={{
                            enter: style.newsList_wrapper,
                            active: style.newsList_wrapper_enter,

                        }} 
                            timeout={500}
                            key={i}
                        >
                            <div>
                                <div className={style.newsList_item}>
                                    <Link to={`/articles/${item.id}`}>
                                        <CardInfo 
                                        teams={this.state.teams} 
                                        team={item.team} 
                                        date={item.date}
                                        />
                                        <h2>{item.title}</h2>
                                    </Link>
                                </div>
                            </div>
                        </CSSTransition>
                    )
                })
                break;
                case('cardMain'):
                template = this.state.items.map((item, i) => {
                    return (
                        <CSSTransition
                        classNames={{
                            enter: style.newsList_wrapper,
                            active: style.newsList_wrapper_enter,

                        }} 
                            timeout={500}
                            key={i}
                        >
                            <div>
                                <div className={style.newsList_item}>
                                    <Link to={`/articles/${item.id}`}>
                                        <CardInfo 
                                        teams={this.state.teams} 
                                        team={item.teamId} 
                                        date={item.date}
                                        />
                                        <h2>{item.title}</h2>
                                    </Link>
                                </div>
                            </div>
                            
                        </CSSTransition>
                    )
                })
                    break;

            default:
                template = null
        }
        return template
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <TransitionGroup
                    component="div"
                    className="list"
                >
                    {this.renderNews(this.props.type)}
                </TransitionGroup>
                <Button
                    type="loadmore"
                    loadMore={() => this.loadMore()}
                    cta="Load More News"
                />

            </div>
        );
    }
}

export default NewsList;