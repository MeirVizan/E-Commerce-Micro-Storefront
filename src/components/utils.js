export const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
};

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to generate a random ID
export const generateRandomId = () => {
    return Math.random().toString(36).substring(2);
};


export const imager = (url, width, height) => {
    return `https://fedtest.bylith.com/api/imager.php?url=${url}&type=fit&width=${width}&height=${height}&quality=70`
}