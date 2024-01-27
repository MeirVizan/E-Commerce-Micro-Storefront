import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import './Navbar.css'
import { Badge } from '@mui/material';
import { useCart } from '../store/ProductStore';

export const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useCart();
    const totalQuantity = cart.reduce((acc, qty) => acc + qty.quantity, 0);

    return (
        <nav>
            <Link to="/" className="title"><img src={process.env.PUBLIC_URL + "/Logo.jpg"} alt="example" /></Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li><NavLink to="/">Home</NavLink></li>
                <li>
                    <NavLink to="/cart">
                        <Badge color="secondary" badgeContent={totalQuantity } showZero><ShoppingCart size={25} />
                        </Badge></NavLink>
                </li>

            </ul>
        </nav>
    )
}
