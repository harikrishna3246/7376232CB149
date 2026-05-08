import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const priorityWeight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const PriorityInbox = ({ notifications }) => {
  const priorityNotifications = [...notifications]
    .sort((a, b) => (priorityWeight[b.Type] || 0) - (priorityWeight[a.Type] || 0))
    .slice(0, 5);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        mb: 3,
        borderRadius: 4,
        color: "white",
        background:
          "linear-gradient(135deg,rgba(68,90,201,0.96),rgba(124,71,165,0.96))",
        boxShadow: "0 24px 60px rgba(74,85,180,0.28)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 40,
            height: 40,
            borderRadius: 2,
            background: "rgba(255,255,255,0.18)",
          }}
        >
          <LocalFireDepartmentIcon />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            Priority Inbox
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.78)" }}>
            Placement, result, and event updates ranked by importance
          </Typography>
        </Box>
      </Box>

      <List disablePadding>
        {priorityNotifications.map((item) => (
          <ListItem
            key={item.ID}
            disablePadding
            sx={{
              py: 1,
              px: 0,
              borderTop: "1px solid rgba(255,255,255,0.16)",
            }}
            secondaryAction={
              <Chip
                label={item.Type}
                size="small"
                sx={{ color: "white", background: "rgba(255,255,255,0.16)" }}
              />
            }
          >
            <ListItemText
              primary={item.Message}
              secondary={item.Timestamp}
              primaryTypographyProps={{ fontWeight: 700, pr: 8 }}
              secondaryTypographyProps={{ color: "rgba(255,255,255,0.74)" }}
            />
          </ListItem>
        ))}
      </List>

      {priorityNotifications.length === 0 && (
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.78)" }}>
          Priority notifications will appear here after the first API response.
        </Typography>
      )}
    </Paper>
  );
};

export default PriorityInbox;
