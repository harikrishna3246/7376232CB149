import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 3 }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
