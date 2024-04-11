import { useEffect, useState } from "react";
import "./App.css";
import CurrencyComponent from "./components/CurrencyComponent";
import Header from "./components/Header";
import ConvertIcon from "./convert.png";

const BASE_CURRENCY = "USD";
const BASE_URL = process.env.REACT_APP_EXCHANGE_RATE_API;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currency, setCurrency] = useState(["USD", "EUR"]);
  const [amount, setAmount] = useState([0, 0]);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(BASE_URL + BASE_CURRENCY)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions(Object.keys(data.conversion_rates));
        setRates(data.conversion_rates);
        setCurrency(["USD", "EUR"]);
        setAmount([0, 0]);
      });
    // console.log("Fetched data");
  }, []);

  useEffect(() => {
    setAmount((prevAmount) => [
      prevAmount[0],
      parseFloat((prevAmount[0] * rates[currency[1]]).toFixed(2)),
    ]);
  }, [currency[1]]);

  useEffect(() => {
    if (currency[0] != null && currency[1] != null) {
      fetch(BASE_URL + currency[0])
        .then((res) => res.json())
        .then((data) => {
          setRates(data.conversion_rates);
        });
    }
  }, [currency[0]]);

  useEffect(() => {
    setAmount((prevAmount) => [
      prevAmount[0],
      parseFloat((prevAmount[0] * rates[currency[1]]).toFixed(2)),
    ]);
  }, [rates]);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "from--input") {
      setAmount([value, parseFloat((value * rates[currency[1]]).toFixed(2))]);
    } else if (name === "to--input") {
      setAmount([parseFloat((value / rates[currency[1]]).toFixed(2)), value]);
    } else if (name === "to--select") {
      setCurrency((prevCurrency) => [prevCurrency[0], value]);
    } else if (name === "from--select") {
      setCurrency((prevCurrency) => [value, prevCurrency[1]]);
    }
  }

  return (
    <div className="content">
      <Header />

      <div className="info">
        <h1 className="info--title">Currency Converter & Exchange Rate</h1>
        <h5 className="info--subtitle">Real-time FX Rates at All Times</h5>
      </div>

      <div className="board">
        <CurrencyComponent
          handleChange={handleChange}
          currencyOptions={currencyOptions}
          currency={currency[0]}
          amount={amount[0]}
          from={true}
        />
        <img src={ConvertIcon} className="convert--icon" alt="Convert" />
        <CurrencyComponent
          handleChange={handleChange}
          currencyOptions={currencyOptions}
          currency={currency[1]}
          amount={amount[1]}
          from={false}
        />
      </div>

      <div className="info">
        <h2>{`${amount[0]} ${currency[0]} = ${amount[1]} ${currency[1]}`}</h2>
        <h6>Mid-marked exchange rate at {new Date().toUTCString()}</h6>
      </div>
    </div>
  );
}

export default App;
