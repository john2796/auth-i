import React from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

const UserCardPage = ({ user }) => {
  return (
    <Row>
      <Col sm="6">
        <Card body className="cards">
          <CardTitle className="card-title">{user.username}</CardTitle>
          <CardText>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
            aliquid obcaecati esse!
          </CardText>
        </Card>
      </Col>
    </Row>
  );
};

export default UserCardPage;
