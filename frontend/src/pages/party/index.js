import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import _ from 'lodash'

const GET_PARTIES = gql`
  query getAllParties {
      parties {
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
      {data.parties &&
        data.parties.map((data, index) => (
        <div>
          {index}
        <pre>{JSON.stringify(data)}</pre>
          </div>
        ))
      }
    </div>
  );
};
