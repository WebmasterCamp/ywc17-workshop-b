import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { ApiTest } from './api';

const client = new ApolloClient({
  uri: ' https://eu1.prisma.sh/peerawas-archavanuntakun-77f2e0/backend/dev',
});

function App() {
  return (
    
    <ApolloProvider client={client}>
      <div>"HI"</div>
    <Router>
        {/* Template */}
        <Switch>
          <Route path="/static/">
            {/* ... some MOCK static 0,1,2,3,4 */}
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

          <Route path="/api">
            <ApiTest/>
          </Route>
          
        </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
