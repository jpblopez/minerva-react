import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/dashboard/Dashboard';
import Preprocessing from '@/pages/preprocessing/Preprocessing';

function App() {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="flex-grow bg-red-100 p-4 md:h-auto min-h-screen md:min-h-0">
        <Switch>
          <Redirect from="/" exact to="/dashboard" />
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route path="/preprocessing" render={() => <Preprocessing />} />
          <Route path="/model-building" render={() => 'Model'} />
          <Route path="/analyze" render={() => 'Analysis'} />
          <Route path="/settings" render={() => 'Settings'} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
