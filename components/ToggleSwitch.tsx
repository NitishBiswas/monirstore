import React, { useState } from "react";

interface ToggleSwitchProps {
    isChecked: boolean;
    setIsChecked: () => void;
    circleSize?: string;
    primaryColor?: string;
    secondaryColor?: string;
    height?: string;
    width?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    isChecked,
    setIsChecked,
    primaryColor = "bg-blue-500",
    secondaryColor = "bg-gray-300",
    height = "20px",
    width = "40px",
}) => {

    return (
        <div className={`cursor-pointer relative rounded-full ${isChecked ? primaryColor : secondaryColor}`} onClick={setIsChecked} style={{
            height: height,
            width: width,
        }}>
            <div className={`cursor-pointer absolute left-0 rounded-full bg-white shadow-md transition-transform transform ${isChecked ? 'translate-x-full' : ''}`} style={{
                height: height,
                width: height,
            }}></div>
        </div>
    );
};

export default ToggleSwitch;
