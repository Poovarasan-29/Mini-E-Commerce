import { React, useState } from "react";

export default function UploadImage({ handleInputs, handleCategoryVisiblity, storeImages, setStoreImages }) {
    // const images = storeImages;
    // Get images from User and Show it
    const [displayImages, setDisplayImages] = useState([]);

    // let images = []
    // for (let i in storeImages.images) {
    //     images.push(storeImages.images[i].image);
    // }
    // if (edit === "true") {
    //     setDisplayImages([...images])
    // }


    function handleChange(e) {
        try {
            const getImageURL = URL.createObjectURL(e.target.files[0]);
            const updatedImages = [...displayImages, getImageURL];
            setDisplayImages(updatedImages);
            setStoreImages([...storeImages, e.target.files[0]])
            handleInputs({ target: { name: e.target.name, value: updatedImages } });
        }
        catch {
            console.error("Image not Selected");
        }
    }

    return <>
        <div className="col-12 col-lg-6">
            <div className="input-group flex-column">
                <label className="pb-1">Add Images</label>
                <input type="file" name="image" required onChange={handleChange} onFocus={handleCategoryVisiblity} />
            </div>
        </div>
        <div className="row text-center row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 gy-3">
            {
                displayImages.map((img, index) =>
                    <div key={index}>
                        <img src={img} alt={img} title={img} className="img-fluid border p-1" style={{ height: "120px", maxWidth: "100%" }} />
                    </div>
                )
            }
        </div>
    </>
}