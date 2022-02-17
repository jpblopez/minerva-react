import React, { useState, useEffect } from 'react';
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
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/tweets/:id">
              <TweetDetails/>
            </Route>
            <Route path="/tweets" render={<Tweets/>}>
              <Tweets/>
            </Route>
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
