import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../document title/TitleFunction";
import Header from "../components/Header";



export default function Cart() {

    const [cartItems, setCartItems] = useState([])
    const [complete, setComplete] = useState(false);

    PageTitle("My Cart")

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/cart')
            .then(res => res.json())
            .then(res => setCartItems(res.cart))
    }, []);


    function increaseQty(item) {
        if (item.qty < item.product.stock) {
            const updatedItems = cartItems.map((i) => {
                if (i.cartItem.product._id === item.product._id) {
                    i.cartItem.qty++;

                    fetch(process.env.REACT_APP_API_URL + '/cart', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item)
                    })
                }
                return i;
            })
            setCartItems(updatedItems)
        }
        else {
            toast.warning('Maximum Stock : ' + item.product.stock, {
                pauseOnHover: false,
                autoClose: 3000
            })
        }

    }

    function decreaseQty(item) {
        if (item.qty > 1) {
            const updatedItems = cartItems.map((i) => {
                if (i.cartItem.product._id === item.product._id) {
                    i.cartItem.qty--;

                    fetch(process.env.REACT_APP_API_URL + '/cart', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item)
                    })
                }
                return i;
            })
            setCartItems(updatedItems)
        }
    }

    function removeItemHandler(item) {

        fetch(process.env.REACT_APP_API_URL + '/cart/' + item.product._id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => setCartItems(res.cart))
    }

    function placeOrderHandler() {

        fetch(process.env.REACT_APP_API_URL + '/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems)
        })
            .then(() => {
                setCartItems([]);
                setComplete(true)
                toast.success("Order Success", {
                    autoClose: 2000,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false
                })
            })
    }


    return <>
        <Header />
        {cartItems.length > 0 ?
            <section className="px-3 pt-4" style={{ paddingBottom: '90px' }}>

                <p className="fs-5">Total Items : <b>{cartItems.length}</b></p>
                <br />

                <div className="row">

                    <div className="col-12 col-md-7 position-relative">
                        {
                            cartItems.map((item, index) =>

                                <div className="row shadow px-1 py-2 mx-auto mb-5 rounded" key={index}>
                                    <div className="col-5 d-flex flex-column justify-content-between">
                                        <img src={item.cartItem.product.images[0].image} alt="" className="img-fluid mx-auto" style={{ width: '130px' }} />
                                        <p className="text-center">Price : ${item.cartItem.product.price}</p>
                                    </div>
                                    <div className="col-7 d-flex flex-column justify-content-between">
                                        <h5>
                                            <Link to={'/product/' + item.cartItem.product._id} className="text-decoration-none text-dark fs-6"> {item.cartItem.product.name} No Cost EMI/Additional Exchange Offers</Link>
                                        </h5>
                                        <div className="minus-plus-btn d-flex align-items-center">
                                            <button className="btn btn-danger" onClick={() => decreaseQty(item.cartItem)}>-</button>
                                            <span className="fs-4 text-center" style={{ width: '50px' }}> {item.cartItem.qty} </span>
                                            <button className="btn btn-primary" onClick={() => increaseQty(item.cartItem)}>+</button>
                                            <button className="btn ms-4 ms-lg-4 px-2 border border-danger text-danger" id="remove-btn" onClick={() => removeItemHandler(item.cartItem)}><i className="bi bi-trash"></i><span className="d-none d-lg-inline">Remove</span></button>
                                        </div>
                                        <p className="mt-2">Total Price : ${(item.cartItem.product.price * item.cartItem.qty).toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <div className="col-11 col-md-4 mx-auto mx-md-0 px-4 px-md-2 p-lg-4 pt-3 py-md-3 border rounded-3" style={{ height: 'fit-content' }} id="order-summary">
                        <div>
                            <h2>Order Summary</h2>
                            <hr />
                            <div className="d-flex justify-content-between px-3">
                                <span>Subtotal :</span>
                                <span>{cartItems.reduce((total, item) => item.cartItem.qty + total, 0)} (Units)</span>
                            </div><br />
                            <div className="d-flex justify-content-between px-3">
                                <span>Est. total :</span>
                                <span>${cartItems.reduce((total, item) => (item.cartItem.product.price * item.cartItem.qty + Number(total)).toFixed(2), 0)}</span>
                            </div>
                            <br />
                            <button className="btn btn-warning w-100 my-4" onClick={placeOrderHandler}>Place Order</button>
                        </div>
                    </div>
                </div>
            </section>
            : (!complete ? <div className="d-flex flex-column align-items-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>No Cart Items</h1>
                <Link to={'/'}>
                    <i className="bi bi-cart-plus display-4" title="Add cart items"></i>
                </Link>
            </div>
                : <div className="d-flex flex-column align-items-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <h1 className="text-success p-3 text-center display-4 fw-bold">Order Completed</h1>
                    <p className="mt-2">Your order has been placed <i className="bi bi-bag-check-fill text-warning"></i></p>
                </div>)
        }
    </>
}