import React, { useCallback, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { CreatableEditableSelectValue, Props } from "./types";
import styled from "styled-components";
import { colors } from "../../assets/styles/colors";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const LabelStyled = styled.label`
  margin-inline-start: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.graphite_5};
`;


const CreateableDropdown: React.FC<Props> = ({
  options,
  value: propValue,
  onChange,
  className,
  placeholder,
  label
}) => {
  const [editingValue, setEditingValue] = useState<string>();

  const handleChange = useCallback(
    (newValue: CreatableEditableSelectValue[]) => {
      onChange(newValue);
    },
    [onChange]
  );

  const handleEditChange = useCallback(
    (inputValue: string, data: CreatableEditableSelectValue) => {
      const idx = propValue.findIndex((v) => v.value === data.value);
      const newValue = [...propValue];

      if (inputValue.length === 0) {
        newValue.splice(idx, 1);
      } else {
        newValue[idx] = {
          label: inputValue,
          value: inputValue,
        };
      }

      onChange(newValue);

      setEditingValue(undefined);
    },
    [propValue, onChange]
  );

  const MultiValueLabel = useCallback(
    ({ data }: { data: CreatableEditableSelectValue }) => {
      if (editingValue && editingValue === data.value) {
        return (
          <input
            type="text"
            defaultValue={data.value}
            onKeyDown={(ev) => {
              ev.stopPropagation();
              if (ev.key === "Enter") {
                handleEditChange(ev.currentTarget.value, data);
              }
            }}
            onBlur={(ev) => {
              handleEditChange(ev.currentTarget.value, data);
            }}
            autoFocus
          />
        );
      }
      return (
        <button
          onClick={() => {
            setEditingValue(data.value);
          }}
        >
          {data.value}
        </button>
      );
    },
    [handleEditChange, editingValue]
  );

  return (
    <Wrapper className={className}>
        {label && <LabelStyled>{label}</LabelStyled>}
      <CreatableSelect
        isMulti
        //styles={customStyles}
        placeholder={placeholder}
        className="createable"
        classNamePrefix="createable"
        isClearable={false}
        value={propValue}
        //@ts-ignore
        onChange={handleChange}
        options={options}
        components={{
          MultiValueLabel,
        }}
      />
    </Wrapper>
  );
};

export default CreateableDropdown;
