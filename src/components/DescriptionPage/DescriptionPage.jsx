import { useSelector } from 'react-redux';


const DescriptionPage = function () {
  const product = useSelector(store => store.products.singleProduct);

  return (
    <div>
      <h2>{product.brand}</h2>
      <p>{product.description}</p>
      <img src={product.image_url} alt={product.description} width='25%' />
      <p><a href={product.website_link}>See Product on Amazon</a></p>
    </div>
  )
}; // end DescriptionPage

export default DescriptionPage;