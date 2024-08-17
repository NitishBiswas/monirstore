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
        phone: Yup.string().required('Phone number is required!'),
        password: Yup.string().required('Password is required!'),
    });

    const customerValidation = Yup.object({
        phone: Yup.string().required('Phone number is required!'),
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
                        throw new Error('Admin not found!');
                    }
                    const adminData = adminDoc.data();
                    if (adminData.password === password) {
                        toast.success("Login successful!");
                        localStorage.setItem('monir', userType);
                        route.push('/');
                    } else {
                        throw new Error('Invalid password!');
                    }
                } else {
                    const customerRef = doc(db, 'customers', phone);
                    const customerDoc = await getDoc(customerRef);
                    if (!customerDoc.exists()) {
                        throw new Error('Customer not found!');
                    }
                    toast.success("Login successful!");
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
                        <RadioButton title='Admin' checked={userType === "Admin"} setChecked={() => setUserType("Admin")} />
                        <RadioButton title='Customer' checked={userType === "Customer"} setChecked={() => setUserType("Customer")} />
                    </div>
                    <div className='h-[calc(100%-80px)] flex flex-col justify-center'>
                        <div className='ml-12px] h-[25px] w-[122px] flex items-center justify-center text-center text-white bg-primary text-[14px]'>Phone Number</div>
                        <div className='w-full flex flex-col gap-[20px]'>
                            <CustomInput
                                leftIcon={<Call />}
                                label="Phone Number"
                                type="text"
                                fieldTitle="phone"
                                setFieldValue={setFieldValue}
                                value={values.phone}
                                touched={touched.phone}
                                error={errors.phone}
                                handleBlur={handleBlur}
                            />
                            {userType === "Admin" && <CustomInput
                                leftIcon={<Lock1 />}
                                label="Password"
                                type="password"
                                fieldTitle="password"
                                setFieldValue={setFieldValue}
                                value={values.password}
                                touched={touched.password}
                                error={errors.password}
                                handleBlur={handleBlur}
                            />}
                        </div>
                        <div className='w-full flex items-center justify-between gap-[5px] mt-[16px]'>
                            <CheckboxButton title='Remember me' checked={checked} setChecked={setChecked} />
                        </div>
                        <CustomButton onClick={handleSubmit} title={'Login'} size='large' className='mt-[20px]' />
                    </div>
                </div>
            </div>
            {loading && <Loading />}
        </div>
    )
}

export default Login;
