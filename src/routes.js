import React from 'react';
import { Switch } from 'react-router-dom';

// Component
import Home from './components/Home/Home'

// Hoc
import Layout from './hoc/layout'
//

import NewsArticle from './components/articles/news/post/index';

import VideoArticles from './components/articles/videos/video/videoArticles';

import NewsMain from './components/articles/news/main/index'

import SignIn from './components/SignIn/sign_in';

import Dashboard from './components/dashboard/dashboard';

import PrivateRoutes from './components/authRoutes/privateRoutes'
import PublicRoutes from './components/authRoutes/publicRoutes'


const Routes = (props) => {
    return (
        <Layout user={props.user}>
            <Switch>
                <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
                <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain} />
                <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticle} />
                <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideoArticles} />
                <PublicRoutes  {...props} restricted={true} path="/sign-in" exact component={SignIn} />
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
            </Switch>
        </Layout>
    );
}

export default Routes; 