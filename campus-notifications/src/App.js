import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Container,
  CssBaseline,
  Pagination,
  Snackbar,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import NotificationCard from "./components/NotificationCard";
import PriorityInbox from "./components/PriorityInbox";
import Loader from "./components/Loader";

import { fetchNotifications } from "./services/api";

const PAGE_SIZE = 10;

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#31526f",
          },
          background: {
            default: darkMode ? "#0f172a" : "#f4f7fb",
            paper: darkMode ? "#111827" : "#ffffff",
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: "Arial, Helvetica, sans-serif",
        },
      }),
    [darkMode]
  );

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchNotifications(page, PAGE_SIZE, selectedType);

      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to fetch notifications");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }, [page, selectedType]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const filteredNotifications = useMemo(() => {
    const value = searchText.trim().toLowerCase();

    if (!value) {
      return notifications;
    }

    return notifications.filter((notification) => {
      const message = notification.Message?.toLowerCase() || "";
      const notificationType = notification.Type?.toLowerCase() || "";
      const timestamp = notification.Timestamp?.toLowerCase() || "";

      return (
        message.includes(value) ||
        notificationType.includes(value) ||
        timestamp.includes(value)
      );
    });
  }, [notifications, searchText]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background: (appTheme) =>
            appTheme.palette.mode === "dark"
              ? "linear-gradient(180deg,#0f172a 0%,#111827 100%)"
              : "linear-gradient(180deg,#eef4fb 0%,#f8fbff 100%)",
        }}
      >
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((current) => !current)}
        />

        <Container maxWidth="lg" sx={{ pt: { xs: 3, sm: 4 }, pb: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography
                variant="overline"
                sx={{ color: "text.secondary", fontWeight: 800, letterSpacing: 0 }}
              >
                Student dashboard
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
                Notifications that matter first
              </Typography>
              <Typography color="text.secondary">
                Search, filter, and prioritize campus updates from the Affordmed API.
              </Typography>
            </Box>

            <Filters
              searchText={searchText}
              onSearchChange={setSearchText}
              selectedType={selectedType}
              onTypeChange={(value) => {
                setSelectedType(value);
                setPage(1);
              }}
            />

            <PriorityInbox notifications={filteredNotifications} />

            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>
                    All Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Showing {filteredNotifications.length} notifications on page {page}
                  </Typography>
                </Box>
              </Box>

              {loading && <Loader />}

              {!loading && error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {!loading &&
                filteredNotifications.map((notification) => (
                  <NotificationCard key={notification.ID} notification={notification} />
                ))}

              {!loading && !error && filteredNotifications.length === 0 && (
                <Alert severity="info">No notifications found for the current search.</Alert>
              )}
            </Box>

            <Pagination
              count={10}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            />
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error || "Failed to fetch notifications"}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
