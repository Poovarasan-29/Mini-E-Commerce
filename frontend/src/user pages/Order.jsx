import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../document title/TitleFunction";
import { toast } from "react-toastify";
import Header from "../components/Header";



export default function Order() {

    const [orders, setOrders] = useState([])
    PageTitle('My Order')

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/order')
            .then(res => res.json())
            .then(res => setOrders(res.orders))
    }, [])

    function cancelOrderHandle(order) {

        toast.success('Order Cancelled', {
            autoClose: 2000
        })
        setTimeout(() => {
            fetch(process.env.REACT_APP_API_URL + '/order/' + order._id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(res => setOrders(res.orders))
        }, 1900)
    }


    return <>
        <Header />
        {
            orders.length !== 0 ? <Fragment>
                <p className="fs-5 mt-4 ms-4">Total Items : <b>{orders.length}</b></p>
                <br />
                <section className="px-sm-3 container" style={{ paddingBottom: '90px' }}>

                    {orders.map((order, OrderIndex) =>
                        <div className="row border mb-4 " key={OrderIndex}>

                            <div className="row bg-dark mx-auto text-center text-light">
                                <div className="col py-3"><span>Total Amount <span className="d-none d-md-inline">: </span><span className="d-block d-md-inline">${order.amount}</span></span></div>
                                <div className="col bg-secondary py-3"><span className="mx-auto">Payment<span className="d-none d-md-inline"> : </span><span className="d-block d-md-inline">Pending</span></span></div>
                                <div className="col py-3"><span className="mx-auto">Status<span className="d-none d-md-inline"> : </span><span className="d-block d-md-inline">Shipping</span></span></div>
                            </div>
                            {
                                order.cartItems.map((cart, CartIndex) =>
                                    <div className={order.cartItems.length === 1 ? "col-12" : "col-12 col-lg-6"} key={CartIndex}>
                                        <div className="row shadow h-100 py-3 border rounded">
                                            <div className="col-5 d-flex flex-column justify-content-center">
                                                <img src={cart.product.images[0].image} alt="" className="img-fluid mx-auto" style={{ width: '130px', height: '130px' }} />
                                            </div>
                                            <div className="col-7 d-flex  flex-column justify-content-between">
                                                <h5>
                                                    <Link to={'/product/' + cart.product._id} className="text-decoration-none text-dark fs-6"> {cart.product.name}</Link>
                                                </h5>
                                                <div className="minus-plus-btn d-flex pb-1 flex-column">
                                                    <span><b>Quantity :</b> {cart.qty}</span>
                                                    <span><b>Price : </b>${cart.product.price}</span>
                                                    <span><b>Total Amount :</b> ${cart.product.price * cart.qty}</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="p-0">
                                <button className="btn btn-danger w-50 rounded-0 py-2" onClick={() => cancelOrderHandle(order)}>Cancel Order</button>
                                <button className="btn btn-success w-50 rounded-0 py-2">Pay Online</button>
                            </div>
                        </div>
                    )
                    }
                    {/* <div className="border" id="cancelOrder">
                <p className="py-4 my-auto text-center">Are you sure to cancel order?</p>
                <div>
                    <button className="btn btn-danger w-50 rounded-0 py-2">Yes</button>
                    <button className="btn btn-success w-50 rounded-0 py-2">No</button>
                </div>
            </div> */}
                </section>
            </Fragment>
                : <Fragment>
                    <div className="d-flex flex-column align-items-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                        <h1>No Order Items</h1>
                        <Link to={'/'}>
                            <i className="bi bi-cart-plus display-4"></i>
                        </Link>
                    </div>
                </Fragment>
        }
    </>
}