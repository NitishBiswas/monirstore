import { Eye, EyeSlash, TickSquare } from 'iconsax-react';
import Link from 'next/link';
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
    isLabelShow?: boolean;
    placeholder?: string;
}

const CustomInputV3: React.FC<CustomInputProps> = ({
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
    isLabelShow = true,
    placeholder = "",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "file") {
            setFieldValue(fieldTitle, e.target.files ? e.target.files[0] : {});
        } else {
            setFieldValue(fieldTitle, e.target.value);
        }
    };

    return (
        <div className="w-full relative">
            {isLabelShow && <label className="text-small font-[600]">{label} {isRequired && <span className='text-error'> * </span>}</label>}
            {isLabelShow && <br />}
            <div className={`relative flex items-center rounded-[6px] w-full ${isLabelShow ? "mt-2" : "mt-0"}`}>
                <input
                    type={showPassword ? 'text' : type}
                    className={`flex-grow border-[1px] border-stroke placeholder:text-gray-400 ${type === "file" ? "px-[15px] py-[12px]" : "p-[15px]"} rounded-[6px] w-full focus:border-primary focus:outline-none text-small`}
                    placeholder={disabled ? "" : placeholder ? placeholder : `Enter ${label.toLowerCase()}`}
                    onChange={handleChange}
                    value={value}
                    onBlur={handleBlur}
                    name={fieldTitle}
                    disabled={disabled}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="outline-none focus:outline-none text-gray-400 absolute top-[30%] right-3 z-10 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <Eye size={24} />
                        ) : (
                            <EyeSlash size={24} />
                        )}
                    </button>
                )}
            </div>
            {(touched && error) ? (
                <span className="text-error text-sm mt-1">{error}</span>
            ) : null}
        </div>
    );
};

export default CustomInputV3;
