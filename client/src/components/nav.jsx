import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from "../assets/logo.svg"
function nav() {
    return (
        <nav className='nav'>
            <div className='logo'>
                <button><Link to="/"><Logo /></Link></button>
                <h1>Dental instruments & Equipment</h1>
            </div>
            <div className='contact_us'>
                Contact Us: <a href="tel:+995591808457">(+995) 591 80 84 57</a>
            </div>
            <div className='nav-buttons'>
                <button><Link to="/">Home</Link></button>
                <span>|</span>
                <button><Link to="/about">About</Link></button>
                <span>|</span>
                <button><Link to="/catalog">Catalog</Link></button>
            </div>
        </nav>

    )
}

export default nav