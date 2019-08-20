import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Component
import Home from './components/Home/Home'

// Hoc
import Layout from './hoc/layout'
//

import NewsArticle from './components/articles/news/post/index';


class Routes extends Component {


    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/articles/:id" exact component={NewsArticle} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes; 