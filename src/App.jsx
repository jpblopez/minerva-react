import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/dashboard/Dashboard';
import Preprocessing from '@/pages/preprocessing/Preprocessing';
import ModelBuilding from '@/pages/model_building/ModelBuilding';
import Sentiment from '@/pages/analyze/Sentiment';
import Tweets from '@/pages/preprocessing/Tweets';
import Tokens from '@/pages/preprocessing/Tokens';

function App() {
  return (
    <>
      <Sidebar />
      <main className="flex flex-row">
        <div className="w-1/3 md:w-1/6 flex-shrink-0 h-full min-h-screen" />
        <div className="flex-grow bg-gray-100 p-4 md:h-auto min-h-screen md:min-h-0 ml-">
          <Switch>
            <Redirect from="/" exact to="/dashboard" />
            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route
              path="/preprocessing"
              exact
              render={() => <Preprocessing />}
            />
            <Route path="/preprocessing/tweets" render={() => <Tweets />} />
            <Route path="/preprocessing/tokens" render={() => <Tokens />} />
            <Route path="/model-building" render={() => 'Model'} />
            <Route path="/settings" render={() => 'Settings'} />
            <Route path="/analyze" render={() => <Sentiment />} />
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
