import styled from "styled-components";
import bg from "../assets/img/bg.png";
import { PostsCard, PostEditor } from "../views";

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

const EmailsPage = () => {
  return (
    <Emails>
      <Content>
        <PostsCard />
        <PostEditor />
      </Content>
    </Emails>
  );
};

export default EmailsPage;
