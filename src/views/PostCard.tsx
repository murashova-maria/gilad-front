import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { PostKeyword } from "../components/PostKeyword";
import { Button } from "../components/Button";
import SourceLogo from "../assets/svg/card-src.svg";
import { IPostCard } from "./types";
import { useTranslation } from "react-i18next";
import { usePostsActions, usePostsState } from "../store/posts/hooks";
import { IPostCardClient } from "../store/clients";
import { useEffect, useMemo, useState } from "react";

const Card = styled.div`
  width: 540px;
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 30px;
  transition: opacity 500ms linear;
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

const Client = styled.p<{ sended: boolean }>`
  margin-bottom: 8px;
  text-decoration: underline;
  color: ${({ sended }) => (sended ? "green" : colors.graphite_4)};
  cursor: pointer;
  transition: opacity 250ms linear;
  &:hover {
    opacity: 0.65;
  }
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

const StyledDate = styled.p`
  margin-top: 18px;
`;

const PostCard = ({
  onEmail,
  onOpenModal,
  onSelectClient,
  item: {
    id,
    title,
    name,
    cat,
    tag,
    description,
    keywords,
    clients,
    text,
    source_name,
    _sender,
    date_for_sorting,
  },
}: IPostCard) => {
  const { t } = useTranslation();
  const { onDeletePost } = usePostsActions();

  const handleOnEmail = () => {
    onEmail();
    onOpenModal();
  };

  const sortDate = useMemo(() => {
    if (date_for_sorting) {
      const data = new Date(new Date().toLocaleString("en-US", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })).toLocaleString('en-GB').split(', ')
    const date = data[0].replaceAll('/', '.')
    const time = data[1].slice(0,5)
      return`${time} ${date}`
    }
    if (!date_for_sorting) return null;
  }, [date_for_sorting]);

  return (
    <Card>
      <Content>
        {title && <Title>{title}</Title>}
        {name && <Title>{name}</Title>}
        <Source>
          {(tag || source_name) && (
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
          <Button
            type="del"
            onClick={() => onDeletePost({ node: _sender, postId: id })}
          />
        </Btns>
        {sortDate && (
          <StyledDate>
            {t("post-card_sort-date")} {sortDate}
          </StyledDate>
        )}
      </Content>
      <Clients>
        {clients &&
          clients.map((client: IPostCardClient, index: number) => (
            <Client
              sended={client.sended}
              onClick={() =>
                onSelectClient({ id: client.id, client: client.name })
              }
              key={index}
            >
              {client.name}
            </Client>
          ))}
      </Clients>
    </Card>
  );
};

export default PostCard;
