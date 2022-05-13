import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import SearchandFilter from "./SearchandFilter";
import Loading from "./Helper/Loading";
import "./Styles/HomeComponent.css";
const HomeComponent = () => {
  const [countriesName, setcountriesName] = useState([]);
  const [loader, setloader] = useState(false);
  const [onSearch, setonSearch] = useState<any>();


  useEffect(() => {
    setloader(false);
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setcountriesName(data);
        setonSearch(data)
        setloader(false);
      });
  }, []);

  const filtervalueHandler = (dataz: any) => {
    fetch(`https://restcountries.com/v3.1/region/${dataz}`)
      .then((res) => res.json())
      .then((data) => {setcountriesName(data);setonSearch(data)});
  };
 
  const onSearchHandler = (data: any) => {
    setonSearch(
      countriesName.filter((item: any) => item.name.common.includes(data))
    );
  };

  if (loader) {
    return <Loading />;
  } else {
    return (
      <div className="wrapper ">
        <SearchandFilter
          onFilter={filtervalueHandler}
          onsearch={onSearchHandler}
        />
        <div className="cardRow">
          {countriesName.length &&
            onSearch?.map(
              ({ id, name, region, capital, population, flags }: any) => (
                <CardComponent
                  key={id}
                  cName={name.common}
                  regionName={region}
                  capitalName={capital}
                  populationCount={population}
                  countryFlag={flags.png}
                  countryFlagAlt={flags.svg}
                />
              )
            )}
        </div>
      </div>
    );
  }
};
export default HomeComponent;
