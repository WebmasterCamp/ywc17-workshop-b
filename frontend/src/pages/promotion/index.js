import React from "react";
import { List, Input, Button, Form, Card } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { range } from "../../util";
import Meta from "antd/lib/card/Meta";
import { useParams } from "react-router-dom";

const GET_PROMOTION = gql`
  query getAllPromotions {
    promotion(where: { id: "ck4p4lu6kt9u50922ngrd7qci" }) {
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

const PromotionView = ({}) => {
  const { id } = useParams();
  // const [promotions, setPromotions] = useState(range(10).map(() => ({})));
  const { data, loading, error } = useQuery(GET_PROMOTION);

  // console.log(loading, data, error);
  //   if (error != undefined || data == undefined) return null;

  //   const onFilter = e => {
  //     e.preventDefault();
  //     validateFields((err, values) => {
  //       if (!err) {
  //         console.log("Received values of form: ", values);
  //       }
  //     });
  //   };

  return <div>{id}</div>;
};

export default PromotionView;
