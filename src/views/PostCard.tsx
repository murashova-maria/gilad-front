import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { PostKeyword } from "../components/PostKeyword";
import { Button } from "../components/Button";
import SourceLogo from "../assets/svg/card-src.svg";
import { IPostCard } from "./types";
import { useTranslation } from "react-i18next";
import { usePostsActions, usePostsState } from "../store/posts/hooks"

const Card = styled.div`
  width: 540px;
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const Clients = styled.div`
  padding: 20px;
  flex-shrink: 0;
  width: 135px;
  border-inline-start: 1px solid #cccccc;
`;

const Client = styled.p`
  margin-bottom: 8px;
  text-decoration: underline;
  color: ${colors.graphite_4};
  cursor: pointer;
  transition: opacity 250ms linear;
  &:hover {opacity: .65;}
`;

const Title = styled.h2`
  font-family: "Gilroy-B";
  font-size: 22px;
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

const SourceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Btns = styled.div`
  display: flex;
  gap: 15px;
`;

const PostCard = ({
  onEmail,
  onOpenModal,
  onSelectClient,
  item: { id, title, name, cat, tag, description, keywords, clients, text, source_name, _sender },
}: IPostCard) => {
  const { t } = useTranslation();
  const {onDeletePost} = usePostsActions();

  const handleOnEmail = () => {
    onEmail()
    onOpenModal()
  }

  return (
    <Card>
      <Content>
        {title && <Title>{title}</Title>}
        {name && <Title>{name}</Title>}
        <Source>
          {(tag || source_name)&& (
            <SourceBox>
              <SourcePic src={SourceLogo} />
              {tag || source_name}
            </SourceBox>
          )}
          {cat && <SourceText>{cat}</SourceText>}
        </Source>
        {description && <Text>{description}</Text>}
        {text && <Text>{text}</Text>}
        {keywords && (
          <>
            <KeywordsTitle>{t("emails_keywords")}</KeywordsTitle>
            <Keywords>
              {keywords.map(
                (keyword: { keyword: string; id: number }, index: number) => (
                  <PostKeyword key={index}>{keyword.keyword}</PostKeyword>
                )
              )}
            </Keywords>
          </>
        )}
        <Btns>
          <Button type="email" onClick={handleOnEmail} />
          <Button type="del" onClick={() => onDeletePost({node: _sender, postId: id})}/>
        </Btns>
      </Content>
      <Clients>
        {clients &&
          clients.map((client: any, index: number) =>  (
            <Client onClick={() => onSelectClient(client.id)} key={index}>{client.name}</Client>
          ))}
      </Clients>
    </Card>
  );
};

export default PostCard;
