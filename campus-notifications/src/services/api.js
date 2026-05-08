import axios from "axios";

const NOTIFICATIONS_URL = "/evaluation-service/notifications";

export const fetchNotifications = async (page = 1, limit = 10, notificationType = "") => {
  try {
    const response = await axios.get(NOTIFICATIONS_URL, {
      params: {
        page,
        limit,
        notification_type: notificationType || undefined,
      },
    });

    return response.data.notifications || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
