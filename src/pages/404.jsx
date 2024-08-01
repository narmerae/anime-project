import React from 'react';
import RootLayout from "@/pages/components/RootLayout";
import Link from "next/link";

const error404 = () => {
    return (
        <div className={"text-center d-flex justify-content-center align-items-center"}>
            <h1>Error 404 </h1>
            <p>Page doesn&apos;t exist!</p>
            <Link href={"/"}>Home</Link>

        </div>
    );
};
error404.getLayout = (page) => {
    return <RootLayout showHeader={false} showFooter={false}>{page}</RootLayout>
}

export default error404;