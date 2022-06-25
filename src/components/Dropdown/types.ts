export interface DropdownProps {
  value: InputValueType;
  placeholder: string;
  onSelect: (key: any) => void;
  options: Array<{ item: string | JSX.Element; value: string | number }>;
  label: string;
  isSmall?: boolean;
  menuChild?: JSX.Element;
  disabledValues?: Array<number | string>;
  isMultiSelect?: boolean;
  isDisabled?: boolean;
  isReversed?: boolean
}

export type InputValueType = string | number | boolean;
