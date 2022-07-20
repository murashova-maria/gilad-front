import styled from "styled-components";
import { ITextInput } from "./types";
import { colors } from "../../assets/styles/colors";
import searchIco from '../../assets/svg/input-search.svg'

const Wrapper = styled.div`
`;

const Label = styled.label`
  margin-inline-start: 20px;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.graphite_5};
`;
const Box = styled.div`
  position: relative;
`;

const SearchIco = styled.img`
  top: 50%;
  right: 19px;
  position: absolute;
  height: 16px;
  width: 16px;
  transform: translateY(-50%);
`;

const Input = styled.input<{searchBtn: boolean | undefined}>`
  display: block;
  background: white;
  border: 1px solid #d0d9de;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 5%) 0px 4px 15px inset;
  border-radius: 125px;
  padding: 19px 20px;
  ${({searchBtn}) => searchBtn ? 'padding-inline-start: 35px !important;' : ''}
  width: 100%;
  transition: all 0.25s ease 0s;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #455b66;
  margin-top: 5px;
`;

const TextInput = ({
  value,
  onChange,
  placeholder,
  label,
  className,
  searchBtn,
}: ITextInput) => {
  return (
    <Wrapper className={className}>
      {label && <Label>{label}</Label>}
      <Box>
        {searchBtn && <SearchIco src={searchIco} />}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ? placeholder : ""}
          type="text"
          searchBtn={searchBtn}
        />
      </Box>
    </Wrapper>
  );
};

export default TextInput;
