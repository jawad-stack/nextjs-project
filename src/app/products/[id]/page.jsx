// src/app/products/[id]/page.js
import Image from 'next/image';

const fetchProductData = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await response.json();
  return product;
};

const ProductDetailPage = async ({ params }) => {
  const product = await fetchProductData(params.id);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Image 
        src={product.image} 
        alt={product.title} 
        width={200} 
        height={200} 
        style={{ maxWidth: '100%', height: 'auto' }} 
      />
    </div>
  );
};

export default ProductDetailPage;
