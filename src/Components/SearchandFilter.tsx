import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import "./Styles/SearchFilter.css";
import Loading from "./Helper/Loading";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names: any = [];
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SearchandFilter = ({ onFilter,onsearch }: any) => {
  const [alldata, setalldata] = useState([]);
  const [error, seterror] = useState<any>(false);
  const [loader,setloader]=useState(false);
  

  const [searchText, setsearchText] = useState<any>("all");
  useEffect(() => {
    setloader(true)
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {setalldata(data);setloader(false)});
    //  .catch((seterror(true)))
  }, []);
  alldata?.map(({ id, region }: any) => (
    <>{names.includes(region) ? null : names.push(region)}</>
  ));

  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    onFilter(event.target.value);
    setsearchText(event.target.value)
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  if (loader) {
    return <Loading />;
  } else if (error) {
    return <div>Error</div>;
  } else {
    return (
      <div className="searchWrapper">
        <div className="searchItem">
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for a country"
            
            inputProps={{ "aria-label": "Search for a country" }}
            onChange={(e) => onsearch(e.target.value)}
          />
        </div>

        <div className="searchSelect">
          <Select
            id="demo-multiple-name"
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            placeholder="Filter by Region"
            MenuProps={MenuProps}
          >
            {names.length > 0
              ? names.map((name: any) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </div>
      </div>
    );
  }
};

export default SearchandFilter;
