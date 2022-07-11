import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { AddButton } from "../components/AddButton";
import { CreateableDropdown } from "../components/CreateableDropdown";
import {
  CreatableEditableSelectOption,
  CreatableEditableSelectValue,
} from "../components/CreateableDropdown/types";
import { MainButton } from "../components/MainButton";
import { PostKeyword } from "../components/PostKeyword";
import { TextInput } from "../components/TextInput";
import { IClient, useClientsActions, useClientsState } from "../store/clients";
import { IClientsEditor } from "./types";
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
  ${({ isLoading }) => isLoading && "& * {cursor: wait !important;"}
`;

const Content = styled.div`
  padding: 40px 30px 30px;
`;


const ClientsBox = styled.div`
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

const StyledCreateableDropdown = styled(CreateableDropdown)`
  flex-grow: 1;
`;

const StyledBtn = styled(AddButton)`
  margin-top: 22px;
  flex-shrink: 0;
`;

const Clients = styled.div`
  height: 250px;
  overflow-y: auto;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;

const Client = styled.p<{ isActive: boolean }>`
  font-family: "Gilroy-R";
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: underline;
  color: ${colors.graphite_4};
  cursor: pointer;
  transition: opacity 250ms linear;
  ${({ isActive }) =>
    isActive && `color: ${colors.orange}; &:hover { opacity: 1 !important;}`}
  &:hover {
    opacity: 0.65;
  }
`;

const StyledClient = styled(PostKeyword)<{
  isSelected: boolean;
  isLoading: boolean;
}>`
  ${({ isSelected }) => {
    return (
      isSelected &&
      `
  & > p {color: ${colors.orange}};
  &:hover > p { opacity: 1;}
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

const StyledError = styled.p`
  text-align: center;
  font-size: 17px;
  color: ${colors.red};
`

const ClientsEditor = ({ onClose }: IClientsEditor) => {
  //Global State
  const { t } = useTranslation();
  const { clients, isLoading, errorMessage } = useClientsState();
  const { onAddClient, onEditClient, onDeleteClient, onSetErrorMessage } = useClientsActions();
  //test clients
  const cl = [
    { id: 1, name: "Edward", email: "Edvaa@mail.ru" },
    { id: 2, name: "Edik", email: "Edvaa@mail.ru" },
    { id: 3, name: "Elon Musk", email: "Edvaa@mail.ru" },
    { id: 4, name: "Rihanna", email: "Edvaa@mail.ru" },
  ];

  const [currentClient, setCurrentClient] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [emails, setEmails] = useState<CreatableEditableSelectOption[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleAddClient = () => {
    setCurrentClient(null);
    const client = {
      name,
      team: "",
      email: emails.map((e) => e.value),
    };
    if (client.name && client.email && client.email.length > 0) {
      onAddClient(client);
      setName("");
      setEmails([]);
    } else {
      onSetErrorMessage(t('clients_name-email-empty'))
      setTimeout(() => {
        onSetErrorMessage(null)
      }, 5000)
    }
  };

  const handleSelectClient = (id: number) => {
    const client = clients.find((c) => c.id === id);
    let emails = client?.email
      ? client.email.map((e) => ({ value: e, label: e }))
      : [];
    setName(client?.name ? client.name : "");
    setEmails(emails);
    setCurrentClient(id);
  };

  const handleEditClient = () => {
    if (typeof currentClient === "number" && emails.length > 0) {
      const newData = {
        id: currentClient,
        name,
        team: "",
        email: emails.map((e) => e.value),
      };
      onEditClient(newData);
    }
  };

  const clientElements = useMemo(() => {
    return search
      ? clients.filter((c) => {
          const regex = new RegExp(search, "i");
          return regex.test(c.name);
        })
      : clients;
  }, [clients, search]);

  return (
    <Editor isLoading={isLoading}>
      <Content>
        <Title>{t("clients-editor_title1")}</Title>
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
        <ClientsBox>
          <StyledInput
            value={name}
            onChange={setName}
            placeholder={t("clients-editor_name-plhr")}
            label={t("clients-editor_name-label")}
          />
          <StyledCreateableDropdown
            options={[]}
            value={emails}
            onChange={setEmails}
            placeholder={t("clients-editor_email-plhr")}
            label={t("clients-editor_email-label")}
          />
          <StyledBtn onClick={handleAddClient} disabled={isLoading} />
        </ClientsBox>
        <Title>{t("clients-editor_title2")}</Title>
        <StyledInput
          value={search}
          onChange={setSearch}
          label={t("clients-editor_search-label")}
          searchBtn={true}
        />
        <Clients>
          {clientElements.map((c) => (
            <StyledClient
              isSelected={c.id === currentClient}
              isLoading={isLoading}
              onDelete={() => onDeleteClient(c.id)}
              onClick={() => handleSelectClient(c.id)}
              key={c.id}
            >
              {c.name}
            </StyledClient>
          ))}
        </Clients>
      </Content>
      <ButtonBox>
        <StyledAction
          onClick={handleEditClient}
          color="orange"
          disabled={isLoading || !currentClient}
        >
          {t("clients-editor_save")}
        </StyledAction>
        <StyledAction onClick={onClose} color="blue">
          {t("clients-editor_close")}
        </StyledAction>
      </ButtonBox>
    </Editor>
  );
};

export default ClientsEditor;
