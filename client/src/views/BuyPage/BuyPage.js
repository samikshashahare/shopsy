import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import './BuyPage.css'
import { useEffect, useState } from 'react'

function BuyPage() {
    const { id } = useParams()
    const [product, setproduct] = useState({});
    const [quantity, setQuantuty] = useState(1);
    const [shippingAddress, setShippingAddress] = useState('');

    const loadproduct = async () => {
        if (!id) {
            return;
        }

        const response = await axios.get(`/product/${id}`);
        setproduct(response?.data?.data);
    }

    const increaseQuantity = () => {
        setQuantuty(quantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity === 1) {
            return;
        }

        setQuantuty(quantity - 1);
    }


    const placeOrder = async () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

        const orderDetails = {
            user: currentUser._id,
            product: id,
            quantity: quantity,
            shippingAddress: shippingAddress
        };

        const response = await axios.post('/order', orderDetails);
        alert(response?.data?.message);

        if (response?.data?.success) {
            window.location.href = '/orders';
        }
    } catch (error) {
        console.error('Error placing order:', error);
        // Handle the error (e.g., show an error message to the user)
    }
};


    useEffect(() => {
        loadproduct();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='buy-product-container'>
                <div className='buy-product-info'>
                    <div>
                        <img src={product.image} className='buy-product-image' />
                    </div>
                    <div>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>

                        <div>
                            <span className='btn-decrease-quantity'
                                onClick={decreaseQuantity}>
                                ➖</span>

                            <span className='product-quantity-text'>
                                {quantity}</span>

                            <span className='btn-increase-quantity'
                                onClick={increaseQuantity}>
                                ➕</span>


                        </div>
                        <input type='text'
                            placeholder='Enter Shipping Address'
                            className='input-Shipping-Address'
                            value={shippingAddress}
                            onChange={(e) => {
                                setShippingAddress(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <button type='button' className='btn btn-place-order' onClick={placeOrder}> place order</button>

            </div>

        </div>
    )
}

export default BuyPage