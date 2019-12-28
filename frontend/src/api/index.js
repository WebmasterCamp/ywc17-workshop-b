import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import _ from "lodash";

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      profileImageUrl
      party {
        id
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
  }
`;

export const UserTest = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error);
    return <p>error : {error}</p>;
  }
  console.log("GET_ALL_USERS data : ", data.users);
  return <h1>Hello {JSON.stringify(data.users)}</h1>;
};

const GET_ALL_PROMOTIONS = gql`
  query getAllPromotions {
    promotions {
      id
      title
      coverImageUrl
      description
      duration
      location
      additionalInfo
      condition
      contact
    }
  }
`;

export const PromotionTest = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROMOTIONS);
  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  console.log("GET_ALL_PROMOTIONS data : ", data.promotions);
  return (
    <div>
      {data.promotions &&
        data.promotions.map((data, index) => (
          <div>
            {index}
            {_.map(data, field => {
              return <li>{field}</li>;
            })}
          </div>
        ))}
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

export const NewPartyTest = () => {
  const { data, error, loading } = useSubscription(SUBSCRIBE_NEW_PARTY);
  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  console.log(data)
  return <h4>New Party : {JSON.stringify(data.party)}</h4>;
};

export const ApiTest = () => (
  <div>
    <UserTest />
    <PromotionTest />
    <NewPartyTest />
  </div>
);
