import { IKeywordEditor } from "./types";
import { useState } from "react";
import styled from "styled-components";
import { TextInput } from "../components/TextInput";
import { Dropdown } from "../components/Dropdown";
import { AddButton } from "../components/AddButton";
import { colors } from "../assets/styles/colors";
import { MainButton } from "../components/MainButton";
import { useTranslation } from "react-i18next";

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
  margin-bottom: 10px;
`;

const KeywordsBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
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

const Keyword = styled.p`
padding: 3px 10px;
background: #FFFFFF;
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
border-radius: 13px;
font-family: 'Gilroy-R';
font-weight: 400;
font-size: 14px;
line-height: 17px;
text-decoration-line: underline;
color: ${colors.graphite_6};
cursor: pointer;
transition: opacity 250ms linear;
&:hover {
    opacity: .60;
}`

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

const KeywordEditor = ({ onClose }: IKeywordEditor) => {
    const {t} = useTranslation()
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState('');
  return (
    <Editor>
      <Content>
        <Title>{t('keyword-editor_title1')}</Title>
        <KeywordsBox>
          <StyledInput
            value={keyword}
            onChange={(val) => setKeyword(val)}
            placeholder={t('keyword-editor_keyword-plhr')}
            label={t('keyword-editor_keyword-label')}
          />
          <Dropdown
            value=""
            onSelect={(e) => console.log(e)}
            options={[
              { item: "213", value: 123 },
              { item: "213", value: 121 },
              { item: "213", value: 122 },
            ]}
            isMultiSelect={true}
            placeholder={t('keyword-editor_clients-plhr')}
            label={t('keyword-editor_clients-label')}
          />
          <StyledBtn onClick={() => console.log("clicked")} />
        </KeywordsBox>
        <Title>{t('keyword-editor_title2')}</Title>
        <StyledInput
          value={search}
          onChange={(val) => setSearch(val)}
          label={t('keyword-editor_search')}
          searchBtn={true}
        />
        <Keywords>
            <Keyword>Gillette</Keyword>
            <Keyword>Gillette</Keyword>
            <Keyword>Gillette</Keyword>
            <Keyword>Gillette</Keyword>
            <Keyword>Gillette</Keyword>
            <Keyword>Gillette</Keyword>
            <Keyword>Gillette</Keyword>
            <Keyword>Gillette</Keyword>
        </Keywords>
      </Content>
      <Buttons>
        <StyledAction onClick={() => console.log("save")} color="orange">
          {t('keyword-editor_save')}
        </StyledAction>
        <StyledAction onClick={onClose} color="blue">
        {t('keyword-editor_close')}
        </StyledAction>
      </Buttons>
    </Editor>
  );
};

export default KeywordEditor;
