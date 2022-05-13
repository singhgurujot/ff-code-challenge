import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import Loading from "./Helper/Loading";
import ErrorPage from "./Helper/ErrorPage";
import "./Styles/DetailCard.css";
const Detailcard = ({ countryName }: any) => {
  const [dataByCountryName, setdataByCountryName] = useState([]);
  const [countryname, setcountryname] = useState(countryName);
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryname}`)
      .then((res) => res.json())
      .then((data) => setdataByCountryName(data));
  }, [countryname]);
  let detailsObject: any = {};
  function testing() {
    dataByCountryName.length > 0 &&
      dataByCountryName.map(
        ({
          id,
          name,
          tld,
          population,
          currencies,
          region,
          languages,
          subregion,
          capital,
          flags,
          borders,
        }: any) =>
          (detailsObject = {
            nativeName: name.nativeName,
            domain: tld[0],
            population: population,
            currencies: Object.values(currencies)[0],
            region: region,
            languages: Object.values(languages),
            subregion: subregion,
            capital: capital,
            flags: flags,
            border: borders,
            name:name,
          })
      );
  }
  if (dataByCountryName.length > 0) {
    testing();
  }
  const borderCountriesHandler = (cName: any) => {
    setcountryname(cName);
  };
  console.log(dataByCountryName);
  
  
  const card = (
    <React.Fragment>
      {dataByCountryName.length > 0 && (
        <CardContent>
          {detailsObject.name&&( <h1>{detailsObject.name.common}</h1>)}
         
          <ul>
            <li>
              <span>Native Name:</span>
              {
                detailsObject.nativeName[
                  Object.keys(detailsObject.nativeName)[0]
                ]["common"]
              }
            </li>
            <li>
              <span>Top Level Doman</span>
              {detailsObject.domain}
            </li>
            <li>
              <span>Population:</span>
              {detailsObject.population}
            </li>
            <li>
              <span>Currencies:</span>
              {detailsObject.currencies.name}
            </li>
            <li>
              <span>Region:</span>
              {detailsObject.region}
            </li>
            <li>
              <span>Languages:</span>
              {detailsObject.languages.map((item: any, index: any) => (
                <li key={index}>{item}</li>
              ))}
            </li>
            <li>
              <span>Sub Region:</span>
              {detailsObject.subregion}
            </li>
            <li>
              <span>Captial:</span>
              {detailsObject.capital[0]}
            </li>
          </ul>
        </CardContent>
      )}
    </React.Fragment>
  );
  if (dataByCountryName.length <= 0) {
    return <Loading />;
  } else if(Array.isArray(dataByCountryName)) {
    return (
      <div className=" detailCardWrapper">
        <div className="cardWrapper">
          <Card>
            <CardMedia
              component="img"
              image={detailsObject.flags.svg}
              alt={detailsObject.flags.svg}
            />
          </Card>
        </div>
        <div className="cardText">
          <Box>
            <Card variant="outlined">{card}</Card>
          </Box>
          <div className="buttonRow">
            <span>Border Countries</span>
            {detailsObject.border &&
              detailsObject.border?.map((item: any) => (
                <button
                  onClick={() => borderCountriesHandler(item)}
                  className="buttonItem"
                >
                  {item}
                </button>
              ))}
          </div>
        </div>
        
      </div>
    );
   
  }
  else{
      return(
        <div>
         <ErrorPage/>
        </div>
      )
  }
};

export default Detailcard;
