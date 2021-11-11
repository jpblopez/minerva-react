import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/dashboard/Dashboard';
import Preprocessing from '@/pages/preprocessing/Preprocessing';
import ModelBuilding from '@/pages/model_building/ModelBuilding'
import Sentiment from '@/pages/analyze/Sentiment';

function App() {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="flex-grow bg-red-100 p-4 md:h-auto min-h-screen md:min-h-0">
        <Switch>
          <Redirect from="/" exact to="/dashboard" />
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route path="/preprocessing" render={() => <Preprocessing />} />
          <Route path="/model-building" render={() => <ModelBuilding />} />
          <Route path="/settings" render={() => 'Settings'} />
          <Route path="/analyze" render={() => <Sentiment />} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
