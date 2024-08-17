import React from 'react'
import ParentModal from './ParentModal';

interface IDeleteModal {
    showDeleteModal: boolean;
    setShowDeleteModal: (value: boolean) => void;
    handleDelete: () => void;
    title?: string;
}

const DeleteModal = ({ handleDelete, showDeleteModal, setShowDeleteModal, title = 'Are you sure you want to delete this ?' }: IDeleteModal) => {
    return (
        <ParentModal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            submitButton={true}
            submitButtonText='Yes'
            closeButtonText='No'
            handleSubmit={handleDelete}
            title={"Delete"}
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