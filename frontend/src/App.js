import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
        {/* Template */}
        <Switch>
          <Route path="/step/">
            {/* ... some MOCK step 0,1,2,3,4 */}
          </Route>
          <Route path="/promotions">
            {/* view all promotions */}
          </Route>
          <Route path="/parties">
            {/* filter by promotions, location, etc. using URI query  */}
          </Route>
          <Route path="/chat/:id">
            {/* chat with party */}
          </Route>
          {/* some finallize route */}
        </Switch>
    </Router>
  );
}

export default App;
