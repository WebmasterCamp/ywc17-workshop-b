import React from "react";
import HomePage from "./pages/home";
import PromotionView from "./pages/promotion";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "antd/dist/antd.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { ApiTest } from "./api";
import { PartiesView } from "./pages/party"

const client = new ApolloClient({
  uri: " https://eu1.prisma.sh/peerawas-archavanuntakun-77f2e0/backend/dev"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>"HI"</div>
      <Router>
        {/* Template */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* view all promotions */}
          <Route path="/static/">{/* ... some MOCK static 0,1,2,3,4 */}</Route>
          {/* view all promotions */}
          <Route path="/promotion/:id" component={PromotionView} />
          <Route path="/parties">
            {/* filter by promotions, location, etc. using URI query  */}
            <PartiesView/>
          </Route>
          <Route path="/users/:id">{/* user*/}</Route>
          <Route path="/chat/:id">{/* chat with party */}</Route>
          {/* some finallize route */}

          <Route path="/api">
            <ApiTest />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
