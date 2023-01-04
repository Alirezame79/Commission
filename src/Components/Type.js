import React, { useState } from 'react';
import './Type.css';

function Type(props) {
    const [type, setType] = useState('rent');           // Type => rent / sell / fullRent

    function rentClicked() {    // Rent radio-btn Clicked
        setType('rent');
        props.onTypeChanged('rent');
        console.log('Rent is Clicked!');
    }

    function fullMortgageClicked() {    // Full Mortgage radio-btn Clicked
        setType('fullMortgage');
        props.onTypeChanged('fullMortgage');
        console.log('Full Mortgage is Clicked!');
    }

    function sellClicked() {    // Sell radio-btn Clicked
        setType('sell');
        props.onTypeChanged('sell');
        console.log('Sell is Clicked!');
    }

    return (
        <div className='type'>
            <div>
                <input className='radio-btn' type="radio" onClick={sellClicked} id="sell" name="category" value="sell" />
                <label className='radio-btn-label' htmlFor='sell'>خرید و فروش</label><br></br>
            </div>
            <div>
                <input className='radio-btn' type="radio" onClick={fullMortgageClicked} id="full-mortgage" name="category" value="full-mortgage" />
                <label className='radio-btn-label' htmlFor='full-mortgage'>رهن کامل</label><br></br>
            </div>
            <div>
                <input className='radio-btn' type="radio" onClick={rentClicked} defaultChecked id="rent" name="category" value="rent" />
                <label className='radio-btn-label' htmlFor='rent'>رهن و اجاره</label><br></br>
            </div>
        </div>
    );
}

export default Type;