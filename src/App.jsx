import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import Tweets from '@/pages/Tweets';
import Clusters from '@/pages/Clusters';
import TweetDetails from '@/pages/TweetDetails';
import TweetController from '@/controllers/TweetController';
import TweetDataContext from './context/TweetDataContext';

function App() {
  const [tweetData, setTweetData] = useState([])

  useEffect(() => {
    TweetController.getAll().then(response => {
      setTweetData(response.data);
    });
  }, []);

  return (
    <>
      <TweetDataContext.Provider value={tweetData}>
        <main className="flex flex-row">
          <Sidebar />
          <div className="flex-grow bg-gray-100 md:h-auto min-h-screen md:min-h-0 ml-">
            <Switch>
              <Redirect from="/" exact to="/dashboard" />
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/tweets/:id">
                <TweetDetails />
              </Route>
              <Route path="/tweets">
                <Tweets />
              </Route>
              <Route path="/clusters">
                <Clusters />
              </Route>
            </Switch>
          </div>
        </main>
      </TweetDataContext.Provider>
    </>
  );
}

export default App;
