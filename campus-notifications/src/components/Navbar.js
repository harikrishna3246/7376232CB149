import {
  AppBar,
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Navbar = ({ darkMode, onToggleDarkMode }) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg,#172033,#31526f)",
        borderBottom: "1px solid rgba(255,255,255,0.16)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 68, sm: 76 }, gap: 2 }}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            borderRadius: 2,
            background: "rgba(255,255,255,0.14)",
          }}
        >
          <NotificationsActiveIcon />
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              fontSize: { xs: "1.15rem", sm: "1.5rem" },
            }}
          >
            Campus Notifications Dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.78)", display: { xs: "none", sm: "block" } }}
          >
            Affordmed evaluation service frontend
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={onToggleDarkMode}
              color="default"
            />
          }
          label=""
          sx={{ display: { xs: "none", sm: "flex" }, mr: 0 }}
        />

        <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
          <IconButton color="inherit" onClick={onToggleDarkMode} aria-label="toggle dark mode">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
