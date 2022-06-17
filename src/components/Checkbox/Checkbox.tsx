import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { ICheckbox } from "./types";


const Input = styled.input`
clip: rect(0 0 0 0);
clip-path: inset(50%);
height: 1px;
overflow: hidden;
position: absolute;
white-space: nowrap;
width: 1px;
`


const Checkbox = ({
  checked = false,
  setIsCheckedCreate,
  disabled,
  className
}: ICheckbox) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#F06543" : "#fff",
    borderColor: isChecked ? "#F06543" : "#F06543",
  });

  const [checkmarkLength, setCheckmarkLength] = useState<any>();

  const checkmarkanimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
  });

  useEffect(() => {
    setIsCheckedCreate(isChecked);
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <label className={className}>
      <Input
        type="checkbox"
        disabled={disabled}
        onChange={() => setIsChecked(!isChecked)}
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`checkbox ${isChecked ? "checkbox__active" : ""}`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1.63635 4.8637L5.52524 9.31825L13.7273 1.68188"
          strokeWidth="2"
          stroke={isChecked ? "#fff" : "none"}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkanimationStyle.x}
          ref={(ref: any) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
        />
      </animated.svg>
    </label>
  );
};

export default Checkbox