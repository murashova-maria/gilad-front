import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { PostKeyword } from "../components/PostKeyword";
import { Button } from "../components/Button";
import SourceLogo from "../assets/svg/card-src.svg";
import { IPostCard } from "./types";
import { useTranslation } from "react-i18next";


const Card = styled.div`
  width: 640px;
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid ${colors.blue_green};
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const Clients = styled.div`
  padding: 20px;
  flex-shrink: 0;
  border-inline-start: 1px solid #cccccc;
`;

const Client = styled.p`
  margin-bottom: 8px;
  text-decoration: underline;
  color: ${colors.graphite_4};
`;

const Title = styled.h2`
font-family: 'Gilroy-B';
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
`;

const Source = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  color: ${colors.grey_4};
`;

const SourceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: inherit;
`;

const SourcePic = styled.img`
  height: 16px;
  width: 16px;
  object-fit: contain;
  object-position: center;
`;

const SourceText = styled.p``;

const Text = styled.p`
  font-family: "Open Sans";
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 20px;
`;

const KeywordsTitle = styled.p`
  font-size: 18px;
  line-height: 22px;
  /* graphite5 */
  color: ${colors.graphite_5};
  margin-bottom: 5px;
`;

const Keywords = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Btns = styled.div`
  display: flex;
  gap: 15px;
`;

const PostCard = ({onEmail, title}: IPostCard) => {
  const {t} = useTranslation()
  return (
    <Card>
      <Content>
        <Title>{title}</Title>
        <Source>
          <SourceLink href="#">
            <SourcePic src={SourceLogo} />
            Ministry of Social Equality
          </SourceLink>
          <SourceText>כותרת: עדכון מהכנסת</SourceText>
        </Source>
        <Text>
          Ac, elit consectetur convallis nibh venenatis. Mauris tellus,
          imperdiet tellus vitae dictum accumsan faucibus blandit. Sapien,
          cursus ...
        </Text>
        <KeywordsTitle>{t('emails_keywords')}</KeywordsTitle>
        <Keywords>
          <PostKeyword>Word</PostKeyword>
          <PostKeyword>Word</PostKeyword>
          <PostKeyword>Word</PostKeyword>
        </Keywords>
        <Btns>
          <Button type="email" onClick={onEmail}/>
          <Button type="del" />
        </Btns>
      </Content>
      <Clients>
        <Client>Client Name 1</Client>
        <Client>Client Name 2</Client>
        <Client>Client Name 3</Client>
        <Client>Client Name 4</Client>
        <Client>Client Name 5</Client>
        <Client>Client Name 6</Client>
      </Clients>
    </Card>
  );
};

export default PostCard;
