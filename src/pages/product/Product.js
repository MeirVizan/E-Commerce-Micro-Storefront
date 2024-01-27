import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './product.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Alert, IconButton } from '@mui/material';
import { useCart } from '../../store/ProductStore';
import { imager } from '../../components/utils';

export const Product = () => {
    // State variables
    const [product, setProduct] = useState({});
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState({});
    const [massege, setMassege] = useState("");
    const [alert, setAlert] = useState(false);

    // Custom hook to manage cart state
    const { addToCart } = useCart();
    const { productId } = useParams();

    // Fetch product details on component mount
    const fetchProduct = async () => {
        const response = await fetch(`https://fedtest.bylith.com/api/catalog/get?id=${productId}`, { mode: 'cors' });
        const res = await response.json();
        setProduct(res.data);
    };

    // Fetch product details on component mount
    useEffect(() => {
        fetchProduct();
    }, []);

    // Function to get the image based on the selected color
    const getImage = (images) => {
        if (color !== '') {
            let img = images.find((img) => img.title === color + '.jpg');
            if (img) {
                return img.url;
            }
        }
        return images[0].url;
    };

    // Event handler for color selection
    const handleChange = (event) => {
        setColor(event.target.value);
    };

    // Event handler for size selection
    const handleChangeSize = (event) => {
        const variant = product.variants.find((variant) => variant.title === event.target.value);
        if (variant) {
            setVariant(variant);
        }
        setSize(event.target.value);
    };

    // Get size variants based on selected color
    const getSizeDataByColor = () => {
        const variants = product.variants;
        const variantsBySize = variants.filter((variant) => variant.image.title.split('.jpg')[0] === color);
        return variantsBySize;
    };

    // Add product to cart
    const saveToCart = async () => {
        // validation of input
        if (color === '' || size === '') {
            setMassege("You must enter color and size of product")
            setAlert(true);
            return;
        }

        const response = await fetch(`https://fedtest.bylith.com/api/cart/add?variant_id=${variant.id}&quantity=${quantity}`, {
            mode: "cors",
        });
        const res = await response.json();
        addToCart(res.data.items[0]);
        setMassege("The product has been successfully added to the shopping cart");
        setAlert(true);
    };

    return (
        <>
            <div className="alert">{alert && <Alert severity="info">{massege}</Alert>}</div>
            <div className="item">
                <img src={imager(product.images ? getImage(product.images) : "", 350, 450)} alt='' />
                <div className="variant-selection">
                    <div className="title-product">
                        <h1>{product.title}</h1>
                    </div>
                    <div>
                        <b>${product.min_price}</b>
                    </div>
                    <div className="desc">
                        <p>{product.description && product.description.length > 180 ?
                            `${product.description.substring(0, 180)}...` : product.description
                        }</p>
                    </div>

                    <div style={{ display: 'grid', width: '65%' }}>
                        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                            <InputLabel id="demo-select-small-label">Color</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={color}
                                label="Color"
                                onChange={handleChange}
                                style={{ height: 40 }}

                            >
                                {(product.images && product.images.length > 0) && product.images.map((img) =>

                                    <MenuItem value={img.title.split('.jpg')[0]}>{img.title.split('.jpg')[0]}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                            <InputLabel id="demo-select-small-label">Size</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={size}
                                label="Size"
                                onChange={handleChangeSize}
                                style={{ height: 40 }}
                            >
                                <MenuItem value={""}>
                                    <em>None</em>
                                </MenuItem>
                                {(product.variants && product.variants.length > 0) && getSizeDataByColor().map((img) =>

                                    <MenuItem value={img.title}>{img.title}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <div className="quantity">

                            <IconButton disabled={quantity < 2} onClick={() => setQuantity(quantity - 1)}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <p style={{ margin: 'auto' }}>{quantity}</p>
                            <IconButton onClick={() => setQuantity(quantity + 1)}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </div>
                        <button className="add-to-cart" onClick={saveToCart} >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

