'use client';

import { useEffect, useState } from 'react';

const ProductPage = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/users/testingpage/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.currency} {product.discounted_price}</p>
      <p>Stock Quantity: {product.stock_quantity}</p>
    </div>
  );
};

export default ProductPage;
