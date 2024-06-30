import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Search() {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate(`/search?keyword=${keyword}`);
    }
    const inputHandler = (e) => {
        const inputValue = e.target.value;
        setKeyword(inputValue);
        if (inputValue.length === 0)
            navigate('/')
    }


    return <>
        <div className="col">
            <input
                type="search"
                name=""
                id=""
                onChange={inputHandler}
                placeholder="Enter Product Name"
                className="form-control px-2" />
        </div>
        <div className="col-auto ms-1">
            <button className="btn btn-warning" onClick={searchHandler}>
                <i className="bi bi-search" aria-hidden='false'></i>
            </button>
        </div>
    </>
}