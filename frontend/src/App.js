import React from "react";
import HomePage from "./pages/home";
import PromotionView from "./pages/promotion";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { HttpLink  } from 'apollo-link-http';
import { ApolloLink, concat, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

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
import { PartiesView, WaitingParty } from "./pages/party"
import {ChatRoom} from "./pages/chat"


const httpLink = new HttpLink({ uri: 'https://eu1.prisma.sh/peerawas-archavanuntakun-77f2e0/backend/dev' });
// const client = new ApolloClient({
//   uri: " https://eu1.prisma.sh/peerawas-archavanuntakun-77f2e0/backend/dev"
// });


const subClient = new SubscriptionClient('wss://eu1.prisma.sh/peerawas-archavanuntakun-77f2e0/backend/dev', {
  reconnect: true
});

const wsLink = new WebSocketLink(subClient);

const newLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: newLink,
  cache: new InMemoryCache()
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
          <Route path="/chat/:id">
            {/* chat with party */}
            <ChatRoom/>
          </Route>
          <Route path="/waitingParty">
            <WaitingParty/>
          </Route>
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
