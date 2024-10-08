// src/app/products/page.js
"use client"; // Marking this component as a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const fetchProductsData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    return products;
};

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5; // Change this to set the number of products per page

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProductsData();
            setProducts(data);
        };

        loadProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div>
            <h1>Product Listing</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {currentProducts.map((product) => (
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}>
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={20}
                                height={20}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductListingPage;
