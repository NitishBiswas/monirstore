import { Eye, EyeSlash, TickSquare } from 'iconsax-react';
import React, { ReactNode, useState } from 'react';

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
    leftIcon?: ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
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
    leftIcon,
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
            <div className={`relative flex items-center w-full`}>
                {leftIcon && (
                    <div
                        className="outline-none focus:outline-none text-[#747474] absolute top-[30%] left-3 z-10 cursor-pointer"
                    >
                        {leftIcon}
                    </div>
                )}
                <input
                    type={showPassword ? 'text' : type}
                    className={`flex items-center text-[#363636] border-b-[2px] border-b-secondary h-[64px] px-[50px] placeholder:text-[#747474]  w-full focus:outline-none focus:border-b-primary text-[16px]`}
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
                        className="outline-none focus:outline-none text-[#747474] absolute top-[30%] right-3 z-10 cursor-pointer"
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

export default CustomInput;
