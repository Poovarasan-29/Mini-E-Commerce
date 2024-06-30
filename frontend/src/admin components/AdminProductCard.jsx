import { Link } from 'react-router-dom';


export default function AdminProductCard({ products, setProducts }) {

    function removeProductHandle(e) {
        const productID = e.target.getAttribute('productid');
        fetch(process.env.REACT_APP_API_URL + '/product/' + productID, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => setProducts(res.products))
    }

    return (
        <>
            {
                products.map((product, index) =>
                    <div className="col-12 col-md-6 col-lg-3 my-2" style={{ width: '350px', height: '400px', overflowY: 'hidden' }} key={index}>
                        <div className="card p-3 rounded border border-2 h-100">

                            <div className="image d-flex justify-content-center" style={{ width: '100%', height: '130px' }} >
                                <img src={product.images[0].image} alt={product.name} className='img-fluid' style={{ objectFit: 'contain' }} />
                            </div>

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <Link to={'/product/' + product._id} className="text-decoration-none text-dark fs-6"> {product.name} {product.description}</Link>
                                </h5>

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
                                <p className="card-text mt-1 fw-bold">${product.price}</p>
                                <div className='d-flex justify-content-between'>
                                    <button id="view_btn" productid={product._id} className="btn w-50 rounded-0 btn-danger" onClick={removeProductHandle}>Remove</button>
                                    <Link to={'/product/' + product._id} id="view_btn" className="btn w-50 rounded-0 btn-warning">Edit</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}