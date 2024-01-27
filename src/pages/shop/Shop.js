import React, { useEffect, useState } from 'react';
import Item from './Item';
import "./Shop.css";
import { Link } from 'react-router-dom';
import { dividerClasses } from '@mui/material';


export const Shop = () => {
    const [data, setData] = useState([]);
    
    // Function to fetch data from the API
    const fetchData = async () => {

        const response = await fetch('https://fedtest.bylith.com/api/catalog/getAll', { mode: 'cors' });
        const res = await response.json();
        setData(res.data)
    }

    useEffect(() => {
        fetchData();
    }, []);

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2,
                width: '224px',
                marginBottom: '35px',
            }}
        />
    );


    return (
        <div className="shop">
            <div className="shop-title">
                <h3> Products </h3>
                <ColoredLine color="#9F9F9F" />

            </div>
            <div className="products">
                {data.map((item, index) => (
                    <div key={index}>
                        <Link to={`/product/${item.id}`}><Item  product={item} /></Link>
                    </div>
                ))}
            </div>
        </div>
    )
};