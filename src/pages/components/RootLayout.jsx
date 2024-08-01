import React from 'react';
import Header from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";

const RootLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column" style={{backgroundColor: '#f8f9fb'}}>
            <Header/>
            <div className="flex-fill">
                {/* Main content goes here */}
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default RootLayout;