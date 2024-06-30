import React, { Fragment, useEffect, useState } from "react";
import '../css/home.css'
import AdminProductCard from "../admin components/AdminProductCard";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../document title/TitleFunction";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

export default function AdminHome() {
    const [products, setProducts] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    PageTitle('E-CART | All Products')

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/products?' + searchParams)
            .then(res => res.json())
            .then(res => setProducts(res.products))
    }, [searchParams]);


    return (
        <Fragment>
            <Header access='admin' />
            <main className="mt-5">
                <section className="d-flex align-items-center">
                    <div className="row mx-auto justify-content-center" style={{ paddingBottom: '90px' }} >

                        <AdminProductCard products={products} setProducts={setProducts} />

                    </div>
                </section>
            </main>
            <Footer />
        </Fragment>
    );
}