import React from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Detailcard from "./Detailcard";
import { Link } from "react-router-dom";
const Details = () => {
  const { id } = useParams();
  return (
    <div className="wrapper">
      <Link style={{ textDecoration: "none" }} to={"/"}>
        <button className="buttonItem backButton">
          <ArrowBackIcon />
          Back
        </button>
      </Link>

      <Detailcard countryName={id} />
    </div>
  );
};

export default Details;
