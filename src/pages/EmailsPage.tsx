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
  const [showEditModel, setShowEditModel] = useState(false)
  const {posts, googleNews} = usePostsState()

  // Fetch posts
  const {onGetPosts} = usePostsActions()
  useEffect(() => {
    onGetPosts()
  }, [])

  return (
    <>
      <Emails>
        <Content>
          <div>
            <StyledTitle>{t('emails_title2')}</StyledTitle>
            {posts.map(post => <PostsCard item={post} onEmail={()=> setShowEditModel(true)} />)}
            
          </div>
          <div>
            <StyledTitle>{t('emails_title1')}</StyledTitle>
            {googleNews.map(post => <PostsCard item={post} onEmail={()=> setShowEditModel(true)} />)}

          </div>
        </Content>
      </Emails>
      <Modal show={showEditModel} onClose={() => setShowEditModel(false)}>
        <EditModel />
      </Modal>
    </>
  );
};

export default EmailsPage;
