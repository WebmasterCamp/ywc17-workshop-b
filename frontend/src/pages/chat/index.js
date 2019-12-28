import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import {Card, Button} from "antd"
import gql from "graphql-tag";
import _ from 'lodash'
import {Link} from "react-router-dom"


const SUBSCRIBE_NEW_PARTY = gql`
  subscription newMessage {
    chat(where: {
      mutation_in: [CREATED]
    }){
      node{
        id
        owner{
          name
        }
        message
        party{
          id
          
        }
      }
    }
  }
`;

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