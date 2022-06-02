import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import Tweets from '@/pages/Tweets';
import Clusters from '@/pages/Clusters';
import TweetDetails from '@/pages/TweetDetails';
import TweetController from '@/controllers/TweetController';
import TweetDataContext from './context/TweetDataContext';
import Process from './pages/Process';
import Input from './pages/Input';
import PreprocessedTweetDetails from './components/PreprocessedTweetDetails';
import TFIDFDetails from './components/TFIDFDetails';
import ClusterDetails from './components/ClusterDetails';

function App() {
  const [tweetData, setTweetData] = useState([]);
  const [cleanedTweetData, setCleanedTweetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TweetController.getAll(true).then(response => {
      setTweetData(response.data);
      TweetController.getAll(false, true).then(_response => {
        setCleanedTweetData(_response.data);
        setLoading(false);
      });
    });
  }, []);

  return (
    <>
      <TweetDataContext.Provider
        value={{ tweetData, cleanedTweetData, loading }}
      >
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
              </Route>----
              <Route path="/tweets">
                <Tweets />
              </Route>
              <Route path="/clusters">
                <Clusters />
              </Route>
              <Route path="/process">
                <Process />
              </Route>
              <Route path="/preprocessed_tweet/:id">
                <PreprocessedTweetDetails />
              </Route>
              <Route path="/vectors/:id">
                <TFIDFDetails />
              </Route>
              <Route path="/cluster/:id">
                <ClusterDetails />
              </Route>
              <Route path="/analyze">
                <Input />
              </Route>
            </Switch>
          </div>
        </main>
      </TweetDataContext.Provider>
    </>
  );
}

export default App;
