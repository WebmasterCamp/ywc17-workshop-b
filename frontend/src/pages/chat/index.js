import React, { useState } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { Card, Button } from "antd";
import gql from "graphql-tag";
import _ from "lodash";
import { Link } from "react-router-dom";

const SUBSCRIBE_NEW_MESSAGE = gql`
  subscription newMessage {
    chat(where: { mutation_in: [CREATED] }) {
      node {
        id
        owner {
          name
        }
        message
        party {
          id
        }
      }
    }
  }
`;

export const ChatRoom = () => {
  // const { data, error, loading } = useSubscription(SUBSCRIBE_NEW_MESSAGE);

  const [messages, setMessage] = useState([
    {
      sender: "12345",
      message: "Hello",
      timestamp: 5
    },
    {
      sender: "me",
      message: "Hello",
      timestamp: 10
    },
    {
      sender: "12345",
      message: "Hello",
      timestamp: 15
    },
    {
      sender: "12345",
      message: "Hello",
      timestamp: 20
    }
  ]);
  // const messages = [{
  //   sender: ""
  // }];

  return (
    <div
      style={{
        backgroundImage: "url('chat.png')"
      }}
    >
      {/* <h4>New Party : {JSON.stringify(data)}</h4> */}
    </div>
  );
};
