import { useState } from 'react';
import { useDispatch } from 'react-redux';


const AddProduct = function () {
  // set dispatch for use
  const dispatch = useDispatch();

  // make local states for form
  const [productBrand, setProductBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [asin, setAsin] = useState('');

  const clearValues = function () {
    setProductBrand('');
    setProductCategory('');
    setImageUrl('');
    setWebsiteUrl('');
    setDescription('');
    setAsin('');
  }; // end clearValues

  const buttonClicked = function (e) {
    e.preventDefault();

    dispatch({
      type: 'ADD_PRODUCT',
      payload: {
        brand: productBrand,
        category: productCategory,
        image_url: imageUrl,
        website_link: websiteUrl,
        description: description,
        asin_number: asin
      }
    })

    console.log(productBrand,
      productCategory,
      imageUrl,
      websiteUrl,
      description,
      asin
      );

      clearValues();
  }; // end buttonClicked

  return (
    <div>
      <h4>Add a product here</h4>
      <form >
        <input value={productBrand} type="text" placeholder="Item Brand" onChange={(e)=>setProductBrand(e.target.value)} />

        <input value={productCategory} type="text" placeholder="Category" onChange={(e)=>setProductCategory(e.target.value)} />

        <input value={imageUrl} type="text" placeholder="Image URL" onChange={(e)=>setImageUrl(e.target.value)} />

        <input value={websiteUrl} type="text" placeholder="Website URL" onChange={(e)=>setWebsiteUrl(e.target.value)} />

        <input value={description} type="text" placeholder="Product Description" onChange={(e)=>setDescription(e.target.value)} />

        <input value={asin} type="text" placeholder="ASIN number" onChange={(e)=>setAsin(e.target.value)} />

        <button onClick={buttonClicked}>Click Me</button>
      </form>
    </div>
  )
}; // end AddProduct

export default AddProduct;