// GlobalContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null); // Example additional state

    const addToCart = (service) => {
        setCart([...cart, service]);
        alert(`${service.name} added to cart!`);
    };

    const updateUser = (userInfo) => {
        setUser(userInfo);
    };

    return (
        <GlobalContext.Provider value={{ cart, addToCart, user, updateUser }}>
            {children}
        </GlobalContext.Provider>
    );
};
