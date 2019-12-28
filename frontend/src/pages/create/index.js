import React from "react";
import { List, Input, Button, Form, Card } from "antd";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { range, gqlReady } from "../../util";
import Meta from "antd/lib/card/Meta";
import { useParams } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

const GET_PROMOTION = gql`
  query getPromotions($id: ID!) {
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

const CreatePartyPage = ({ form: { getFieldDecorator, validateFields } }) => {
  const client = useApolloClient();
  const { promoid: id } = useParams();

  const result = useQuery(GET_PROMOTION, {
    variables: { id }
  });

  if (!gqlReady(result)) return null;

  const {
    data: {
      promotion: { coverImageUrl, title }
    }
  } = result;

  const onCreate = e => {
    e.preventDefault();

    validateFields(async (err, values) => {
      // values example `{name: "abcd", usernamme: "intaniger", tel: "0989417565", description: "SSO"}`

      await client.mutate({
        mutation: gql`
          mutation {
            createParty(
              data: {
                title: "หิวชาบู"
                member: { connect: { id: "ck4p2cery3ato09939culz1p1" } }
              }
            ) {
              id
              member {
                id
                name
              }
            }
          }
        `
      });
      if (!err) {
        console.log("Received values of form: ", values);
      }
      window.location.href = "/waitingParty";
    });
  };
  console.log(coverImageUrl);
  return (
    <div>
      <div
        style={{
          height: "20vh",
          backgroundImage: `url(${coverImageUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      />
      {/* <img
        src={coverImageUrl}
        style={{ maxWidth: 230, maxHeight: 95, width: "auto", height: "auto" }}
      /> */}
      <div style={{ padding: 15 }}>
        <h1>สร้างปาร์ตี้ (ร้าน {title})</h1>
        <Form onSubmit={onCreate} className="login-form">
          <Form.Item>
            {getFieldDecorator("name", {})(<Input placeholder="ชื่อปาร์ตี้" />)}

            {getFieldDecorator(
              "username",
              {}
            )(<Input placeholder="ชื่อเล่นของคุณ" />)}

            {getFieldDecorator(
              "tel",
              {}
            )(<Input placeholder="เบอร์โทรศัพท์" />)}

            {getFieldDecorator(
              "description",
              {}
            )(
              <TextArea
                autoSize
                placeholder="รายละเอียด (เช่น ความต้องการ เวลา สถานที่)"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              สร้างปาร์ตี้
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Form.create({ name: "party_form" })(CreatePartyPage);
