import GradientText from '@/components/GradientText';
import Loading from '@/components/Loading';
import ParentModal from '@/components/ParentModal';
import RadioButton from '@/components/RadioButton';
import { addTransaction } from '@/utils/addTransaction';
import { convertBanglaToEnglishNumber } from '@/utils/convertBanglaToEnglishNumber';
import { CustomerWithTransactions, getCustomerWithTransactions } from '@/utils/getCustomerWithTransactions';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import BG from '@/assets/images/bg.jpg';

const CustomerDetals = () => {
    const [customer, setCustomer] = useState<CustomerWithTransactions | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentType, setPaymentType] = useState("purchase");
    const params = useParams();
    const phone = params?.number ? Array.isArray(params.number) ? params?.number[0] : params?.number : "";

    const fetchCustomer = async (phone: string) => {
        setLoading(true); // Start loading
        try {
            const customerData = await getCustomerWithTransactions(phone);
            if (customerData && customerData.transactions) {
                // Sort transactions by date
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
            setLoading(false); // End loading after fetching data
        }
    }

    const handleAddAmount = async () => {
        try {
            setLoading(true); // Start loading
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
            setLoading(false); // End loading after handling transaction
        }
    }

    useEffect(() => {
        if (phone)
            fetchCustomer(phone);
    }, [phone]);

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
            <div className='h-full w-full'>
                {loading && <Loading />} {/* Display loading modal if loading is true */}
                {!loading && customer && (
                    <div className='relative h-full custom-scrollbar overflow-y-auto'>
                        <div className='bg-black-100/70 p-[10px] rounded-[8px]'>
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerDetals;
