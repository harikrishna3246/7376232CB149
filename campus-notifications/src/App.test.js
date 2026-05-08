import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchNotifications } from "./services/api";

jest.mock("./services/api", () => ({
  fetchNotifications: jest.fn(() => Promise.resolve([])),
}));

test("renders campus notifications dashboard", async () => {
  render(<App />);
  expect(screen.getByText(/campus notifications dashboard/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(fetchNotifications).toHaveBeenCalled();
  });
});
