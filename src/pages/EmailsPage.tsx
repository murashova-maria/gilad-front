import styled from "styled-components";
import bg from "../assets/img/bg.png";
import { ClientsEditor, EmailEditor, PostsCard } from "../views";
import { Title } from "../components/Title";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePostsActions, usePostsState } from "../store/posts/hooks";
import { useMemo } from "react";
import { IPost } from "../store/posts/types";
import { colors } from "../assets/styles/colors";
import { useClientsActions, useClientsState } from "../store/clients";
import { MainButton } from "../components/MainButton";
import KeywordEditor from "../views/KeywordEditor";

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
  min-width: 600px;
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

const Clients = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: red;
  padding: 30px 70px;
  background: #ffffff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);
`;

const ClientsTitle = styled.h2`
  font-family: "Gilroy-B";
  font-size: 24px;
  line-height: 30px;
  & > span {
    font-size: 28px;
    color: ${colors.orange};
    text-decoration: underline;
  }
`;

const ClientsBox = styled.div`
  display: flex;
  gap: 10px;
`;

type ModalType = null | "email-editor" | "client-editor" | "keyword-editor";

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
  const { clients } = useClientsState();
  const { onGetClients } = useClientsActions();
  // Fetch posts
  const { onGetPosts, onWatchForPosts, onCloseWebSocket, onSetEditor } =
    usePostsActions();
  useEffect(() => {
    onGetClients();
    onWatchForPosts();
    onGetPosts();
  }, []);

  const [modal, setModal] = useState<ModalType>(null);

  const onCloseModal = () => {
    setModal(null);
    onSetEditor(null);
  };

  const otherPosts: IPost[] = useMemo(() => {
    const all = [
      ...newPosts.filter((post) => post._sender !== "google_news"),
      ...govils,
      ...news,
      ...agendas,
      ...googleNews,
      ...committees,
      ...plenums,
      ...queries,
      ...bills,
      ...govStatistics,
      ...govilData,
      ...govilPdf,
      ...releases,
    ];

    return all.sort(
      (prev, next) => next.date_for_sorting - prev.date_for_sorting
    );
  }, [
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
  ]);

  const allGoogleNews: IPost[] = useMemo(() => {
    const all = [
      ...newPosts.filter((post) => post._sender === "google_news"),
      ...googleNews,
    ];
    return all.sort(
      (prev, next) => next.date_for_sorting - prev.date_for_sorting
    );
  }, [googleNews, newPosts]);

  // Handle click on 'next' button
  const onNextPost = (post: IPost) => {
    if (post._sender !== "google_news") {
      const index = otherPosts.indexOf(post);
      onSetEditor(otherPosts[index + 1] ? otherPosts[index + 1] : null);
    }
    if (post._sender === "google_news") {
      const index = allGoogleNews.indexOf(post);
      onSetEditor(allGoogleNews[index + 1] ? otherPosts[index + 1] : null);
    }
  };

  return (
    <>
      <Emails>
        <Content>
          <div>
            <StyledTitle>{t("emails_title2")}</StyledTitle>
            <PostsContainer>
              <div>
                {otherPosts.map((post, index) => (
                  <PostsCard
                    key={index}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    onOpenModal={() => setModal("email-editor")}
                  />
                ))}
              </div>
            </PostsContainer>
          </div>

          <div>
            <StyledTitle>{t("emails_title1")}</StyledTitle>
            <PostsContainer>
              <div>
                {allGoogleNews.map((post, index) => (
                  <PostsCard
                    key={index}
                    item={post}
                    onEmail={() => onSetEditor(post)}
                    onOpenModal={() => setModal("email-editor")}
                  />
                ))}
              </div>
            </PostsContainer>
          </div>
        </Content>
        <Clients>
          <ClientsTitle>
            {t("clients_title1")} <span>{clients.length}</span>{" "}
            {t("clients_title2")}
          </ClientsTitle>
          <ClientsBox>
            <MainButton color="blue" onClick={() => setModal("keyword-editor")}>
              {t("clients_edit-keywords")}
            </MainButton>
            <MainButton
              color="orange"
              onClick={() => setModal("client-editor")}
            >
              {t("clients_edit-clients")}
            </MainButton>
          </ClientsBox>
        </Clients>
      </Emails>
      {modal === "email-editor" && (
        <Modal onClose={onCloseModal}>
          {editorPost && <EmailEditor post={editorPost} onNext={onNextPost} />}
        </Modal>
      )}
      {modal === "client-editor" && (
        <Modal onClose={onCloseModal}>
          <ClientsEditor />
        </Modal>
      )}
      {modal === "keyword-editor" && (
        <Modal onClose={onCloseModal}>
          <KeywordEditor />
        </Modal>
      )}
    </>
  );
};

export default EmailsPage;
