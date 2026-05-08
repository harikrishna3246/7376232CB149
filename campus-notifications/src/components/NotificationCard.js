import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const getChipColor = (type) => {
  switch (type) {
    case "Placement":
      return "success";
    case "Result":
      return "primary";
    case "Event":
      return "warning";
    default:
      return "default";
  }
};

const NotificationCard = ({ notification }) => {
  const icons = {
    Placement: WorkIcon,
    Result: SchoolIcon,
    Event: CelebrationIcon,
  };
  const NotificationIcon = icons[notification.Type] || CampaignIcon;

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg,rgba(31,41,59,0.9),rgba(15,23,42,0.94))"
            : "rgba(255,255,255,0.82)",
        backdropFilter: "blur(14px)",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 10,
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 2,
              color: "primary.main",
              backgroundColor: "action.hover",
            }}
          >
            <NotificationIcon fontSize="small" />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
                {notification.Message}
              </Typography>

              <Chip
                label={notification.Type}
                color={getChipColor(notification.Type)}
                size="small"
                sx={{ fontWeight: 700 }}
              />
            </Box>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {notification.Timestamp}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
