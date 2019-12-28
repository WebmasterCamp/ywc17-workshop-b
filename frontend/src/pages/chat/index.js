import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import {Card, Button} from "antd"
import gql from "graphql-tag";
import _ from 'lodash'
import {Link} from "react-router-dom"


const SUBSCRIBE_NEW_MESSAGE = gql`
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


export const ChatRoom = () => {
    const { data, error, loading } = useSubscription(SUBSCRIBE_NEW_MESSAGE);
    if (loading) return <p>Loading ...</p>;
    if (error) {
      console.log(error);
      return <p>error</p>;
    }
    console.log(data)
    return <div>
        <h4>New Party : {JSON.stringify(data.chat)}</h4>
    </div>;
}