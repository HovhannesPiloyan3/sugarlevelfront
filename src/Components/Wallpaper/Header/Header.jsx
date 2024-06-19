import React from 'react';
import {Link} from "react-router-dom";
import Logo from '../../../Assets/Images/Logo/logo.png'
import './Header.scss'

const Header = (props) => (
    <div className="header">
        <nav className="header-navigation">
            <Link className="header-navigation-links" to="/">
                <img className="header-navigation-links-img" src={Logo} alt="logo"/>
            </Link>
            <Link className="header-navigation-links" to="/sugar-level">
                Уровень сахара
            </Link>
            <Link className="header-navigation-links" to="/profile">
                Профиль
            </Link>
        </nav>
    </div>
);

export default Header;