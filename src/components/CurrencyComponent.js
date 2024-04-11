function CurrencyComponent(props) {
  const { currencyOptions, currency, amount, handleChange, from } = props;

  const currencyOptionsElements = currencyOptions.map((option) => (
    <option value={option} key={currencyOptions.indexOf(option)}>
      {option}
    </option>
  ));

  return (
    <div className="currency--component">
      <select
        className="select"
        value={currency}
        name={`${from ? "from" : "to"}--select`}
        onChange={handleChange}
      >
        {currencyOptionsElements}
      </select>

      <input
        type="number"
        className="input"
        value={amount}
        name={`${from ? "from" : "to"}--input`}
        onChange={handleChange}
      />
    </div>
  );
}

export default CurrencyComponent;
