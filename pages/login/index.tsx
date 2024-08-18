import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import CustomInput from '@/components/CustomInput';
import { Call, Lock1 } from 'iconsax-react';
import LOGO from '@/assets/images/full-logo.svg';
import CheckboxButton from '@/components/CheckboxButton';
import CustomButton from '@/components/CustomButton';
import RadioButton from '@/components/RadioButton';
import PROFILE from '@/assets/images/profile.jpg';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Loading from '@/components/Loading';

const Login = () => {
    const route = useRouter();
    const [checked, setChecked] = useState(true);
    const [userType, setUserType] = useState("Admin");
    const [loading, setLoading] = useState(false);

    const adminValidation = Yup.object({
        phone: Yup.string().required('ফোন নাম্বার দরকার!'),
        password: Yup.string().required('পাসওয়ার্ড দরকার!'),
    });

    const customerValidation = Yup.object({
        phone: Yup.string().required('ফোন নাম্বার দরকার!'),
    });

    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
        },
        validationSchema: userType === "Admin" ? adminValidation : customerValidation,
        onSubmit: async (values) => {
            const { phone, password } = values;
            try {
                setLoading(true);  // Start loading
                if (userType === "Admin") {
                    const adminRef = doc(db, 'admin', phone);
                    const adminDoc = await getDoc(adminRef);
                    if (!adminDoc.exists()) {
                        throw new Error('মালিক পাওয়া যাচ্ছে না!');
                    }
                    const adminData = adminDoc.data();
                    if (adminData.password === password) {
                        toast.success("লগইন সফল হয়েছে!");
                        localStorage.setItem('monir', userType);
                        route.push('/');
                    } else {
                        throw new Error('ভুল পাসওয়ার্ড!');
                    }
                } else {
                    const customerRef = doc(db, 'customers', phone);
                    const customerDoc = await getDoc(customerRef);
                    if (!customerDoc.exists()) {
                        throw new Error('গ্রাহক পাওয়া যাচ্ছে না!');
                    }
                    toast.success("লগইন সফল হয়েছে!");
                    localStorage.setItem('monir', userType);
                    localStorage.setItem('customer', phone);
                    route.push('/');
                }
                setLoading(false);  // End loading after login success or failure
            } catch (error: any) {
                console.log(error);
                toast.error(error?.message || "Something went wrong!");
                setLoading(false);  // End loading after login failure
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

    return (
        <div className='relative min-h-screen w-full flex p-[24px] flex-col justify-center items-center'
            style={{
                backgroundImage: `url('/background.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Head>
                <title>Login | MonirStore</title>
            </Head>
            <div className='w-full sm:w-[400px] flex flex-col items-center'>
                <div className='w-full h-full px-[20px] md:px-[40px] py-[20px] flex flex-col gap-[30px] overflow-y-auto custom-scrollbar'>
                    <div className='w-full flex items-center justify-center'>
                        <Image src={PROFILE} alt='logo' width={100} height={100} className='rounded-full border-[2px] border-primary' />
                    </div>
                    <div className='w-full flex items-center justify-center mb-[20px]'>
                        <Image src={LOGO} alt='logo' width={250} />
                    </div>
                    <div className='w-full flex items-center gap-[20px]'>
                        <RadioButton title='মালিক' checked={userType === "Admin"} setChecked={() => setUserType("Admin")} />
                        <RadioButton title='গ্রাহক' checked={userType === "Customer"} setChecked={() => setUserType("Customer")} />
                    </div>
                    <div className='h-[calc(100%-80px)] flex flex-col justify-center'>
                        <div className='ml-12px] h-[25px] w-[122px] flex items-center justify-center text-center text-white bg-primary text-[14px]'>ফোন নাম্বার</div>
                        <div className='w-full flex flex-col gap-[20px]'>
                            <CustomInput
                                leftIcon={<Call />}
                                label="ফোন নাম্বার"
                                type="text"
                                fieldTitle="phone"
                                setFieldValue={setFieldValue}
                                value={values.phone}
                                touched={touched.phone}
                                error={errors.phone}
                                handleBlur={handleBlur}
                                placeholder='ফোন নাম্বার'
                            />
                            {userType === "Admin" && <CustomInput
                                leftIcon={<Lock1 />}
                                label="পাসওয়ার্ড"
                                type="password"
                                fieldTitle="password"
                                setFieldValue={setFieldValue}
                                value={values.password}
                                touched={touched.password}
                                error={errors.password}
                                handleBlur={handleBlur}
                                placeholder='পাসওয়ার্ড'
                            />}
                        </div>
                        <div className='w-full flex items-center justify-between gap-[5px] mt-[16px]'>
                            <CheckboxButton title='আমাকে মনে রাখবেন' checked={checked} setChecked={setChecked} />
                        </div>
                        <CustomButton onClick={handleSubmit} title={'লগইন'} size='large' className='mt-[20px]' />
                    </div>
                </div>
            </div>
            {loading && <Loading />}
        </div>
    )
}

export default Login;
