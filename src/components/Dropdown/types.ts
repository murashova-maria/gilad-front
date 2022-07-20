export interface DropdownProps {
  value: InputValueType;
  onSelect: (key: any) => void;
  options: Array<{ item: string | JSX.Element; value: string | number }>;
  label: string;
  placeholder?: string;
  isSmall?: boolean;
  menuChild?: JSX.Element;
  disabledValues?: Array<number | string>;
  isMultiSelect?: boolean;
  isDisabled?: boolean;
  isReversed?: boolean
}

export type InputValueType = string | number | boolean;
