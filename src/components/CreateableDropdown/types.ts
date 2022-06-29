export interface CreatableEditableSelectOption {
  label: string;
  value: string;
}

export type CreatableEditableSelectValue = CreatableEditableSelectOption;

export interface Props {
  options: CreatableEditableSelectOption[];
  value: CreatableEditableSelectValue[];
  onChange: (value: CreatableEditableSelectValue[]) => void;
  className?: string
  placeholder?:string
  label?: string
}
