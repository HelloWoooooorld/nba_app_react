import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDf16W8zWHLVDcb_D_TMYkVxxEgnyuvtv4",
    authDomain: "nasdasd-4830a.firebaseapp.com",
    databaseURL: "https://nasdasd-4830a.firebaseio.com",
    projectId: "nasdasd-4830a",
    storageBucket: "nasdasd-4830a.firebaseio.com",
    messagingSenderId: "87349137076",
    appId: "1:87349137076:web:7c93e4b39edc215d"
};

firebase.initializeApp(config);

const fireBaseDB = firebase.database();
const fireBaseArticles = fireBaseDB.ref('articles');
const fireBaseTeams = fireBaseDB.ref('teams');
const fireBaseVideos = fireBaseDB.ref('videos');

const fireBaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data;
}


export {
    firebase,
    fireBaseDB,
    fireBaseArticles,
    fireBaseVideos,
    fireBaseTeams,
    fireBaseLooper
}