import React, { useState, useEffect } from "react";

export default ViewPromotion = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    // setPromotions(gql)
  }, [])
  
  return (
    <List
      itemLayout="horizontal"
      dataSource={promotions}
      renderItem={item => (
        <List.Item>
          {/* <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          /> */}
          {JSON.stringify(item)}
        </List.Item>
      )}
    />
  );
};
