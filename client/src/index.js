import ReactDOM from 'react-dom/client';
import "./index.css"
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Home from './components/Home/Home';
import MyOrders from './views/MyOrders/MyOrders';
import BuyPage from './views/BuyPage/BuyPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/myorders',
    element:<MyOrders />
  },
  {
    path:'/buy/:id',
    element:<BuyPage />
  }
])

root.render(
<RouterProvider router={router}/>
);

