import LoginAsAdmin from '@/components/LoginAsAdmin';
import LoginAsCustomer from '@/components/LoginAsCustomer';
import { addCustomer, Customer } from '@/utils/addCustomer';
import { getAllCustomers } from '@/utils/getAllCustomers';
import { CustomerWithTransactions, getCustomerWithTransactions } from '@/utils/getCustomerWithTransactions';
import React, { useEffect, useState } from 'react';
import BG from '@/assets/images/bg.jpg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { calculateTotalDue } from '@/utils/calculateTotalDue';
import GradientText from '@/components/GradientText';
import { Call } from 'iconsax-react';
import ParentModal from '@/components/ParentModal';
import CustomInputV3 from '@/components/CustomInputV3';
import Loading from '@/components/Loading';
import { convertBanglaToEnglishNumber } from '@/utils/convertBanglaToEnglishNumber';
import { addTransaction } from '@/utils/addTransaction';
import RadioButton from '@/components/RadioButton';
import { useRouter } from 'next/router';

const Home = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<CustomerWithTransactions | null>(null);
    const [userType, setUserType] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(true);  // Set initial loading state to true
    const [totalDue, setTotalDue] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentType, setPaymentType] = useState("purchase");
    const route = useRouter();

    const handleAddAmount = async () => {
        try {
            setLoading(true);
            if (paymentAmount) {
                const banglaNumberRegex = /[০-৯]/;
                const hasBanglaNumbers = banglaNumberRegex.test(paymentAmount);
                let amount = paymentAmount;
                if (hasBanglaNumbers) {
                    amount = convertBanglaToEnglishNumber(paymentAmount);
                }
                await addTransaction(phone, parseInt(amount), paymentType);
                fetchCustomer(phone);
                toast.success(`টাকা ${paymentType === "purchase" ? "বিয়োগ" : "যোগ"} হয়েছে!`);
                setPaymentAmount("");
                setShowPaymentModal(false);
                setPaymentType("purchase");
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    const fetchCustomers = async () => {
        try {
            setLoading(true);  // Start loading
            const allCustomers = await getAllCustomers();
            const sortedCustomers = allCustomers.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA.getTime() - dateB.getTime();
            });
            setCustomers(sortedCustomers);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);  // End loading after fetching data
        }
    };

    const fetchCustomer = async (phone: string) => {
        try {
            setLoading(true);  // Start loading
            const customerData = await getCustomerWithTransactions(phone);
            if (customerData && customerData.transactions) {
                customerData.transactions.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA.getTime() - dateB.getTime(); // Ascending order
                });
            }
            setCustomer(customerData);
        } catch (error) {
            console.error("Error fetching customer:", error);
        } finally {
            setLoading(false);  // End loading after fetching data
        }
    };

    useEffect(() => {
        const storedPhone = localStorage.getItem('customer');
        const storedUserType = localStorage.getItem('monir');
        setPhone(storedPhone || "");
        setUserType(storedUserType || "");
    }, []);

    useEffect(() => {
        if (userType === "Admin") {
            fetchCustomers();
        } else if (userType === "Customer" && phone) {
            fetchCustomer(phone);
        } else {
            setLoading(false);  // Stop loading if no valid userType or phone
        }
    }, [phone, userType]);

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
                fetchCustomers();
                resetForm();
                setShowModal(false);
                toast.success("নতুন গ্রাহক যোগ করা হয়েছে!");
            } catch (error: any) {
                console.log(error);
                toast.error(error?.message || "Something went wrong!");
            } finally {
                setLoading(false);
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
            try {
                setLoading(true);  // Start loading
                const due = await calculateTotalDue(customers);
                setTotalDue(due);
            } catch (error) {
                console.error("Error calculating total due:", error);
            } finally {
                setLoading(false);  // End loading after calculating
            }
        };
        if (customers.length > 0) {
            fetchTotalDue();
        }
    }, [customers]);

    return (
        <div style={{
            backgroundImage: `url(${BG.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        }} className='p-[10px] w-full sm:w-[400px]'>
            {userType === "Admin" ? <div className='h-full w-full'>
                <div className='relative h-full custom-scrollbar overflow-y-auto'>
                    <div className='bg-black-100/70 p-[10px] rounded-[8px]'>
                        <div className='w-full text-center flex items-center justify-center text-h3 text-white font-bold'><GradientText text="স্বাগতম" /></div>
                        <div className='text-2xl font-[500] text-white mt-[16px] mb-[8px] flex items-center gap-[10px]'>মোট গ্রাহক: <span className='text-primary'>{customers?.length} জন</span></div>
                        <div className='text-2xl font-[500] text-white flex items-center gap-[10px]'>মোট বকেয়া: <span className='text-error'>{totalDue} টাকা</span></div>
                    </div>
                    <div className='flex flex-col gap-[10px] mt-[20px] mb-[40px]'>
                        {customers?.length > 0 ? customers?.map((customer, index) => {
                            return (
                                <div onClick={() => {
                                    route.push(`/details/${customer?.phone}`);
                                }} key={index} className='bg-black-100/70 rounded-[8px] p-[10px]'>
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
                        <div className='flex flex-col gap-[20px]'>
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
                </div>
            </div> : <div className='h-full w-full'>
                {customer && <div className='relative h-full custom-scrollbar overflow-y-auto'>
                    <div className='bg-black-100/70 p-[10px] rounded-[8px]'>
                        <div className='w-full text-center flex items-center justify-center text-h3 text-white font-bold'><GradientText text="স্বাগতম" /></div>
                        <div className='text-3xl font-[500] text-white mt-[16px] mb-[8px] flex items-center gap-[10px]'>{customer?.name}</div>
                        <div className='text-2xl font-[500] text-white flex items-center gap-[10px]'>বকেয়া আছে: <span className='text-error'>{customer?.totalDue || 0} টাকা</span></div>
                    </div>
                    <div className='flex flex-col gap-[10px] mt-[20px] mb-[40px]'>
                        {customer?.transactions?.length > 0 ? customer?.transactions?.map((trans, index) => {
                            return (
                                <div key={index} className={`bg-black-100/70 rounded-[8px] p-[10px]`}>
                                    <div className={`${trans?.type === "purchase" ? "text-error" : "text-primary"} text-2xl font-[500]`}>{trans?.type === "purchase" ? "বাকি" : "জমা"} : {trans?.amount} টাকা</div>
                                    <div className='text-gray-500 mt-[10px]'>{trans?.date}</div>
                                </div>
                            )
                        }) : <div className='w-full mt-[40px] bg-black-100/70 text-error text-center py-[30px] px-[10px] rounded-[8px] text-2xl'> কোন লেনদেন হয় নাই!</div>}
                    </div>

                    <div onClick={() => setShowPaymentModal(true)} className='fixed cursor-pointer bottom-3 right-3 z-[1000] h-[50px] w-[50px] bg-white shadow-lg shadow-primary/20 rounded-full text-primary text-h2 animate-bounce flex items-center justify-center'>
                        +
                    </div>
                    <ParentModal
                        showModal={showPaymentModal}
                        setShowModal={setShowPaymentModal}
                        title='টাকার বিবরণ'
                        handleSubmit={handleAddAmount}
                        submitButton={true}
                        closeButtonText='বাতিল'
                        submitButtonText='ওকে'
                    >
                        <div className='flex flex-col gap-[20px]'>
                            <div className='w-full flex items-center gap-[20px] my-[10px]'>
                                <RadioButton title='বাকি' checked={paymentType === "purchase"} setChecked={() => setPaymentType("purchase")} />
                                <RadioButton title='জমা' checked={paymentType === "payment"} setChecked={() => setPaymentType("payment")} />
                            </div>
                            <div className="w-full relative">
                                <label className="text-small font-[600]">টাকার পরিমান<span className='text-error'> * </span></label>
                                <br />
                                <div className={`relative flex items-center rounded-[6px] w-full mt-2`}>
                                    <input
                                        type={'text'}
                                        className={`flex-grow border-[1px] border-stroke placeholder:text-gray-400 p-[15px] rounded-[6px] w-full focus:border-primary focus:outline-none text-small`}
                                        placeholder={"টাকার পরিমান লিখুন"}
                                        onChange={e => setPaymentAmount(e.target.value)}
                                        value={paymentAmount}
                                    />
                                </div>
                            </div>
                        </div>
                    </ParentModal>
                </div>}
            </div>}
            {loading && <Loading />}
        </div>
    )
}

export default Home