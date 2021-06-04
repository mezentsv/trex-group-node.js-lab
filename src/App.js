import { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import "./App.css";

const RATES_URL = "https://www.nbrb.by/api/exrates/rates?periodicity=0";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState({
    id: "",
    abbr: "",
    name: "",
    rate: "",
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
    setSelectedCurrency({
      id: trargetCurrency.Cur_ID,
      abbr: trargetCurrency.Cur_Abbreviation,
      name: trargetCurrency.Cur_Name,
      rate: trargetCurrency.Cur_OfficialRate,
    });
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

  return (
    <div className="App">
      <div className="wrapper">
        <div className="national-currency">
          <h1>1</h1>
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
        <h1>
          {Number(selectedCurrency.rate).toFixed(2)}
          <span> Белорусских Рубля</span>
        </h1>
      </div>
    </div>
  );
}

export default App;
