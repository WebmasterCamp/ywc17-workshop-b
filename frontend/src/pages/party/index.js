import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import {Card, Button} from "antd"
import gql from "graphql-tag";
import _ from 'lodash'
import {Link} from "react-router-dom"

const GET_PARTIES = gql`
  query getAllParties {
      parties {
        id
        title
        member {
          id
          name
        }
        confirmedMember {
          id
          name
        }
      }
    
  }
`;

export const PartiesView = () => {
  const { data, loading, error } = useQuery(GET_PARTIES);

  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  console.log("GET_ALL_PARTIES data : ", data.parties);
  return (
    <div>
        <Link to="/waitingParty">SUBSCRIBE TO NEW PARTY</Link>
      {data.parties &&
        data.parties.map((data, index) => (
        <Card title={data.title || "ไม่มีชื่อ"}>
          {index}
        <pre>{JSON.stringify(data)}</pre>
        
        <a>
              JOIN
          </a>
          </Card>

        ))
      }
    </div>
  );
};

const SUBSCRIBE_NEW_PARTY = gql`
  subscription newParty {
    party {
      node {
        id
        member {
          name
        }
      }
    }
  }
`;

export const WaitingParty = () => {
    const { data, error, loading } = useSubscription(SUBSCRIBE_NEW_PARTY);
    if (loading) return <p>Loading ...</p>;
    if (error) {
      console.log(error);
      return <p>error</p>;
    }
    console.log(data)
    return <div>
        <h4>New Party : {JSON.stringify(data.party)}</h4>
        <Link to="/chat/123">Let's Chat</Link>
    </div>;
}