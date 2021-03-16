import { useSelector } from 'react-redux';


const DescriptionPage = function () {
  const product = useSelector(store => store.products.singleProduct);

  const likeProduct = function () {
    console.log('product liked');
  }; // ene likeProduct

  const hateProduct = function () {
    console.log('product hated');
  }; // end hateProduct
  return (
    <div>
      <h2>{product.brand}</h2>
      <p>{product.description}</p>
      <img src={product.image_url} alt={product.description} width='12%' />
      <p><a href={product.website_link}>See Product on Amazon</a></p>
      <button onClick={likeProduct}>Like this Product</button>
      <button onClick={hateProduct}>Hate this Product</button>
    </div>
  )
}; // end DescriptionPage

export default DescriptionPage;