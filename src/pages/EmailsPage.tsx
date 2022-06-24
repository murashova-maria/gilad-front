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
  padding: 60px 10px 20px;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &::after {
    content: '';
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
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`;

const EmailsPage = () => {
  const {t} = useTranslation()
  const {editorPost, govils, news, agendas, googleNews, committees, plenums, queries, bills, govStatistics} = usePostsState()
  // Fetch posts
  const {onGetPosts, onWatchForPosts, onCloseWebSocket, onSetEditor} = usePostsActions()
  useEffect(() => {
   // onWatchForPosts()
    onGetPosts()
  }, [])

  return (
    <>
      <Emails>
        <Content>
          <div>
            <StyledTitle>{t('emails_title2')}</StyledTitle>
            {govils.map((post, index) => <PostsCard key={`govils ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}
            {news.map((post, index) => <PostsCard key={`news ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}
            {agendas.map((post, index) => <PostsCard key={`agendas ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}
            {committees.map((post, index) => <PostsCard key={`committees ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}
            {plenums.map((post, index) => <PostsCard key={`plenums ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}
            {queries.map((post, index) => <PostsCard key={`queries ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}
            {bills.map((post, index) => <PostsCard key={`bills ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}
            {govStatistics.map((post, index) => <PostsCard key={`bills ${index}`} item={post} onEmail={()=> onSetEditor(post)} />)}


            
          </div>
          <div>
            <StyledTitle>{t('emails_title1')}</StyledTitle>
            {googleNews.map(post => <PostsCard key={`${post.id} ${post.title}`} item={post} onEmail={()=> onSetEditor(post)} />)}

          </div>
        </Content>
      </Emails>
      <Modal show={!!editorPost} onClose={() =>  onSetEditor(null)}>
        {editorPost && <EditModel post={editorPost}/>}
      </Modal>
    </>
  );
};

export default EmailsPage;
