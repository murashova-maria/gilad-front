import { IProps } from "./types";
import styled from "styled-components";
import { colors } from "../../assets/styles/colors";
import closePic from "../../assets/svg/keyword-del.svg";

const Keyword = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 5px 4px 7px;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 13px;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.graphite_6};
  cursor: pointer;
  transition: 250ms linear;
  &:hover {opacity: .65;}
`;

const Pic = styled.img`
  height: 14px;
  width: 14px;
  object-fit: contain;
  object-position: center;
`;

const PostKeyword = ({ children, onClick, onDelete, className }: IProps) => {
  return (
    <Keyword className={className}>
      <p onClick={onClick}>{children}</p>
      <Pic onClick={onDelete} src={closePic} />
    </Keyword>
  );
};

export default PostKeyword;
