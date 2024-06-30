import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import Search from './Search';


export default function Header({ access }) {

    return (
        <header className='position-sticky top-0' style={{ zIndex: '1000' }}>
            <nav>
                <div className="row h-100 d-flex justify-content-between">
                    <div className="col-auto d-flex align-items-center ms-2">
                        <Link to='/'>
                            <img src={logo} alt="E-cart" className="img-fluid" />
                        </Link>
                    </div>

                    <div className="col-6 d-flex my-auto align-items-center">
                        <Search />
                    </div>

                    {access !== 'admin' ?
                        <div className="col-auto me-3 me-sm-4 d-flex align-items-center">
                            <Link to={'/cart'}>
                                <button className="btn btn-body btn-outline-warning me-2 me-sm-3 me-md-4" title='cart' style={{ fontWeight: '500' }}><span className='d-none d-md-inline'>Cart</span> <i className="bi bi-cart-check"></i></button>
                            </Link>
                            <Link to={'/order'}>
                                <button className="btn btn-body btn-outline-success" title='orders' style={{ fontWeight: '500' }}><span className='d-none d-md-inline'>Order</span> <i className="bi bi-bag-check-fill"></i></button>
                            </Link>
                        </div>
                        : 
                        <div className='col-auto me-4 d-flex align-items-center'>
                            <Link to={'/product/add-new-product'}>
                                <button className="btn btn-body btn-outline-warning" title='Add new Product' style={{ fontWeight: '500' }}><span className='d-none d-md-inline'>Add New Product</span> <i className="bi bi-bag-plus-fill"></i></button>
                            </Link>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
}