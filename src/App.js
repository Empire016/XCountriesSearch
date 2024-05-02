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
        setFiltered(data); // Initially set filtered countries to all countries
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
  }, [countries, search]);

  console.log(countries);
  return (
    <div>
      <div className="inp">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="App">
        {countries.length > 0 ? (
          search === "" ? (
            countries.map((country) => {
              return (
                <div className="countryCard" key={country.name.common}>
                  <img src={country.flags.png} alt={country.flag}></img>
                  <p>{country.name.common}</p>
                </div>
              );
            })
          ) : (
            filtered.map((country) => {
              return (
                <div className="countryCard" key={country.name.common}>
                  <img src={country.flags.png} alt={country.flag}></img>
                  <p>{country.name.common}</p>
                </div>
              );
            })
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
