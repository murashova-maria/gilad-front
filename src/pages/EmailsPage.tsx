import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import bg from "../assets/img/bg.png";
import { PostsCard } from "../views";

const Emails = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 60px 10px 20px;
  background: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-family: "Gilroy-B";
  font-size: 36px;
  line-height: 45px;
  color: ${colors.graphite_6};
  margin-bottom: 10px;
`;

const ContentBox = styled.div``;

const EmailsPage = () => {
  return (
    <Emails>
      <Content>
        <div>
          <Title>Gov publications</Title>
          <PostsCard />
        </div>
        <div>
          <Title>News by Google</Title>
          <PostsCard />
        </div>
      </Content>
    </Emails>
  );
};

export default EmailsPage;
