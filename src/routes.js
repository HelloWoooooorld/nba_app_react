import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Component
import Home from './components/Home/Home'

// Hoc
import Layout from './hoc/layout'
//

import NewsArticle from './components/articles/news/post/index';

import VideoArticles from './components/articles/videos/video/videoArticles';

import NewsMain from './components/articles/news/main/index'


import SignIn from './components/SignIn/sign_in';

class Routes extends Component {
    

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={NewsMain}/>
                    <Route path="/articles/:id" exact component={NewsArticle} />
                    <Route path="/videos/:id" exact component={VideoArticles} />
                    <Route path="/sign-in" exact component={SignIn} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes; 