import React from 'react'
import ParentModal from './ParentModal';

interface IDeleteModal {
    showDeleteModal: boolean;
    setShowDeleteModal: (value: boolean) => void;
    handleDelete: () => void;
    title?: string;
}

const DeleteModal = ({ handleDelete, showDeleteModal, setShowDeleteModal, title = 'আপনি কি লেনদেনটি ডিলিট করতে চান?' }: IDeleteModal) => {
    return (
        <ParentModal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            submitButton={true}
            submitButtonText='হ্যাঁ'
            closeButtonText='না'
            handleSubmit={handleDelete}
            title={"ডিলিট"}
            primaryColor='#f04d58'
            className='!min-w-[77%] sm:!min-w-[70%] md:!min-w-[40%] lg:!min-w-[30vw] xl:!min-w-[20vw]'
            warning={true}
        >
            <div className='text-xl font-semibold'>
                {title}
            </div>
        </ParentModal>
    )
}

export default DeleteModal