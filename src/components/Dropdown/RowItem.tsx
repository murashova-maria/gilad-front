import React, {ReactNode} from 'react';
import styled from "styled-components";
import {colors} from "../../assets/styles/colors";

interface RowItemProps {
    item: string | ReactNode
    isSelected: boolean;
    isActive: boolean;
    value: string | number;
    onSelect?: (value: string | number) => void;
    onShow?: () => void,
    isSmall: boolean,
    isMultiSelect?: boolean
}

const RowItemStyled = styled.div<{isActive: boolean, isSelected: boolean, isSmall: boolean, isMultiSelect?: boolean}>`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  background: ${({isSelected}) => isSelected ? colors.graphite_3 : colors.white};
  border: 1px solid ${colors.graphite_1};
  box-sizing: border-box;
  box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.05);
  border-radius: 125px;
  transition: all .25s ease;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  word-break: break-word;
  min-height: 40px;
  color: ${({isSelected}) => isSelected ? colors.white : colors.graphite_5};
  padding:${({isSmall}) => isSmall ? ' 4px 12px' : ' 8px 17px'};
  cursor: ${({isSelected, isMultiSelect}) => (isSelected && !isMultiSelect) ? 'not-allowed' : 'pointer'};
  &:hover {
    background-color: ${({isSelected}) => isSelected ? colors.graphite_3 : colors.graphite_1};
  }
`

RowItemStyled.defaultProps = {
    isSmall: false
}

function RowItem({item, value, onSelect, isSelected, isActive, onShow, isSmall, isMultiSelect}: RowItemProps) {

    return (
        <RowItemStyled isSmall={isSmall} isActive={isActive} isSelected={isSelected} isMultiSelect={isMultiSelect} onClick={() => {
            if (onSelect && (!isSelected || isMultiSelect)) {
                onSelect(value)
            } else if (onShow) {
                onShow()
            }
        }}>
            {item}
        </RowItemStyled>
    );
}

export default RowItem;