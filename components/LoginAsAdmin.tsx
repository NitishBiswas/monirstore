import { addCustomer, Customer } from '@/utils/addCustomer'
import React, { useEffect, useState } from 'react';
import GradientText from './GradientText';
import { calculateTotalDue } from '@/utils/calculateTotalDue';
import CustomButton from './CustomButton';
import { Call } from 'iconsax-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ParentModal from './ParentModal';
import CustomInputV3 from './CustomInputV3';
import Loading from './Loading';

const customers: Customer[] = [
    { name: "John Doe", phone: "+1234567890", createdAt: "August 18, 2024 1:14 AM" },
    { name: "Jane Smith", phone: "+0987654321", createdAt: "August 17, 2024 2:25 PM" },
    { name: "Alice Johnson", phone: "+1122334455", createdAt: "August 16, 2024 3:36 PM" },
    { name: "Bob Brown", phone: "+2233445566", createdAt: "August 15, 2024 4:47 AM" },
    { name: "Charlie Davis", phone: "+3344556677", createdAt: "August 14, 2024 5:58 PM" },
    { name: "Diana Wilson", phone: "+4455667788", createdAt: "August 13, 2024 6:09 AM" },
    { name: "Eve Taylor", phone: "+5566778899", createdAt: "August 12, 2024 7:20 PM" },
    { name: "Frank Miller", phone: "+6677889900", createdAt: "August 11, 2024 8:31 AM" },
    { name: "Grace White", phone: "+7788990011", createdAt: "August 10, 2024 9:42 PM" },
    { name: "Henry Clark", phone: "+8899001122", createdAt: "August 09, 2024 10:53 AM" },
];


const LoginAsAdmin = ({ data }: { data: Customer[] }) => {
    const [totalDue, setTotalDue] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('গ্রাহকের নাম দরকার'),
            phone: Yup.string().required('গ্রাহকের ফোন নাম্বার দরকার')
        }),
        onSubmit: async (values, { resetForm }) => {
            const { phone, name } = values;
            try {
                setLoading(true);
                await addCustomer(name, phone);
                setLoading(false);
                resetForm();
                setShowModal(false);
                toast.success("নতুন গ্রাহক যোগ করা হয়েছে!");
            } catch (error: any) {
                console.log(error);
                toast.error(error?.message || "Something went wrong!");
            }
        },
    });

    const {
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
    } = formik;

    useEffect(() => {
        const fetchTotalDue = async () => {
            const due = await calculateTotalDue(data);
            setTotalDue(due);
        };

        fetchTotalDue();
    }, []);

    return (
        <div className='relative h-full custom-scrollbar overflow-y-auto'>
            <div className='bg-black-100/70 p-[10px] rounded-[8px]'>
                <div className='w-full text-center flex items-center justify-center text-h3 text-white font-bold'><GradientText text="স্বাগতম" /></div>
                <div className='text-2xl font-[500] text-white mt-[16px] mb-[8px] flex items-center gap-[10px]'>মোট গ্রাহক: <span className='text-primary'>{data?.length} জন</span></div>
                <div className='text-2xl font-[500] text-white flex items-center gap-[10px]'>মোট বকেয়া: <span className='text-error'>{totalDue} টাকা</span></div>
            </div>
            <div className='flex flex-col gap-[10px] mt-[20px] mb-[40px]'>
                {data?.length > 0 ? customers?.map((customer, index) => {
                    return (
                        <div key={index} className='bg-black-100/70 rounded-[8px] p-[10px]'>
                            <div className='w-full flex items-center justify-between gap-[10px] text-white'>
                                <div className='text-large'>{customer?.name}</div>
                                <div onClick={() => window.open(`tel:${customer?.phone}`)} className='cursor-pointer flex items-center justify-center bg-white text-primary shadow-lg rounded-full p-[6px]'>
                                    <Call size={20} />
                                </div>
                            </div>
                            <div className='flex items-center justify-between mt-[10px]'>
                                <div className='text-gray-400'>{customer?.createdAt}</div>
                                <div className='text-medium font-[500] text-gray-400'>বকেয়া: <span className='text-error'>{customer?.totalDue || 0} টাকা</span></div>
                            </div>
                        </div>
                    )
                }) : <div className='w-full mt-[40px] bg-black-100/70 text-error text-center py-[30px] px-[10px] rounded-[8px] text-2xl'>গ্রাহক নাই!</div>}
            </div>

            <div onClick={() => setShowModal(true)} className='fixed cursor-pointer bottom-3 right-3 z-[1000] h-[50px] w-[50px] bg-white shadow-lg shadow-primary/20 rounded-full text-primary text-h2 animate-bounce flex items-center justify-center'>
                +
            </div>
            <ParentModal
                showModal={showModal}
                setShowModal={setShowModal}
                title='গ্রাহকের বিবরণ'
                handleSubmit={handleSubmit}
                submitButton={true}
                closeButtonText='বাতিল'
                submitButtonText='ওকে'
            >
                <div className='flex flex-col sm:flex-row gap-[20px]'>
                    <CustomInputV3
                        label="গ্রাহকের নাম"
                        type="text"
                        fieldTitle="name"
                        setFieldValue={setFieldValue}
                        value={values.name}
                        touched={touched.name}
                        error={errors.name}
                        handleBlur={handleBlur}
                        placeholder='গ্রাহকের নাম'
                    />
                    <CustomInputV3
                        label="গ্রাহকের ফোন নাম্বার"
                        type="text"
                        fieldTitle="phone"
                        setFieldValue={setFieldValue}
                        value={values.phone}
                        touched={touched.phone}
                        error={errors.phone}
                        handleBlur={handleBlur}
                        placeholder='গ্রাহকের ফোন নাম্বার'
                    />
                </div>
            </ParentModal>
            {loading && <Loading />}
        </div>
    )
}

export default LoginAsAdmin