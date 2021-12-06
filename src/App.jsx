import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import Tweets from '@/pages/Tweets';
import TweetDetails from '@/pages/TweetDetails';

function App() {
  return (
    <>
      <main className="flex flex-row">
        <Sidebar />
        <div className="flex-grow bg-gray-100 md:h-auto min-h-screen md:min-h-0 ml-">
          <Switch>
            <Redirect from="/" exact to="/dashboard" />
            <Route path="/dashboard" render={Dashboard} />
            <Route path="/tweets/:id" render={TweetDetails} />
            <Route path="/tweets" render={Tweets} />
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
