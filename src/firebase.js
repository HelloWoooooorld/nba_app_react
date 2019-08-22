import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDf16W8zWHLVDcb_D_TMYkVxxEgnyuvtv4",
    authDomain: "nasdasd-4830a.firebaseapp.com",
    databaseURL: "https://nasdasd-4830a.firebaseio.com",
    projectId: "nasdasd-4830a",
    storageBucket: "",
    messagingSenderId: "87349137076",
    appId: "1:87349137076:web:7c93e4b39edc215d"
  };

  firebase.initializeApp(firebaseConfig);


  const firebaseDB = firebase.database()
  const fireBaseArticles = firebaseDB.ref('articles');
  const fireBaseTeams = firebaseDB.ref('teasm');
  const fireBaseVideos = firebaseDB.ref('videos');

  const firebaseLooper = (snapshot) => {
    const  data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data;
  }


  export {
    firebase,
    firebaseDB,
    fireBaseArticles,
    fireBaseTeams,
    fireBaseVideos,
    firebaseLooper
  }