import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const route = useRouter();
    const routesWithNoSidebar = ["_error", "/404", "/login", "/signup"];

    const pathName = route.pathname;

    if (
        routesWithNoSidebar.includes(pathName)
    ) {
        return (
            <div className="bg-white font-poppins">
                {children}
                <ScrollToTopButton />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={{ zIndex: 9999999999 }}
                />
            </div>
        );
    }

    return (
        <DashboardLayout>
            {children} <ScrollToTopButton /><ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ zIndex: 9999999999 }}
            />
        </DashboardLayout>
    );
};

export default Layout;
