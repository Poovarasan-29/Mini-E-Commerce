/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { toast } from "react-toastify";
import PageTitle from "../document title/TitleFunction";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function ProductDetails() {

    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {

        fetch(process.env.REACT_APP_API_URL + '/product/' + id)
            .then(res => res.json())
            .then(res => setProduct(res.product));

        fetch(process.env.REACT_APP_API_URL + '/cart')
            .then(res => res.json())
            .then(res => setCartItems(res.cart))

    }, [])

    if (product) {
        PageTitle(product.name)
    }


    const increaseQty = () => {
        if (product.stock === 0) {
            toast.warning('Out of Stock !!', {
                pauseOnHover: false,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
        else if (qty === product.stock) {
            toast.warning('Maximum Stock : ' + product.stock, {
                pauseOnHover: false,
                autoClose: 1200,
                hideProgressBar: true,
            })
        }
        else
            setQty(qty + 1)
    }

    function decreaseQty() {
        if (product.stock === 0) {
            toast.warning('Out of Stock !!', {
                pauseOnHover: false,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
        else if (qty > 1)
            setQty(qty - 1)
    }


    const addToCartHandle = async () => {
        const itemExists = cartItems.find(item => item.cartItem.product._id === product._id);
        if (!itemExists) {
            const newItem = { product, qty };
            setCartItems(oldStateValues => [...oldStateValues, { cartItem: newItem }]);

            await fetch(process.env.REACT_APP_API_URL + '/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            })

            toast.success('Cart Item Added Succesfully !', {
                pauseOnHover: false,
                autoClose: 1500
            })
        }
        else {
            toast.error('Item Already Exists', {
                pauseOnHover: false,
                autoClose: 1200,
                hideProgressBar: true
            })
        }

    }


    return (
        <>
            <Header access="admin" />
            {
                product && <section className="container">
                    <div className="row pt-5" style={{ paddingBottom: '90px' }}>
                        <div className="col-12 col-sm-6 col-md-5 d-flex justify-content-center" style={{ height: '400px' }}>
                            <img src={product.images[0].image} alt={product.name} className="w-50" style={{ objectFit: 'contain' }} />
                        </div>
                        <div className="col-12 col-sm-6 col-md-7">
                            <h2 className="h1">{product.name}</h2>
                            <hr />
                            <div className="ratings mt-auto">
                                <div className="rating-outer text-warning">
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <div className="rating-inner text-warning" style={{ width: `${16.11 * (product.ratings)}px` }}>
                                        <i className="bi bi-star-fill" ></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                </div>
                            </div>

                            <h3 className="my-3">
                                <i className="bi bi-currency-rupee"></i>
                                {product.discount > 0 ? (product.price - (product.price / product.discount)).toFixed(2) : product.price}
                                {product.discount > 0 ? <span className="fs-6 text-decoration-line-through mx-1 text-secondary ">{product.price}</span> : null}
                                {product.discount > 0 ? <span className="text-danger fs-5 ms-3">{product.discount}% off</span> : null}
                            </h3>
                            <div className="minus-plus-btn d-flex align-items-center">
                                <button className="btn btn-danger" onClick={decreaseQty}>-</button>
                                <span className="fs-4 text-center" style={{ width: '50px' }}> {product.stock > 0 ? qty : 0} </span>
                                <button className="btn btn-primary" onClick={increaseQty}>+</button>
                                <button className="btn btn-warning ms-2 ms-md-5 px-2" onClick={addToCartHandle} disabled={Number(product.stock) === 0} style={Number(product.stock) === 0 ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} >Add to Cart</button>
                            </div>
                            <hr />
                            <p>Status : {product.stock > 0 ? <b className="text-success">In Stock ({product.stock})</b> : <b className="text-danger">Out of Stock</b>} </p>
                            <hr />
                            <h2>Description</h2>
                            <p>{product.description}</p>

                        </div>
                    </div>
                </section >
            }
            <Footer />
        </>
    );


}