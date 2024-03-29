import React from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import { useDataLayerValue } from "./DataLayer";

function Header({ spotify }) {
  const [{ user }, dispatch] = useDataLayerValue();

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon/>
        <input className="holder"
          placeholder ="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.images[0].url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;