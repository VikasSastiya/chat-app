"use client";

import React from 'react';
import ReactSelect, { MultiValue, ActionMeta } from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value?: OptionType | MultiValue<OptionType>; // Can be a single or multiple selection
  onChange: (value: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void; // Correct type for multi select
  options: OptionType[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ label, value, disabled, onChange, options }) => {
  return (
    <div className={"z-[100] "}>
      <label className={"block text-sm font-medium leading-6 text-gray-900"}>
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange} // Correct type for onChange
          isMulti={true}
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{ control: () => "text-sm" }}
        />
      </div>
    </div>
  );
};

export default Select;
