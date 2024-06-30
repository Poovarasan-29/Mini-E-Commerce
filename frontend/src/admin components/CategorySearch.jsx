/* eslint-disable no-unused-vars */
import { React, useState } from "react"



export default function CategorySearch({ categoryVisiblity, setCategoryVisiblity, inputs, setInputs }) {
    // const [categoryValue, setCategoryValue] = useState("");
    const [options, setOptions] = useState(["ABCD", "allao", 'aln', "EFG", "JKL<", "HID", "TEY"]);
    const [firstDisplay, setFirstDisplay] = useState(true);


    function handleCategory(e) {
        setCategoryVisiblity(true);
        setInputs((previousValue) => { return { ...previousValue, category: e.target.value } })
    }
    function handleOption(e) {
        setInputs((previousValue) => { return { ...previousValue, category: e.target.innerText } })
    }
    function toggleArrow() {
        setCategoryVisiblity(previousValue => previousValue ? false : true);
        setFirstDisplay(false);
    }


    return <div className="col-6 position-relative" style={{ userSelect: 'none' }}>
        <label className="pb-1">Category</label> <br />
        <div className="input-group">
            <input
                type="text"
                value={inputs.category}
                name="category"
                className="form-control"
                placeholder="eg : Mobile Phone"
                id="category-search-input"
                required
                onChange={handleCategory}
                onClick={() => {
                    setFirstDisplay(false);
                    setCategoryVisiblity(true);
                }}
            />
            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={toggleArrow}>
                {categoryVisiblity ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
            </span>
        </div>

        <ul className="list-unstyled" id="category" style={{ display: firstDisplay ? 'none' : 'block', animation: categoryVisiblity ? 'slideTobottom .3s linear forwards' : 'slideToTop .3s linear forwards' }} >
            {
                options.map((option, index) => {
                    if (inputs.category.length > 0) {
                        if (option.toLocaleLowerCase().includes(inputs.category.toLowerCase())) {
                            return <li onClick={handleOption} key={index}>{option}</li>
                        }
                        return false;
                    }
                    else {
                        return <li onClick={handleOption} key={index}>{option}</li>
                    }
                })
            }
        </ul>
    </div>

}
