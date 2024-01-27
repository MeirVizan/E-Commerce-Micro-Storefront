import React from 'react';
import './Shop.css';
import {imager }from '../../components/utils'

const Item = ({ product }) => {
    const {  title, min_price, max_price, description, images } = product;

    return (
        <div className="product">
            <img src={imager(images ? images[0].url : "", 160, 160)} alt='' />
            <div className='description'>
                <div className="title-item">
                    <b>{title}</b>
                </div>
                <p>${min_price} {min_price !== max_price ? 
                    <><span>&nbsp;</span><span style={{ textDecoration: 'line-through' }}>{max_price}</span></> : ''}
                </p>
                <p>{description.length > 50 ?
                    `${description.substring(0, 50)}...` : description
                }</p>
            </div>
        </div>
    )
}

export default Item