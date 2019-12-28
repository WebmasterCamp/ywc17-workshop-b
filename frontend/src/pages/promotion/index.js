import React from "react";
import { List, Input, Form, Card, Row } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { range, gqlReady } from "../../util";
import Meta from "antd/lib/card/Meta";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-floating-action-button";

const GET_PROMOTION = gql`
  query getPromotion($id: ID!) {
    promotion(where: { id: $id }) {
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
  const result = useQuery(GET_PROMOTION, {
    variables: { id }
  });

  if (!gqlReady(result)) return null;

  const {
    data: {
      promotion: { coverImageUrl, title, description }
    }
  } = result;
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

  return (
    <div>
      <img src={coverImageUrl} style={{ width: "100vw", height: "50vh" }} />
      <div style={{ border: "1px solid black", padding: 20 }}>
        มี {Math.floor(Math.random() * 100)} คนกำลังสนใจโปรโมชั่นนี้
      </div>
      <div style={{ padding: 15 }}>
        <h1>{title}</h1>
        <h2>รายละเอียดโปรโมชั่น</h2>
        <p>{description}</p>
      </div>
      <Container>
        <Link to={`/createParty/${id}`}>
          <Button tooltip="The big plus button!" icon="fa fa-bars" />
        </Link>
      </Container>
    </div>
  );
};

export default PromotionView;
