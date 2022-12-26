import React, { useState } from 'react';
import './Sell.css';
import $ from 'jquery';

function Sell(props) {
    const [sell, setSell] = useState(0);

    function formatInputCurrency() {
        // Jquery Dependency

        $("input[data-type='currency']").on({
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

    function sellChanged(event) {
        setSell(event.target.value);
        props.onDataReceived(event.target.value);
        formatInputCurrency();
        // console.log(event.target.value);
    }


    return (
        <div className='sell-container'>
            <div className='input-box-sell'>
                <input className='sell-input' data-type='currency' id='sell' placeholder='ریال' onChange={sellChanged} type={'text'} min={0} max={999999999999} step={500} />
                <label className='input-label' htmlFor='sell' >قیمت مسکن</label> <br></br>
            </div>
        </div>
    );
}

export default Sell;