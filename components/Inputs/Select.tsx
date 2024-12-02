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
    <div className={"z-[100]"}>
      <label className={"block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"}>
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti={true}
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999
            }),
            control: (base) => ({
              ...base,
              backgroundColor: 'rgb(17 24 39)',
              borderColor: '#374151',
              '&:hover': {
                borderColor: '#4B5563'
              },
              border: '1px solid #374151',
              boxShadow: 'none',
              '&:focus': {
                borderColor: '#9333EA'
              }
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: 'rgb(17 24 39)',
              border: '1px solid #374151'
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#374151' : 'rgb(17 24 39)',
              color: '#E5E7EB',
              '&:hover': {
                backgroundColor: '#374151'
              },
              cursor: 'pointer'
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#374151'
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: '#E5E7EB'
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: '#E5E7EB',
              '&:hover': {
                backgroundColor: '#4B5563',
                color: '#E5E7EB'
              }
            }),
            input: (base) => ({
              ...base,
              color: '#E5E7EB'
            }),
            singleValue: (base) => ({
              ...base,
              color: '#E5E7EB'
            }),
            placeholder: (base) => ({
              ...base,
              color: '#6B7280'
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: '#6B7280',
              '&:hover': {
                color: '#9CA3AF'
              }
            }),
            clearIndicator: (base) => ({
              ...base,
              color: '#6B7280',
              '&:hover': {
                color: '#9CA3AF'
              }
            })
          }}
          classNames={{
            control: () => "text-sm"
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#9333EA',
              primary75: '#9333EA',
              primary50: '#374151',
              primary25: '#374151',
              neutral0: 'rgb(17 24 39)',
              neutral5: '#374151',
              neutral10: '#374151',
              neutral20: '#374151',
              neutral30: '#4B5563',
              neutral40: '#6B7280',
              neutral50: '#6B7280',
              neutral60: '#9CA3AF',
              neutral70: '#E5E7EB',
              neutral80: '#E5E7EB',
              neutral90: '#F3F4F6'
            }
          })}
        />
      </div>
    </div>
  );
};

export default Select;
