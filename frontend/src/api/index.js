import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ALL_USERS = gql`
  query getAllUsers {
    users{
    id
    name
    profileImageUrl
    party{
      id
    	member{
        id
        name
      }
      confirmedMember{
        id
        name
      }
    }
  }
  }
`;

export const ApiTest = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error)
    return <p>error : {error}</p>
  }
  console.log("GET_ALL_USERS data : ", data.users)
  return <h1>Hello {JSON.stringify(data.users)}</h1>;
}