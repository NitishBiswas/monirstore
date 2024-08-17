import { CloseCircle } from "iconsax-react";
import { ReactNode } from "react";

export interface IParentModal {
    title?: string;
    primaryColor?: string;
    children?: ReactNode;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    submitButtonText?: string;
    closeButtonText?: string;
    submitButton: boolean;
    handleSubmit?: () => void;
    className?: string;
    warning?: boolean;
    bottomButtons?: boolean;
}

const ParentModal = ({
    title = "Modal",
    children,
    primaryColor = '#2196f3',
    showModal,
    setShowModal,
    submitButtonText = "Submit",
    closeButtonText = "Close",
    submitButton,
    handleSubmit,
    className = '',
    warning = false,
    bottomButtons = true,
}: IParentModal) => {

    return (
        <div
            className={`${showModal ? "flex" : "hidden"
                } fixed h-[100vh] w-[100vw] top-0 left-0 right-0 bottom-0 grid place-items-center z-[1000000000] sm:backdrop-blur-sm`}
        >
            <div className={`bg-white fixed shadow-lg rounded-lg h-auto max-h-[99%] overflow-x-auto min-w-[97%] sm:min-w-[90%] md:min-w-[80%] lg:min-w-[60vw] xl:min-w-[50vw] ${className}`}>
                <div
                    className="text-white text-medium sticky z-[10000] top-0 font-medium p-4 flex flex-row justify-between items-center"
                    style={{ backgroundColor: primaryColor }}
                >
                    {title} <div className="text-2xl cursor-pointer hover:scale-105" onClick={() => setShowModal(false)}>
                        <CloseCircle />
                    </div>
                </div>
                <div className="p-4">{children}</div>
                {bottomButtons && <div className="flex flex-row items-center justify-end gap-5 p-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className={`select-none h-[36px] w-28 text-center border ${warning ? "border-gray-300 text-gray-300 bg-gray-300/10 hover:bg-gray-300" : "border-error text-error bg-error/10 hover:bg-error"} rounded  flex items-center justify-center cursor-pointer hover:text-white`}
                    >
                        {closeButtonText}
                    </button>
                    {submitButton && (
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className={`select-none h-[36px] w-28 justify-center items-center text-center border ${warning ? "border-error text-error bg-error/10 hover:bg-error" : "border-primary text-primary bg-primary/10 hover:bg-primary"}  rounded  flex items-center justify-center cursor-pointer hover:text-white`}
                        >
                            {submitButtonText}
                        </button>
                    )}
                </div>}
            </div>
        </div>
    );
};

export default ParentModal;
