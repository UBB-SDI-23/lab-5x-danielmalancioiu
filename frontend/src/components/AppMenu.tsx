import { Box, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import FlightIcon from "@mui/icons-material/Flight";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";

// export const AppMenu = () => {
//   const location = useLocation();
//   const path = location.pathname;

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed" sx={{ marginBottom: "20px" }}>
//         <Toolbar>
//           <IconButton
//             component={Link}
//             to="/"
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="school"
//             sx={{ mr: 5 }}
//           >
//             <SchoolIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ mr: 5 }}>
//             Booking management
//           </Typography>
//           <Button
//             variant={path.startsWith("/bookings") ? "outlined" : "text"}
//             to="/bookings"
//             component={Link}
//             color="inherit"
//             sx={{ mr: 5 }}
//             startIcon={<LocalLibraryIcon />}
//           >
//             Bookings
//           </Button>

//           <Button
//             variant={path.startsWith("/flights") ? "outlined" : "text"}
//             to="/flights"
//             component={Link}
//             color="inherit"
//             sx={{ mr: 5 }}
//             startIcon={<FlightIcon />}
//           >
//             Flights
//           </Button>

//           <Button
//             variant={path.startsWith("/airlines") ? "outlined" : "text"}
//             to="/airlines"
//             component={Link}
//             color="inherit"
//             sx={{ mr: 5 }}
//             startIcon={<LocalLibraryIcon />}
//           >
//             Airlines
//           </Button>

//           <Button
//             variant={path.startsWith("/passengers") ? "outlined" : "text"}
//             to="/passengers"
//             component={Link}
//             color="inherit"
//             sx={{ mr: 5 }}
//             startIcon={<PeopleIcon />}
//           >
//             Passengers
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (isOpen: boolean | ((prevState: boolean) => boolean)) => () => {
    setIsDrawerOpen(isOpen);
  };

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
      <Box sx={{ flexGrow: 1 }}>
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
            Booking management
          </Typography>
        </Toolbar>
      </Box>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};
