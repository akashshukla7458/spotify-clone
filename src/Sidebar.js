import React, { useState } from 'react'
import "./Sidebar.css"
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from './DataLayer';
function Sidebar() {

  const [{ playlists }, dispatch] = useDataLayerValue()
  return (
    <div className="sidebar">
      <img
        className='sidebar_logo'
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" />
      <SidebarOption Icon={HomeIcon} option="Home" />
      <SidebarOption Icon={SearchIcon}  option="Search" />
      <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
      <br />
      <SidebarOption Icon={FavoriteIcon} style={{color: 'red'}} option="Liked Songs" />
      <hr />
      <strong className='sidebar_option'>Taylor Swift Mix</strong>
      <br />
      <strong className='sidebar_option'>Marron5 Mix</strong>
      <br />
      <strong className='sidebar_option'>Lofi nights</strong>
     

      {playlists?.items?.map((playlist) => (
        <SidebarOption option={playlist.name} />
      ))}
    </div>
  )
}

export default Sidebar 
