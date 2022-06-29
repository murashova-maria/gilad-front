import { useState } from "react";
import styled from "styled-components";
import { CreateableDropdown } from "../components/CreateableDropdown";
import {
  CreatableEditableSelectOption,
  CreatableEditableSelectValue,
} from "../components/CreateableDropdown/types";
import { TextInput } from "../components/TextInput";

const Editor = styled.div`
  border-radius: 20px;
  width: 80%;
  max-width: 1200px;
  background-color: #fff;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgb(0 0 0 / 5%);
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
  padding: 0 30px 50px;
`;

const StyledInput = styled(TextInput)`
  & input {
    text-decoration: underline;
    padding: 10px 20px;
  }
`;

const StyledCreateableDropdown = styled(CreateableDropdown)`
  flex-grow: 1;
`;

const ClientsEditor = () => {
  //#ClientName Input
  const [name, setName] = useState<string>("");
  //#Emails Input
  const [emails, setEmails] = useState<CreatableEditableSelectOption[]>([]);

  const handleChange = (value: CreatableEditableSelectOption[]) => {
    setEmails(value)
    console.log(value)
  }
  return (
    <Editor>
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
          onChange={handleChange}
          placeholder="Add emails"
          label="Client mails"
        />
      </ClientsBox>
    </Editor>
  );
};

export default ClientsEditor;
