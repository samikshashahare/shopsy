import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Home.css'
import ProductCard from "../ProductCard/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const searchProducts = async () => {
    if (search === '') {
      loadproducts();
      return;
    }

    const response = await axios.get(`products/search?q=${search}`);
    setProducts(response?.data?.data);
  }

  useEffect(() => {
    searchProducts();
  }, [search])

  const loadproducts = async () => {

    try {
      const responce = await axios.get("/products");
      setProducts(responce?.data?.data);
    }
    catch (err) {
      console.log(err);
      alert("error loading products")
    }
  };

  useEffect(() => {
    loadproducts();
  }, [])

  return (
    <div >
      <Navbar />
      <input type="text"
        placeholder="Search"
        className="search-bar"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }} />

      <div className="product-container">
        {
          products?.map((product, index) => {
            const { _id, name, description, price, image, category, brand } = product;

            return (
              <ProductCard
                key={index}
                name={name}
                description={description}
                price={price}
                image={image}
                category={category}
                brand={brand}
                id={_id}
              />
            )
          })
        }

      </div>
    </div>

  )
}

export default Home
