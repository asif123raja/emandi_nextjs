'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  name: string;
  image_url: string;
  description: string;
  currency: string;
  discounted_price: number;
  stock_quantity: number;
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/users/testingpage/${params.productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="mb-4">
        <Image
          src={product.image_url}
          alt={product.name}
          width={500}
          height={300}
          priority
          className="rounded-lg"
        />
      </div>
      <p className="mb-4">{product.description}</p>
      <p className="mb-2">
        Price: {product.currency} {product.discounted_price}
      </p>
      <p>Stock Quantity: {product.stock_quantity}</p>
    </div>
  );
}
