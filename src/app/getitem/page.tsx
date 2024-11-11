"use client";

import { useEffect, useState } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch products from the backend when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/users/getitem');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <img src={product.image_url} alt={product.name} />
                        <p>Calories: {product.calories}</p>
                        <p>Protein: {product.protein}</p>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price} {product.currency}</p>
                        <p>Available: {product.is_available ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
