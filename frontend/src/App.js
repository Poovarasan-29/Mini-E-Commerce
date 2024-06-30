import Footer from './components/Footer';
import Header from './components/Header';
import Home from './user pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './user pages/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './user pages/Cart';
import Order from './user pages/Order';
import AdminHome from './admin pages/AdminHome';
import AddNewProduct from './admin pages/AddNewProduct';
import EditProduct from './admin pages/EditProduct';


function App() {

    return (
        // <div>
        //     <Router>
        //         <div>
        //             <ToastContainer theme='dark' position='top-center' />
        //             <Routes>
        //                 <Route path='/' element={<Home />} />
        //                 <Route path='/search?' element={<Home />} />
        //                 <Route path='/product/:id' element={<ProductDetails />} />
        //                 <Route path='/cart' element={<Cart />} />
        //                 <Route path='/order' element={<Order />} />
        //             </Routes>
        //             <Footer />
        //         </div>
        //     </Router>
        // </div>

        <div>
            <Router>
                <ToastContainer theme='dark' position='top-center' />
                <Routes>
                    <Route path='/' element={<AdminHome />} />
                    <Route path='/search?' element={<AdminHome />} />
                    {/* <Route path='/product/:id' element={<EditProduct />} /> */}
                    <Route path='/product/add-new-product' element={<AddNewProduct />} />
                </Routes>
            </Router>
        </div>


    );
}

export default App;
