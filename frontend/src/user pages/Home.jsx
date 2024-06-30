import React, { Fragment, useEffect, useState } from "react";
import '../css/home.css'
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../document title/TitleFunction";
import Header from "../components/Header";



export default function Home() {
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
            <Header />
            <main className="mt-5 ">
                {/* <h1 className="text-center">Latest Products</h1> */}
                <section>
                    <div className="row mx-auto justify-content-center" style={{ paddingBottom: '90px' }} >

                        {
                            products.map((product, index) => <ProductCard product={product} key={index} />)
                        }

                    </div>
                </section>
            </main>

        </Fragment>
    );
}