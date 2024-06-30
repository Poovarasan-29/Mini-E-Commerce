import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-3 my-2" style={{ width: '350px', height: '400px', overflowY: 'hidden' }}>
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
                        <Link to={'/product/' + product._id} id="view_btn" className="btn w-100 btn-warning">View Details</Link>
                    </div>
                </div>
            </div>
        </>
    );
}