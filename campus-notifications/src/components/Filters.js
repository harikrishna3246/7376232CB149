import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const notificationTypes = ["Placement", "Result", "Event"];

const Filters = ({ searchText, onSearchChange, selectedType, onTypeChange }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(20,28,42,0.72)"
            : "rgba(255,255,255,0.78)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
          <SearchIcon color="action" />
          <TextField
            fullWidth
            value={searchText}
            label="Search notifications"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </Box>

        <FormControl fullWidth sx={{ maxWidth: { md: 280 } }}>
          <InputLabel>Filter Notifications</InputLabel>
          <Select
            value={selectedType}
            label="Filter Notifications"
            onChange={(event) => onTypeChange(event.target.value)}
          >
            <MenuItem value="">All Notifications</MenuItem>
            {notificationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default Filters;
