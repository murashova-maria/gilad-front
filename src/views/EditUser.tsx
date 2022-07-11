import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { ButtonBox } from "../components/ButtonBox";
import { Checkbox } from "../components/Checkbox";
import { Dropdown } from "../components/Dropdown";
import { MainButton } from "../components/MainButton";
import { Title } from "../components/Title";
import { selectCheckbox } from "../utilites/selectCheckbox";

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

const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`;

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 50px;
`;

const StyledClients = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ClientBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin: 0 10px 15px 0;
`;

const ClientBlock = styled(ClientBox)`
  display: flex;
`;

const ClientName = styled.p`
  font-family: "Gilroy-R", sans-serif;
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: underline;
  color: ${colors.graphite_4};
`;

const StyledAction = styled(MainButton)`
  padding: 11px 0;
  text-align: center;
  width: 150px;
`;


const Users = [
  { item: "", value: 0 },
  { item: "First user", value: 1 },
  { item: "Second user", value: 2 },
  { item: "Third user", value: 3 },
  { item: "Fourth user", value: 4 },
  { item: "Fifth user", value: 5 },
];

const Clients = [
  { client: "first", id: 0 },
  { client: "second", id: 1 },
  { client: "third", id: 2 },
  { client: "fourth", id: 3 },
  { client: "fifth", id: 4 },
];

const NewClients = [
  { client: "first", id: 0 },
  { client: "second", id: 1 },
  { client: "third", id: 2 },
  { client: "fourth", id: 3 },
  { client: "fifth", id: 4 },
];

interface IProps {
  onClose: () => void;
}

const EditUser = ({onClose}: IProps) => {
  const {t} = useTranslation()
  const [user, setUser] = useState<number>(0);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [selectedNewClients, setSelectedNewClients] = useState<number[]>([]);


  const handleSelectAll = () => {
    if (selectedNewClients.length === NewClients.length) {
      setSelectedNewClients([])
    }
    if (selectedNewClients.length !== NewClients.length) {
      setSelectedNewClients(NewClients.map(c => c.id))
    }
  }

  return (
    <Editor>
      <Content>
        <StyledTitle>{t('edit-user_title1')}</StyledTitle>
        <StyledDropdown
          onSelect={(val) => setUser(val)}
          label={t('edit-user_users')}
          value={user}
          options={Users}
        />
        <StyledTitle>{t('edit-user_title2')}</StyledTitle>
        <StyledClients>
          {Clients.map((client: any) => {
            return (
              <ClientBox key={client.id}>
                <Checkbox
                  checked={selectedClients.includes(client.id)}
                  setIsCheckedCreate={() =>
                    setSelectedClients(
                      selectCheckbox(client.id, selectedClients)
                    )
                  }
                />
                <ClientName>{client.client}</ClientName>
              </ClientBox>
            );
          })}
        </StyledClients>
        <StyledTitle>{t('edit-user_title3')}</StyledTitle>
        <ClientBlock>
          <Checkbox
            checked={NewClients.length === selectedNewClients.length}
            setIsCheckedCreate={handleSelectAll}
          />
          <ClientName>Select all</ClientName>
        </ClientBlock>
        <StyledClients>
          {NewClients.map((client: any) => {
            return (
              <ClientBox key={client.id}>
                <Checkbox
                  checked={selectedNewClients.includes(client.id)}
                  setIsCheckedCreate={() =>
                    setSelectedNewClients(
                      selectCheckbox(client.id, selectedNewClients)
                    )
                  }
                />
                <ClientName>{client.client}</ClientName>
              </ClientBox>
            );
          })}
        </StyledClients>
      </Content>
      <ButtonBox>
        <StyledAction onClick={() => console.log("save")} color="orange">
          {t("edit-user_save")}
        </StyledAction>
        <StyledAction onClick={onClose} color="blue">
          {t("edit-user_close")}
        </StyledAction>
      </ButtonBox>
    </Editor>
  );
};

export default EditUser;
