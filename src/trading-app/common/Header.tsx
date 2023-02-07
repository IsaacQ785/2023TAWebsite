import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStockTickers } from "../views/AnalysisPage/useStockTickers";

interface NavItem {
  route: string;
  name: string;
}

const navItems: NavItem[] = [
  {
    route: "/",
    name: "Home",
  },
  {
    route: "/analysis",
    name: "Trade Analyser",
  },
  {
    route: "/user",
    name: "User",
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string>("");
  const { loading, error, stockTickers } = useStockTickers();
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Tradium
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item.name} to={item.route}>
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    if (selectedStock) navigate(`/analysis/${selectedStock}`);
  }, [selectedStock]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ height: 64 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 3, display: { xs: "none", sm: "block" } }}
          >
            Tradium
          </Typography>
          <Autocomplete
            getOptionLabel={(option: { name: string }) => option.name}
            options={stockTickers}
            value={{ name: selectedStock }}
            onChange={(event, newValue) => {
              setSelectedStock(newValue?.name || "");
            }}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Navigate to stock here"
                variant="standard"
              />
            )}
          />
          <Box sx={{ position: "relative" }}>
            {navItems.map((item) => (
              <Link key={item.name} to={item.route}>
                <Button key={item.name} sx={{ color: "#fff" }}>
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
