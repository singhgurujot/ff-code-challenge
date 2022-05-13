import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import "./Styles/CardComponent.css";
const CardComponent = ({
  cName,
  regionName,
  capitalName,
  populationCount,
  countryFlag,
  countryFlagAlt,
}: any) => {
  return (
    <div className="cardWrapper">
      <Link to={`/details/${cName}`} style={{ textDecoration: "none" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="194"
            image={countryFlag}
            alt={countryFlagAlt}
          />
          <CardContent>
            <h4> {cName}</h4>
            <p>
              <span>Poppualtion</span> {populationCount}
            </p>
            <p>
              <span>Region</span> {regionName}
            </p>
            <p>
              <span>Capital</span> {capitalName}
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardComponent;
