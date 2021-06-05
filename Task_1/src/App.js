import { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem, InputLabel, Input } from "@material-ui/core";
import "./App.css";

const RATES_URL = "https://www.nbrb.by/api/exrates/rates?periodicity=0";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState({
    id: "",
    abbr: "",
    name: "",
    rate: "",
  });
  const [currencyVals, setCurrencyVals] = useState({
    baseCurr: 1,
    appliedCurr: 1,
  });

  const [currencyList, setCurrencyList] = useState([]);

  const getCurrencies = async () => {
    try {
      const response = await axios.get(RATES_URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrency = (currAbbr, list) => {
    const trargetCurrency = list.find(
      ({ Cur_Abbreviation }) => Cur_Abbreviation === currAbbr
    );
    const rate = trargetCurrency.Cur_OfficialRate / trargetCurrency.Cur_Scale;
    setSelectedCurrency({
      id: trargetCurrency.Cur_ID,
      abbr: trargetCurrency.Cur_Abbreviation,
      name: trargetCurrency.Cur_Name,
      rate,
    });
    setCurrencyVals({ baseCurr: Math.round(rate * 100) / 100, appliedCurr: 1 });
  };

  useEffect(() => {
    getCurrencies().then((data) => {
      setCurrencyList(data);
      getCurrency("USD", data);
    });
  }, []);

  const handleSelect = (e) => {
    e.preventDefault();
    const currentCurrencyAbbr = e.target.value;
    getCurrency(currentCurrencyAbbr, currencyList);
  };

  const handleCurrentCurrValChange = (e, currType = "national") => {
    e.preventDefault();
    const value = +e.target.value < 0 ? +e.target.value * -1 : +e.target.value;
    let newVal;
    if (currType === "base") {
      newVal = value / selectedCurrency.rate;
      setCurrencyVals({
        baseCurr: value || "",
        appliedCurr: Math.round(newVal * 100) / 100 || "",
      });
    } else if (currType === "national") {
      newVal = value * selectedCurrency.rate;
      setCurrencyVals({
        baseCurr: Math.round(newVal * 100) / 100 || "",
        appliedCurr: value || "",
      });
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="national-currency">
          <div>
            <InputLabel id="applied-curr">Enter Value</InputLabel>
            <Input
              id="applied-curr"
              type="number"
              value={currencyVals.appliedCurr}
              onChange={handleCurrentCurrValChange}
            />
          </div>

          <div>
            <InputLabel id="currency">Choose Currency</InputLabel>
            <Select
              labelId="currency"
              id="select"
              value={selectedCurrency.abbr}
              onChange={handleSelect}
            >
              {currencyList.map(({ Cur_ID, Cur_Abbreviation, Cur_Name }) => {
                return (
                  <MenuItem key={Cur_ID} value={Cur_Abbreviation}>
                    {Cur_Name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
        <span>–</span>
        <div className="base-currency">
          <Input
            id="base-curr"
            type="number"
            value={currencyVals.baseCurr}
            onChange={(e) => handleCurrentCurrValChange(e, "base")}
          />
          <h1>Белорусских Рубля</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
