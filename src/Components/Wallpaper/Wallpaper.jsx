import React from 'react';
import "./Wallpaper.scss"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Wallpaper = ({children}) => (
    <div className="wallpaper-container">
        <Header/>
        {children}
        <Footer/>
    </div>
);

export default Wallpaper;