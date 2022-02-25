import React from 'react';
import PropTypes from 'prop-types'

const  Header= ({titutlo}) => {
    return (  
        <nav>
            <div className='nav-wrapper light-blue darken-2'>
                <a href="#!" className='brand-logo'>{titutlo}</a>
            </div>
        </nav>
    );
}
Header.propTypes ={
    titutlo:PropTypes.string.isRequired
}
export default Header;