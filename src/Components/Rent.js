import React, { useState } from 'react';
import './Rent.css';
import $ from 'jquery';

function Rent(props) {
    const [mortgage, setmortgage] = useState(0);
    const [hire, setHire] = useState(0);

    function formatInputCurrency() {
        // Jquery Dependency


        $("#mortgage").on({
            keyup: function () {
                formatCurrency($(this));
            },
            blur: function () {
                formatCurrency($(this), "blur");
            }
        });

        $("#hire").on({
            keyup: function () {
                formatCurrency($(this));
            },
            blur: function () {
                formatCurrency($(this), "blur");
            }
        });


        function formatNumber(n) {
            // format number 1000000 to 1,234,567
            return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }


        function formatCurrency(input, blur) {
            // console.log(input, "myInput");
            var input_val = input.val();
            if (input_val === "") { return; }
            var original_len = input_val.length;
            var caret_pos = input.prop("selectionStart");
            if (input_val.indexOf(".") >= 0) {

            } else {
                input_val = formatNumber(input_val);

            }

            input.val(input_val);
            var updated_len = input_val.length;
            caret_pos = updated_len - original_len + caret_pos;
            input[0].setSelectionRange(caret_pos, caret_pos);
        }

    }

    function mortgageChanged(event) {
        setmortgage(event.target.value);
        props.onDataReceived(event.target.value, hire);
        formatInputCurrency();
    }


    function hireChanged(event) {
        setHire(event.target.value);
        props.onDataReceived(mortgage, event.target.value);
        formatInputCurrency();
    }

    return (
        <div className='rent-container'>
            <div className='input-box'>
                <input className='rent-inputs' data-type='currency' id='hire' placeholder='تومان' onChange={hireChanged} type={'text'} />
                <label className='input-label' htmlFor='hire' >اجاره</label> <br></br>
            </div>
            <div className='input-box'>
                <input className='rent-inputs' data-type='currency' id='mortgage' placeholder='تومان' onChange={mortgageChanged} type={'text'} />
                <label className='input-label' htmlFor='mortgage'>رهن</label> <br></br>
            </div>
        </div>
    );
}

export default Rent;