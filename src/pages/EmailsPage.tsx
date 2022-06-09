import styled from "styled-components";
import bg from "../assets/img/bg.png";
import { EmailsCardView } from "../views";

const Emails = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 60px 70px 20px;
  background: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
`;

const EmailsPage = () => {
  return (
    <Emails>
      <Content>
        <EmailsCardView />
        <div>Editor</div>
      </Content>
    </Emails>
  );
};

export default EmailsPage;
