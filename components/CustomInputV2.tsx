import React, { useState } from 'react';

interface CustomInputProps {
    label: string;
    type: string;
    setFieldValue: (field: string, value: any) => void;
    value: string;
    touched?: boolean;
    error: string | undefined;
    handleBlur: (e: React.FocusEvent<any>) => void;
    fieldTitle: string;
    disabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
}

const CustomInputV2: React.FC<CustomInputProps> = ({
    label,
    type,
    setFieldValue,
    value,
    touched,
    error,
    handleBlur,
    fieldTitle,
    disabled = false,
    isRequired = true,
    placeholder = "",
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "file") {
            setFieldValue(fieldTitle, e.target.files ? e.target.files[0] : {});
        } else {
            setFieldValue(fieldTitle, e.target.value);
        }
    };

    return (
        <div className="w-full relative">
            <div className={`relative flex items-center w-full`}>
                {label && (
                    <div
                        className="bg-white px-[10px] outline-none focus:outline-none text-[#363636] text-[14px] font-medium absolute top-[-12px] left-3 z-10 cursor-pointer"
                    >
                        {label}
                    </div>
                )}
                <input
                    type={type}
                    className={`flex-grow items-center text-[#363636] border-[2px] border-secondary h-[50px] px-[20px] placeholder:text-[#747474]  w-full focus:outline-none text-[14px]`}
                    placeholder={disabled ? "" : placeholder ? placeholder : `Enter ${label.toLowerCase()}`}
                    onChange={handleChange}
                    value={value}
                    onBlur={handleBlur}
                    name={fieldTitle}
                    disabled={disabled}
                />
            </div>
            {(touched && error) ? (
                <span className="text-error text-sm mt-1">{error}</span>
            ) : null}
        </div>
    );
};

export default CustomInputV2;
