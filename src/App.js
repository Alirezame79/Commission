import React, { useState } from 'react';
import './App.css';
import Card from './UI/Card';
import Type from './Components/Type';
import Rent from './Components/Rent';
import Sell from './Components/Sell';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [operatingType, setOperatingType] = useState('rent');
  const [finalResult, setFinalResult] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sell, setSell] = useState(0);
  const [hire, setHire] = useState(0);
  const [mortgage, setMortgage] = useState(0);

  // let mortgage = 0;
  // let hire = 0;
  // let sell = 0;

  // This function calculate the RESULT based on our rules
  function calculate() {
    const DEFAULTS = {
      MILLION5: 5000000000,
      BILLION1: 10000000000,
      BILLION2: 20000000000,
      FIRST5: 27250000,
      SECOND1: 21800000,
      THIRD2: 32700000
    }

    let result = 0;
    let temporary;
    let tax;
    // console.log(operatingType, mortgage, hire, sell);

    console.log('operatingType= ', operatingType);
    if (operatingType === 'rent') {
      let temp = parseInt(hire);
      setHire(parseInt(hire) + parseInt(mortgage * 0.025));
      temp += parseInt(Number(mortgage) * 0.025);
      // console.log("test", mortgage, " ", temp);
      temporary = temp / 6;
      tax = temporary * 0.09;
      result = Math.floor(temporary + tax);
      console.log('resultR', result)

      // if (result === 0) {
      //   setFinalResult(result);
      // }

    } else if (operatingType === 'sell') {
      if (parseInt(sell) <= 0) {
        result = 0;
        console.log('result0', result)
      } else if (sell > 0 && sell <= DEFAULTS.MILLION5) {
        temporary = sell * 0.005;
        tax = temporary * 0.09;
        result = temporary + tax;
        console.log('result5', result)
      } else if (sell > DEFAULTS.MILLION5 && sell <= DEFAULTS.BILLION1) {
        temporary = (sell - DEFAULTS.MILLION5) * 0.004;
        tax = temporary * 0.09;
        result = temporary + tax;
        result += DEFAULTS.FIRST5;
        console.log('result1', result)
      } else if (sell > DEFAULTS.BILLION1 && sell <= DEFAULTS.BILLION2) {
        temporary = (sell - DEFAULTS.BILLION1) * 0.003;
        tax = temporary * 0.09;
        result = temporary + tax;
        result += DEFAULTS.FIRST5 + DEFAULTS.SECOND1;
        console.log('result2', result)
      } else if (sell > DEFAULTS.BILLION2) {
        temporary = (sell - DEFAULTS.BILLION2) * 0.0025;
        tax = temporary * 0.09;
        result = temporary + tax;
        result += DEFAULTS.FIRST5 + DEFAULTS.SECOND1 + DEFAULTS.THIRD2;
        console.log('result2+', result)
      }
    }
    if (result === 0) {
      return false;
    }
    setFinalResult(result);
    return true;
  }

  function rentDataReceived(m, h) {
    setShowResult(false);
    const intM = m.toString().replaceAll(',', '');
    const intH = h.toString().replaceAll(',', '');
    console.log('mortgage: ', intM, '   hire: ', intH);
    // mortgage = Number(intM);
    // hire = Number(intH);
    setMortgage(intM);
    setHire(intH);
  }
  function sellDataReceived(s) {
    console.log('sell: ', s);
    setShowResult(false);
    // console.log(s, 's')
    const intS = s.toString().replaceAll(',', '');
    // sell = Number(intS);
    setSell(intS);
  }

  function typeChanged(type) {
    setOperatingType(type);
    setShowResult(false);
    // console.log(type);
  }

  function calculateBtnClicked() {
    // console.log('Calculate btn clicked!');
    const res = calculate();
    if (!res) return;
    setShowResult(true);
  }

  return (
    <Router basename='/commission'>
      <div className="body">
        <div className="App">
          <Card>
            <h2 className='app-topic'>محاسبه آنلاین حق کمیسیون<br></br>املاک رشت</h2>
            <Type onTypeChanged={typeChanged} />
            {operatingType === 'rent' ? <Rent onDataReceived={rentDataReceived} /> : <Sell onDataReceived={sellDataReceived} />}
            {!showResult ? <button className='calculate-btn' onClick={calculateBtnClicked}>محاسبه</button> : <></>}
          </Card>
          {showResult ?
            <Card>
              <h3>مبلغ قابل پرداخت طرفین معامله</h3>
              <h2 className='price-value'>{finalResult.toLocaleString('fa', {
                style: 'currency',
                currency: 'IRR',
              })}</h2>
            </Card> : <></>}

        </div>
      </div>
    </Router>
  );
}

export default App;
