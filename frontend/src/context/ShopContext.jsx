import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const deliveryFee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId, size },
                    { headers: { token } },
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        // ❗ If quantity is 0 → REMOVE it instead of storing 0
        if (quantity <= 0) {
            delete cartData[itemId][size];

            // If no sizes left, remove product completely
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        setCartItems(cartData);

        try {
            await axios.post(
                backendUrl + "/api/cart/update",
                { itemId, size, quantity },
                { headers: { token } },
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) { }
            }
        }

        return totalCount;
    };

    const cartAmount = () => {
        let totalAmt = 0;

        // If products not loaded yet, don't calculate
        if (!products.length) return 0;

        for (const items in cartItems) {
            const iteminfo = products.find((product) => product._id === items);

            // Product might not exist yet → skip safely
            if (!iteminfo) continue;

            for (const item in cartItems[items]) {
                const quantity = cartItems[items][item];

                if (quantity > 0) {
                    totalAmt += iteminfo.price * quantity;
                }
            }
        }

        return totalAmt;
    };

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
    try {
        const response = await axios.post(
            backendUrl + '/api/cart/get',
            {},
            { headers: { token } }
        );

        if (response.data.success) {

            const cleanedCart = {};

            for (const productId in response.data.cartData) {
                for (const size in response.data.cartData[productId]) {

                    const qty = response.data.cartData[productId][size];

                    if (qty > 0) {
                        if (!cleanedCart[productId]) cleanedCart[productId] = {};
                        cleanedCart[productId][size] = qty;
                    }
                }
            }

            setCartItems(cleanedCart);
        }

    } catch (error) {
        console.log(error);
    }
};

    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
    }, []);

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        cartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
    };

    return (
        <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
    );
};

export default ShopContextProvider;
