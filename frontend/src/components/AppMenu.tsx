import { Box, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Drawer, colors } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import FlightIcon from "@mui/icons-material/Flight";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { StorageService } from '../services/StorageService';


const menuItems = [
  {
    text: "Bookings",
    icon: <BookIcon />,
    path: "/bookings"
  },
  {
    text: "Flights",
    icon: <FlightIcon />,
    path: "/flights"
  },
  {
    text: "Airlines",
    icon: <AirlineSeatReclineExtraIcon />,
    path: "/airlines"
  },
  {
    text: "Passengers",
    icon: <SchoolIcon />,
    path: "/passengers"
  }
];


export const AppMenu = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [roles, setRoles] = useState([]);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    initialiseNavbar();

  }, []);

  const initialiseNavbar = () => {
    //setIsLoggedIn(!!sessionStorage.getItem('auth-user'));
    setIsLoggedIn(StorageService.isLoggedIn());

    console.log('Logged in' + ' ' + StorageService.isLoggedIn());
    //console.log('Logged in' + ' ' + isLoggedIn);
    const user = StorageService.getUser();
    setUsername(user.username);
    //console.log(user.username);
    console.log(user)
    //console.log(isLoggedIn);
    if (StorageService.isLoggedIn()) {
      //const user = JSON.parse(sessionStorage.getItem('auth-user') ?? '{}');
      //const user = StorageService.getUser();
      setRoles(user.roles);
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
      console.log('admin board' + ' ' + showAdminBoard);
      setUsername(user.username);
      console.log(username);

    }
    console.log(roles);
  };

  const httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  const toggleDrawer = (isOpen: boolean | ((prevState: boolean) => boolean)) => () => {
    setIsDrawerOpen(isOpen);
  };

  function login(username: string, password: string) {
    return axios.post(
      `${BACKEND_API_URL}/auth/signin`,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  function register(username: string, password: string) {
    return axios.post(
      `${BACKEND_API_URL}/auth/register`,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  function confirmRegistration(token: string) {
    console.log(`${BACKEND_API_URL}/auth/register/${token}`)
    return axios.post(`${BACKEND_API_URL}/auth/register/${token}`, httpOptions);
  }


  const logout = () => {
    StorageService.clean();
    //StorageService.updateUserField('rowsPerPage',10);
    setIsLoggedIn(false);
    setShowAdminBoard(false);
    navigate('/');
    window.location.reload();
    return axios.post(`${BACKEND_API_URL}/auth/signout`, httpOptions);

  }


  const drawer = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0"
      }}
    >

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname.startsWith(item.path)}
            component={Link}
            to={item.path}
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ position: "fixed", top: 0, left: 0, backgroundColor: "#22bd4b", width: '100%', color: 'white' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Airport management
          </Typography>
          {/* {isLoggedIn && (
      
          )} */}
          {!isLoggedIn && (
            <>
              <Typography variant="h6" component="div" style={{ marginLeft: "auto" }}>
                Guest
              </Typography>
              <Button variant="contained" color="secondary" component={Link} to="/login" style={{ marginLeft: "auto" }}>
                Login
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ml: 40}}>
                <Typography variant="h6" component={Link} to={`/profile/${username}`} style={{ marginLeft: "auto" }}>
                  Welcome,  {username} !
                </Typography>

                {showAdminBoard && (
                  <Button variant="contained" color="secondary" component={Link} to="/admin" sx={{ml:20}}>
                    Admin Board
                  </Button>
                )}
                <Button variant="contained" color="secondary" onClick={logout} sx={{ml: 20}}>
                  Logout
                </Button>
              </Box>


            </>
          )}
        </Toolbar>
      </Box>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};
