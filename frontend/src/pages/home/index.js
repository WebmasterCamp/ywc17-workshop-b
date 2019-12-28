import React from "react";
import { List, Input, Button, Form, Card } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { range, gqlReady } from "../../util";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";

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

const HomePage = ({ form: { getFieldDecorator, validateFields } }) => {
  // const [promotions, setPromotions] = useState(range(10).map(() => ({})));
  const result = useQuery(GET_ALL_PROMOTIONS);

  if (!gqlReady(result)) return null;

  const {
    data: { promotions }
  } = result;
  const onFilter = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  return (
    <div>
      <Form onSubmit={onFilter} className="login-form">
        <Form.Item>
          {getFieldDecorator("query", {})(<Input placeholder="query" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Link to="/parties">
        <Button type="danger" htmlType="submit">
          Find party
        </Button>
      </Link>
      <Link to="/review">
        <Button htmlType="submit">
          Review
        </Button>
      </Link>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={promotions}
        renderItem={({ id, coverImageUrl, title, description }) => (
          <List.Item>
            <Link to={`/promotion/${id}`}>
              <Card hoverable cover={<img alt={title} src={coverImageUrl} />}>
                <Meta title={title} description={description} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Form.create({ name: "promotion" })(HomePage);
