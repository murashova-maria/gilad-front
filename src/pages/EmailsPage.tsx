import styled from "styled-components";
import bg from "../assets/img/bg.png";
import { EditModel, PostsCard } from "../views";
import { Title } from "../components/Title";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePostsActions, usePostsState } from "../store/posts/hooks";

const Emails = styled.div`
  min-height: 100vh;
  display: flex;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url(${bg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 70px 20px 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 20px;
`;

const PostsContainer = styled.div`
  padding: 20px;
  background: #eeeeee;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgb(0 0 0 / 5%);
  border-radius: 20px;
  & > div {
    height: 600px;
    overflow-y: auto;
  }
`;

const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`;

const EmailsPage = () => {
  const { t } = useTranslation();
  const {
    editorPost,
    govils,
    news,
    agendas,
    googleNews,
    committees,
    plenums,
    queries,
    bills,
    govStatistics,
    govilData,
    govilPdf,
    releases,
    newPosts,
  } = usePostsState();
  // Fetch posts
  const { onGetPosts, onWatchForPosts, onCloseWebSocket, onSetEditor } =
    usePostsActions();
  useEffect(() => {
    onWatchForPosts();
    onGetPosts();
  }, []);

  return (
    <>
      <Emails>
        <Content>
          <div>
            <StyledTitle>{t("emails_title2")}</StyledTitle>
            <PostsContainer>
              <div>
                {newPosts.map((post, index) => (
                  <PostsCard
                    key={`bills ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="news"
                  />
                ))}

                {govilData.map((post, index) => (
                  <PostsCard
                    key={`bills ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="govil_data"
                  />
                ))}

                {queries.map((post, index) => (
                  <PostsCard
                    key={`queries ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="query"
                  />
                ))}

                {govilPdf.map((post, index) => (
                  <PostsCard
                    key={`bills ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="govil_pdf"
                  />
                ))}

                {plenums.map((post, index) => (
                  <PostsCard
                    key={`plenums ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="plenum_session"
                  />
                ))}

                {agendas.map((post, index) => (
                  <PostsCard
                    key={`agendas ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="agendas"
                  />
                ))}

                {bills.map((post, index) => (
                  <PostsCard
                    key={`bills ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="bill"
                  />
                ))}

                {releases.map((post, index) => (
                  <PostsCard
                    key={`bills ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="press_release"
                  />
                ))}

                {govils.map((post, index) => (
                  <PostsCard
                    key={`govils ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="govil"
                  />
                ))}

                {committees.map((post, index) => (
                  <PostsCard
                    key={`committees ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="committee_session"
                  />
                ))}

                {govStatistics.map((post, index) => (
                  <PostsCard
                    key={`bills ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="gov_statisctics"
                  />
                ))}

                {news.map((post, index) => (
                  <PostsCard
                    key={`news ${index}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="news"
                  />
                ))}
              </div>
            </PostsContainer>
          </div>

          <div>
            <StyledTitle>{t("emails_title1")}</StyledTitle>
            <PostsContainer>
              <div>
                {googleNews.map((post) => (
                  <PostsCard
                    key={`${post.id} ${post.title}`}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    node="google_news"
                  />
                ))}
              </div>
            </PostsContainer>
          </div>
        </Content>
      </Emails>
      {editorPost && (
        <Modal onClose={() => onSetEditor(null)}>
          <EditModel post={editorPost} />
        </Modal>
      )}
    </>
  );
};

export default EmailsPage;
