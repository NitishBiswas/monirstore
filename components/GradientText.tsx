import React from 'react';

const GradientText = ({ text, className }: { text: string, className?: string }) => {
    return (
        <span className={`text-gradient ${className}`}>{text}</span>
    );
};

export default GradientText;