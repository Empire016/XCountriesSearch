import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://restcountries.com/v3.1/all");
        const data = await resp.json();
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(data);
  }, [search]);

  return (
    <div className="country-list-container">
      <h1>Countries</h1>
      <div className="inp">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="country-list">
        {search === ""
          ? countries.map((country) => {
              return (
                <div className="country" key={country.name.common}>
                  <img className="flag" src={country.flags.png} alt={country.flag}></img>
                  <span>{country.name.common}</span>
                </div>
              );
            })
          : filtered.map((country) => {
              return (
                <div className="country" key={country.name.common}>
                  <img className="flag" src={country.flags.png} alt={country.flag}></img>
                  <span>{country.name.common}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;