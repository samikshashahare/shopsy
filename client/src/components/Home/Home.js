import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

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
    <div className="product-create">
      <Navbar />
      {
        products?.map((product, index)=>{
const {_id, name, description, price, image, category, brand} = product;

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
  

          )
          }

export default Home