import { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { AddButton } from "../components/AddButton";
import { CreateableDropdown } from "../components/CreateableDropdown";
import {
  CreatableEditableSelectOption,
  CreatableEditableSelectValue,
} from "../components/CreateableDropdown/types";
import { MainButton } from "../components/MainButton";
import { TextInput } from "../components/TextInput";
import { IClientsEditor } from "./types";

const Editor = styled.div`
  border-radius: 20px;
  width: 80%;
  max-width: 1200px;
  background-color: #fff;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgb(0 0 0 / 5%);
  overflow: hidden;
`;

const Content = styled.div`
  padding: 40px 30px 30px;
`;

const Title = styled.h2`
  text-align: center;
  font-family: "Gilroy-B";
  font-size: 36px;
  line-height: 45px;
  color: #253238;
  margin: 40px 0 10px;
`;

const ClientsBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 0 0 50px;
`;

const StyledInput = styled(TextInput)<{ searchBtn?: boolean }>`
  margin-bottom: 20px;
  & input {
    padding: 10px 20px;
    ${({ searchBtn }) => (searchBtn ? "padding-inline-start: 35px;" : "")}
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
`;

const Clients = styled.div`
  height: 250px;
  overflow-y: auto;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;

const Client = styled.p`
  font-family: "Gilroy-R";
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: underline;
  color: ${colors.graphite_4};
  cursor: pointer;
  transition: opacity 250ms linear;
  &:hover {
    opacity: 0.65;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
  background: #ffffff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);
`;

const StyledAction = styled(MainButton)`
  padding: 11px 0;
  text-align: center;
  width: 150px;
`;

const ClientsEditor = ({onClose}: IClientsEditor) => {
  //#ClientName Input
  const [name, setName] = useState<string>("");
  //#Emails Input
  const [emails, setEmails] = useState<CreatableEditableSelectOption[]>([]);
  //Client Search Input
  const [search, setSearch] = useState<string>("");

  return (
    <Editor>
      <Content>
        <Title>Edit clients</Title>
        <ClientsBox>
          <StyledInput
            value={name}
            onChange={(val) => setName(val)}
            placeholder="Client Name"
            label="Add new client"
          />
          <StyledCreateableDropdown
            options={[]}
            value={emails}
            onChange={setEmails}
            placeholder="Add emails"
            label="Client mails"
          />
          <StyledBtn onClick={() => console.log("clicked")} />
        </ClientsBox>
        <Title>Clients</Title>
        <StyledInput
          value={search}
          onChange={(val) => setSearch(val)}
          label="Search client"
          searchBtn={true}
        />
        <Clients>
          <Client>Client Name 1</Client>
          <Client>Client Name 2</Client>
          <Client>Client Name 3</Client>
          <Client>Client Name 4</Client>
          <Client>Client Name 5</Client>
          <Client>Client Name 6</Client>
          <Client>Client Name 7</Client>
          <Client>Client Name 8</Client>
          <Client>Client Name 9</Client>
          <Client>Client Name 10</Client>
          <Client>Client Name 1</Client>
          <Client>Client Name 2</Client>
          <Client>Client Name 3</Client>
          <Client>Client Name 4</Client>
          <Client>Client Name 5</Client>
          <Client>Client Name 6</Client>
          <Client>Client Name 7</Client>
          <Client>Client Name 8</Client>
          <Client>Client Name 9</Client>
          <Client>Client Name 10</Client>
        </Clients>
      </Content>
      <Buttons>
        <StyledAction onClick={() => console.log("save")} color="orange">
          Save
        </StyledAction>
        <StyledAction onClick={onClose} color="blue">
          Close
        </StyledAction>
      </Buttons>
    </Editor>
  );
};

export default ClientsEditor;
