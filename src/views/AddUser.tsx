import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { AddButton } from "../components/AddButton";
import { ButtonBox } from "../components/ButtonBox";
import { Checkbox } from "../components/Checkbox";
import { Dropdown } from "../components/Dropdown";
import { MainButton } from "../components/MainButton";
import { PostKeyword } from "../components/PostKeyword";
import { TextInput } from "../components/TextInput";
import { Title } from "../components/Title";
import { ModalType } from "../pages/EmailsPage";
import { useClientsState } from "../store/clients";
import { user } from "../store/user";
import { IEditUser, IUser, useUsersActions, useUsersState } from "../store/users";

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

const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`;

const UserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
`;

const Users = styled.div`
  height: 250px;
  padding: 10px;
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

const StyledClear = styled(MainButton)`
  padding: 11px 0;
  text-align: center;
  width: 150px;
  margin-inline-start: auto;
  align-self: flex-end;
  margin-inline-end: 15px ;
`;

const StyledAction = styled(MainButton)`
  padding: 11px 0;
  text-align: center;
  width: 150px;
`;

const StyledInput = styled(TextInput)`
  width: 48.5%;
  & input {
    padding: 8px 15px;
  }
`;

const StyledCheckbox = styled.label`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const CheckboxLabel = styled.p`
  font-family: "Gilroy-R", sans-serif;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.graphite_6};
`;

const StyledAddBtn = styled(AddButton)`
  margin-inline-start: auto;
`;

const StyledSearch = styled(TextInput)`
  width: 100%;
  & input {
    padding: 8px 15px;
  }
`;

const StyledErrorMessage = styled.p`
  flex-grow: 1;
  text-align: center;
  padding: 0 40px;
  color: red;
`;

interface IProps {
  onClose: () => void;
}

const AddUser = ({ onClose }: IProps) => {
  const { t } = useTranslation();
  const { users, errorMessage, isFetching, selectedUserId } = useUsersState();
  const { clients } = useClientsState();
  const { onAddUser, onDeleteUser, onSelectUser, onSetErrMessage, onEditUser } =
    useUsersActions();
  //inputs
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [staff, setStaff] = useState<boolean>(false);
  const [selectedClients, setSelectedClients] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const regex = new RegExp(search, "i");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      login,
      password,
      email,
      is_staff: staff,
      is_active: active,
      clients: selectedClients ? selectedClients.split(", ").map((c) => parseInt(c, 10)) : [],
    };
    onAddUser(data);
  };

  const handleDelete = (id: number) => {
    if (!isFetching) onDeleteUser(id);
  };

  const handleClear = () => {
    onSelectUser(null)
    setLogin('')
    setPassword('')
    setEmail('')
    setActive(true)
    setStaff(false)
    setSelectedClients('')
  }

  const handleEdit = () => {
    let data: IEditUser = {
      login,
      email,
      is_staff: staff,
      is_active: active,
      clients:  selectedClients ? selectedClients.split(", ").map((c) => parseInt(c, 10)) : [],
    }
    if (password) data.password = password
    onEditUser(data)
  }

  //Fill inputs after user selecting
  useEffect(() => {
    const selectedUser = users.find((u) => u.id === selectedUserId);
    if (selectedUser) {
      setLogin(selectedUser.login);
      setEmail(selectedUser.email);
      setSelectedClients(selectedUser.clients.map((c) => c.id).join(", "));
    }
  }, [selectedUserId]);

  //Clear err message after a try or user change
  useEffect(() => {
    onSetErrMessage(null);
  }, [selectedUserId, users]);

  const usersFiltered = useMemo(() => {
    return search ? users.filter((u) => regex.test(u.login)) : users;
  }, [search, regex, users]);

  return (
    <Editor isLoading={false}>
      <Content>
        <StyledTitle>{t("add-user_title1")}</StyledTitle>
        <UserForm onSubmit={(e) => handleSubmit(e)}>
          <StyledInput
            value={login}
            onChange={setLogin}
            label={t("add-user_login")}
          />
          <StyledInput
            value={password}
            onChange={setPassword}
            label={t("add-user_password")}
          />
          <StyledInput
            value={email}
            onChange={setEmail}
            label={t("add-user_email")}
          />
          <StyledClear onClick={handleClear} color="blue" type="reset">
            Clear
          </StyledClear>
          <Dropdown
            value={selectedClients}
            label="Clients"
            isMultiSelect={true}
            onSelect={(e) => setSelectedClients(e)}
            options={clients.map((c) => ({ item: c.name, value: c.id }))}
          />

          <div>
            <StyledCheckbox>
              <Checkbox
                checked={active}
                setIsCheckedCreate={(val) => setActive(val)}
              />
              <CheckboxLabel>{t("add-user_active")}</CheckboxLabel>
            </StyledCheckbox>
            <StyledCheckbox>
              <Checkbox
                checked={staff}
                setIsCheckedCreate={(val) => setStaff(val)}
              />
              <CheckboxLabel>{t("add-user_staff")}</CheckboxLabel>
            </StyledCheckbox>
          </div>
          {errorMessage && (
            <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
          )}
          <StyledAddBtn disabled={isFetching} />
        </UserForm>

        <StyledTitle>{t("add-user_title2")}</StyledTitle>
        <StyledSearch
          value={search}
          onChange={setSearch}
          label={t("add-user_search")}
          searchBtn={true}
        />
        <Users>
          {usersFiltered.map((u: IUser) => (
            <StyledKeyword
              isSelected={selectedUserId === u.id}
              onDelete={() => handleDelete(u.id)}
              isLoading={isFetching}
              onClick={() => onSelectUser(u.id)}
              key={u.id}
            >
              {u.login}
            </StyledKeyword>
          ))}
        </Users>
      </Content>
      <ButtonBox>
        <StyledAction onClick={onClose} color="blue">
          {t("add-user_close")}
        </StyledAction>
        <StyledAction onClick={handleEdit} color="orange" disabled={isFetching || selectedUserId === null}>
          {t("add-user_save")}
        </StyledAction>
      </ButtonBox>
    </Editor>
  );
};

export default AddUser;
