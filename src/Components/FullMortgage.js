import React, { useState } from 'react';
import './FullMortgage.css'
import $ from 'jquery'

function FullRent(props) {
    const [fullRent, setFullRent] = useState(0);

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

    function FullMortgageChanged(event) {
        setFullRent(event.target.value);
        props.onDataReceived(event.target.value);
        formatInputCurrency();
        // console.log(event.target.value);
    }

    return (
        <div className='full-mortgage-container'>
            <div className='input-box-full-mortgage'>
                <input className='full-mortgage-input' data-type='currency' id='full-mortgage' placeholder='ریال' onChange={FullMortgageChanged} type={'text'} />
                <label className='input-label' htmlFor='full-mortgage' >رهن</label> <br></br>
            </div>
        </div>
    );
}

export default FullRent;