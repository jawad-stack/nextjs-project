async function fetchProductData(id) {
    // Mock API call or fetch from an actual API
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    return product;
  }
  
  export default async function ProductPage({ params }) {
    const product = await fetchProductData(params.id);
  
    return (
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    );
  }
  