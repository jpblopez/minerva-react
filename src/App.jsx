import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/dashboard/Dashboard'

function App() {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="flex-grow bg-red-100 p-4 md:h-auto min-h-screen md:min-h-0">
        <Switch>
          <Redirect from="/" exact to="/dashboard" />
          <Route path="/dashboard" render={() => <Dashboard/>} />
          <Route path="/analyze" />
          <Route path="/settings" />
        </Switch>
      </div>
    </main>
  );
}

export default App;
