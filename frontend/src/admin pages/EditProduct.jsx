import PageTitle from "../document title/TitleFunction"
import CategorySearch from "../admin components/CategorySearch";
import { useEffect, useState } from "react";
import UploadImage from "../admin components/UploadImage";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useParams } from "react-router-dom";



export default function EditProduct() {
    PageTitle('Edit product');
    const { id } = useParams();


    const [categoryVisiblity, setCategoryVisiblity] = useState(false);
    const [storeImages, setStoreImages] = useState([]);
    const [calRequiredChars, setCalRequiredChars] = useState(100);
    const [product, setProduct] = useState();
    const [inputs, setInputs] = useState({ category: '' });

    useEffect(() => {
        // fetch(process.env.REACT_APP_API_URL + '/product/' + id)
        //     .then(res => res.json())
        //     .then(res => setInputs(() => { return { name: res.product.name, category: '' } }))

        async function getProduct() {
            await fetch(process.env.REACT_APP_API_URL + '/product/' + id)
                .then(res => res.json())
                .then(res => {
                    setInputs((previousValue) => { return { ...previousValue, name: res.product.name, stock: res.product.stock, price: res.product.price, discount: res.product.discount, category: res.product.category, images: res.product.images, description: res.product.description } })
                    setStoreImages(() => { return { images: res.product.images } })
                })
        }
        getProduct();

    }, []);


    function handleCategoryVisiblity() {
        setCategoryVisiblity(false);
    }

    function handleInputs(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((previousValue) => { return { ...previousValue, [name]: value } });

        if (name === 'description') {
            if (value.length < 100) {
                setCalRequiredChars(100 - value.length);
            }
            else
                setCalRequiredChars(0)
        }
    }

    // onSubmit form
    async function handleSubmit(e) {
        if (calRequiredChars === 0) {

            const formData = new FormData();
            for (const img in storeImages) {
                formData.append('file', storeImages[img]);
            }
            formData.append('name', inputs.name);
            formData.append('price', inputs.price);
            formData.append('description', inputs.description);
            formData.append('ratings', inputs.ratings);
            formData.append('stock', inputs.stock);
            formData.append('category', inputs.category);
            formData.append('discount', inputs.discount);

            try {

                const res = await axios.post(process.env.REACT_APP_API_URL + '/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                if (res.data.message === 'Uploaded to The Server !!') {
                    toast.success('Product Added Successfully!', {
                        autoClose: 1500,
                        pauseOnHover: false,
                    })
                }

            } catch (error) {
                console.log("API Fetching Error");
            }
        }
    }



    return inputs ? <div className="py-3" style={{ backgroundColor: 'rgba(0,0,0,.05)', minHeight: '100vh' }}>
        <div className="navbar">
            <h2 className="navbar-brand fs-3 ps-3">Edit Product - {inputs.name}</h2>
        </div>

        <main className="row px-5 py-3">
            <div className="col-12 bg-white p-4 rounded-3">
                <h5>General Information</h5>
                <hr />
                <form className="row" onSubmit={handleSubmit} action="/" encType="multipart/form-data" >
                    <div className="col-12 col-md-6">
                        <label className="pb-1">Product Name</label>
                        <i className="bi bi-person-lines-fill ms-1"></i> <br />
                        <input type="text" name="name" placeholder={inputs.name} className="form-control mb-3" required onFocus={handleCategoryVisiblity} onChange={handleInputs} />
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <label className="pb-1">Stock</label>
                        <i className="bi bi-cart-check-fill ms-1"></i> <br />
                        <input type="number" name="stock" placeholder={inputs.stock} className="form-control mb-3" required onFocus={handleCategoryVisiblity} onChange={handleInputs} />
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <label className="pb-1">Price</label> <br />
                        <div className="input-group mb-3">
                            <i className="bi bi-currency-rupee input-group-text"></i>
                            <input type="number" name="price" placeholder={inputs.price} min="0" step="0.01" className="form-control" required onFocus={handleCategoryVisiblity} onChange={handleInputs} />
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <label className="pb-1">Discount</label> <br />
                        <div className="input-group mb-3">
                            <input type="text" name="discount" placeholder={inputs.discount} min="0" step="0.01" max="99" className="form-control" required onFocus={handleCategoryVisiblity} onChange={handleInputs} />
                            <i className="bi bi-percent input-group-text"></i>
                        </div>
                    </div>

                    <CategorySearch
                        categoryVisiblity={categoryVisiblity}
                        inputs={inputs}
                        setInputs={setInputs}
                        setCategoryVisiblity={setCategoryVisiblity}
                    />

                    <UploadImage
                        handleCategoryVisiblity={handleCategoryVisiblity} handleInputs={handleInputs}
                        storeImages={storeImages}
                        setStoreImages={setStoreImages}
                    />

                    <div className="col-12">
                        <label className="mt-3 pb-1">Description</label>
                        <span className="float-end mt-4" style={{ fontSize: '13px' }}>Min : 100 Characters</span>
                        <br />
                        <textarea rows="7" name="description" className="form-control" required onFocus={handleCategoryVisiblity} onChange={handleInputs} style={{ resize: 'none' }}></textarea>
                        <p className="mt-1" style={{ fontSize: '13px' }}>Required Characters : {calRequiredChars} </p>
                    </div>
                    <div className="col mt-4 me-1">
                        <button value="submit" className="btn btn-success px-4 mx-3 py-2 float-end">Submit <i className="bi bi-bag-plus-fill"></i></button>

                        <Link to='/'>
                            <button className="btn btn-warning px-4 py-2 float-end" >Back <i className="bi bi-arrow-left-circle-fill"></i></button>
                        </Link>
                    </div>
                </form>

            </div>
        </main >

    </div > : null
}