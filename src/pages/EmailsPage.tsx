import styled from "styled-components";
import bg from "../assets/img/bg.png";
import { ClientsEditor, EmailEditor, PostsCard } from "../views";
import { Title } from "../components/Title";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useAllPosts,
  useGoogleNews,
  useOtherPosts,
  usePostsActions,
  usePostsState,
} from "../store/posts/hooks";
import { useMemo } from "react";
import { FilterClient, IPost } from "../store/posts/types";
import { colors } from "../assets/styles/colors";
import {
  IPostCardClient,
  useClientsActions,
  useClientsState,
} from "../store/clients";
import { MainButton } from "../components/MainButton";
import KeywordEditor from "../views/KeywordEditor";
import { useKeywordsActions } from "../store/keywords/hooks";
import { Button } from "../components/Button";
import { useUserState } from "../store/user/hooks";
import { Preloader } from "../components/Preloader";

const Emails = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 70px;
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
  flex-grow: 1;
  padding: 28px 20px 50px;
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
    height: 550px;
    overflow-y: auto;
  }
`;

const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`;

const Clients = styled.div`
  display: flex;
  justify-content: space-between;
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

const Filter = styled.p`
  position: absolute;
  margin-inline-start: 30px;
`;

const FilterClearBtn = styled(Button)`
  display: inline-flex;
  margin-inline-start: 10px;
  cursor: pointer;
`;

const NewPostsBtn = styled(MainButton)`
  display: block;
  margin: 30px auto;
`;

type ModalType = null | "email-editor" | "client-editor" | "keyword-editor";

const EmailsPage = () => {
  const { t } = useTranslation();
  const otherPosts = useOtherPosts();
  const googleNews = useGoogleNews();
  const { editorPost, newPostsAvailable, isFetching } = usePostsState();
  const { clients } = useClientsState();
  const { onGetClients } = useClientsActions();
  const { token } = useUserState();
  // Fetch posts
  const { onGetPosts, onWatchForPosts, onSetEditor } = usePostsActions();
  const { onGetKeywords } = useKeywordsActions();
  useEffect(() => {
    onGetPosts();
    onGetClients();
    onGetKeywords();
  }, []);
  useEffect(() => {
    if (token) onWatchForPosts(token);
  }, [token]);

  const [modal, setModal] = useState<ModalType>(null);
  const [clientsFilter, setClientsFilter] = useState<FilterClient | null>(null);

  const onCloseModal = () => {
    setModal(null);
    onSetEditor(null);
  };

  const otherPostsFiltered: IPost[] = useMemo(() => {
    return otherPosts.filter((post) => {
      if (clientsFilter && !post.clients) return false;
      if (clientsFilter && post.clients) {
        return post.clients.some(
          (client: IPostCardClient) => client.id === clientsFilter.id
        );
      }
      if (!clientsFilter) return true;
    });
  }, [otherPosts, clientsFilter]);

  const googleNewsFiltered: IPost[] = useMemo(() => {
    return googleNews.filter((post) => {
      if (clientsFilter && !post.clients) return false;
      if (clientsFilter && post.clients) {
        return post.clients.some(
          (client: IPostCardClient) => client.id === clientsFilter.id
        );
      }
      if (!clientsFilter) return true;
    });
  }, [googleNews, clientsFilter]);

  // Handle click on 'next' button
  const onNextPost = (post: IPost) => {
    if (
      post._sender !== "google_news" &&
      typeof post._column_index === "number"
    ) {
      const index = post._column_index + 1;
      if (otherPostsFiltered[index]) {
        onSetEditor({ ...otherPostsFiltered[index], _column_index: index });
      }
      if (!otherPostsFiltered[index]) {
        onSetEditor(null);
        setModal(null);
      }
    }
    if (
      post._sender === "google_news" &&
      typeof post._column_index === "number"
    ) {
      const index = post._column_index + 1;
      if (googleNewsFiltered[index]) {
        onSetEditor({ ...googleNewsFiltered[index], _column_index: index });
      }
      if (!googleNewsFiltered[index]) {
        onSetEditor(null);
        setModal(null);
      }
    }
  };

  //Handle on client click in cards
  const handleSelectClient = (client: FilterClient) => {
    if (client.id === clientsFilter?.id) setClientsFilter(null);
    if (client.id !== clientsFilter?.id) setClientsFilter(client);
  };

  return (
    <>
      <Emails>
        {clientsFilter && (
          <Filter>
            {t("emails_selected-filter")} {clientsFilter.client}{" "}
            <FilterClearBtn type="clear" onClick={() => setClientsFilter(null)}>
              {t("emails_selected-clear")}
            </FilterClearBtn>
          </Filter>
        )}
        <Content>
          <div>
            <StyledTitle>{t("emails_title2")}</StyledTitle>
            <PostsContainer>
              <div>
                {isFetching && <Preloader />}
                {newPostsAvailable > 0 && !isFetching && (
                  <NewPostsBtn color="orange" onClick={() => onGetPosts()}>
                    {`${newPostsAvailable} ${t("emails_new-available")}`}
                  </NewPostsBtn>
                )}
                {otherPostsFiltered.map((post, index) => (
                  <PostsCard
                    key={index}
                    onSelectClient={handleSelectClient}
                    selectedClient={clientsFilter}
                    item={post}
                    onEmail={() =>
                      onSetEditor({ ...post, _column_index: index })
                    }
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
                {isFetching && <Preloader />}
                {newPostsAvailable > 0 && !isFetching && (
                  <NewPostsBtn color="orange" onClick={() => onGetPosts()}>
                    {`${newPostsAvailable} ${t("emails_new-available")}`}
                  </NewPostsBtn>
                )}
                {googleNewsFiltered.map((post, index) => (
                  <PostsCard
                    key={index}
                    onSelectClient={handleSelectClient}
                    selectedClient={clientsFilter}
                    item={post}
                    onEmail={() =>
                      onSetEditor({ ...post, _column_index: index })
                    }
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
          {editorPost && (
            <EmailEditor
              posts={
                editorPost._sender === "google_news"
                  ? googleNewsFiltered
                  : otherPostsFiltered
              }
              post={editorPost}
              onNext={onNextPost}
            />
          )}
        </Modal>
      )}
      {modal === "client-editor" && (
        <Modal onClose={onCloseModal}>
          <ClientsEditor onClose={onCloseModal} />
        </Modal>
      )}
      {modal === "keyword-editor" && (
        <Modal onClose={onCloseModal}>
          <KeywordEditor onClose={onCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default EmailsPage;
