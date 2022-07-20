import { IKeywordEditor } from "./types";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { TextInput } from "../components/TextInput";
import { Dropdown } from "../components/Dropdown";
import { AddButton } from "../components/AddButton";
import { colors } from "../assets/styles/colors";
import { MainButton } from "../components/MainButton";
import { useTranslation } from "react-i18next";
import { useKeywordsActions, useKeywordsState } from "../store/keywords/hooks";
import { useClientsState } from "../store/clients";
import { IEditKeyword } from "../store/keywords";
import { PostKeyword } from "../components/PostKeyword";
import { Title } from "../components/Title";
import { ButtonBox } from "../components/ButtonBox";

const Editor = styled.div<{ isLoading: boolean }>`
  border-radius: 20px;
  width: 80%;
  max-width: 1200px;
  background-color: #fff;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgb(0 0 0 / 5%);
  overflow: hidden;
  ${({ isLoading }) => isLoading && "& * {cursor: wait !important;}"}
`;

const Content = styled.div`
  padding: 40px 30px 30px;
`;


const KeywordsBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const StyledInput = styled(TextInput)`
  margin-bottom: 20px;
  & input {
    padding: 10px 20px;
  }
  & input::placeholder {
    text-decoration: underline;
  }
`;

const StyledBtn = styled(AddButton)`
  margin-top: 22px;
  flex-shrink: 0;
`;

const Keywords = styled.div`
  height: 250px;
  overflow-y: auto;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledKeyword = styled(PostKeyword)<{
  isSelected: boolean;
  isLoading: boolean;
}>`
  ${({ isSelected }) => {
    return (
      isSelected &&
      `
    & p {color: ${colors.orange}};
    &:hover p { opacity: 1;}
  `
    );
  }}
  ${({ isLoading }) => isLoading && "cursor: wait;"}
`;

const StyledAction = styled(MainButton)`
  padding: 11px 0;
  text-align: center;
  width: 150px;
`;

const KeywordEditor = ({ onClose }: IKeywordEditor) => {
  const { t } = useTranslation();
  const { keywords, isLoading, selectedKeyword } = useKeywordsState();
  const {
    onAddKeyword,
    onSelectKeyword,
    onDeselectKeyword,
    onEditKeyword,
    onDeleteKeyword,
  } = useKeywordsActions();
  const { clients } = useClientsState();
  const [selectedClients, setSelectedClients] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");

  //Add new keyword in DB
  const handleAdd = () => {
    let clients: string[] = selectedClients.split(", ");
    let clientsData: number[] = [];
    if (clients.length > 0 && clients[0])
      clientsData = clients.map((c) => parseInt(c, 10));
    const data = {
      keyword,
      clients: clientsData,
    };
    onAddKeyword(data);
  };

  //Fetch selected keyword with clients
  const handleSelect = (id: number) => {
    if (!isLoading) onSelectKeyword(id);
  };

  //Set fields for editing keyword
  useEffect(() => {
    if (selectedKeyword) {
      setKeyword(selectedKeyword.keyword);
      const clientsList = selectedKeyword.clients.map((c) => c.id).join(", ");
      setSelectedClients(clientsList);
    }
  }, [selectedKeyword]);

  //Close modal and deselect keyword
  const handleClose = () => {
    onDeselectKeyword();
    onClose();
  };

  //Clear selected post on unmount
  useEffect(() => {
    return onDeselectKeyword;
  }, []);

  //Edit Selected keyword in DB
  const handleSave = () => {
    if (selectedKeyword) {
      let clients: any = selectedClients.split(", ");
      if (!clients[0]) clients = [];
      clients = clients.map((id: string) => parseInt(id, 10));
      const data: IEditKeyword = {
        id: selectedKeyword?.id,
        keyword,
        clients,
      };
      onEditKeyword(data);
    }
  };

  const keywordElements = useMemo(() => {
    return search
      ? keywords.filter((c) => {
          const regex = new RegExp(search, "i");
          return regex.test(c.keyword);
        })
      : keywords;
  }, [keywords, search]);

  return (
    <Editor isLoading={isLoading}>
      <Content>
        <Title>{t("keyword-editor_title1")}</Title>
        <KeywordsBox>
          <StyledInput
            value={keyword}
            onChange={setKeyword}
            placeholder={t("keyword-editor_keyword-plhr")}
            label={t("keyword-editor_keyword-label")}
          />
          <Dropdown
            value={selectedClients}
            onSelect={setSelectedClients}
            options={clients.map((c) => ({ item: c.name, value: c.id }))}
            isMultiSelect={true}
            placeholder={t("keyword-editor_clients-plhr")}
            label={t("keyword-editor_clients-label")}
          />
          <StyledBtn onClick={handleAdd} disabled={isLoading} />
        </KeywordsBox>
        <Title>{t("keyword-editor_title2")}</Title>
        <StyledInput
          value={search}
          onChange={setSearch}
          label={t("keyword-editor_search")}
          searchBtn={true}
        />
        <Keywords>
          {keywordElements.map((k) => (
            <StyledKeyword
              isSelected={selectedKeyword?.id === k.id}
              onDelete={() => onDeleteKeyword(k.id)}
              isLoading={isLoading}
              onClick={() => handleSelect(k.id)}
              key={k.id}
            >
              {k.keyword}
            </StyledKeyword>
          ))}
        </Keywords>
      </Content>
      <ButtonBox>
        <StyledAction
          onClick={handleSave}
          color="orange"
          disabled={isLoading || !selectedKeyword}
        >
          {t("keyword-editor_save")}
        </StyledAction>
        <StyledAction onClick={handleClose} color="blue">
          {t("keyword-editor_close")}
        </StyledAction>
      </ButtonBox>
    </Editor>
  );
};

export default KeywordEditor;
