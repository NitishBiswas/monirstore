import { TickSquare } from 'iconsax-react';
import React from 'react'

interface IRadio {
    title: string;
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

const RadioButton = ({ title, checked, setChecked }: IRadio) => {
    return (
        <div onClick={() => setChecked(!checked)} className='w-fit flex gap-[12px] cursor-pointer items-center text-primary'>
            <div className={`border-[1px] rounded-full w-[20px] h-[20px] flex items-center justify-center ${checked ? "border-primary" : "border-gray-300"}`}>
                {checked && <div className='w-[12px] h-[12px] rounded-full bg-primary' />}
            </div>
            <span className='text-small text-black-100'>{title}</span>
        </div>
    )
}

export default RadioButton