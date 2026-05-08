# Campus Notifications Frontend

## Features

- Priority Inbox
- Notification Filters
- Pagination
- Material UI Responsive Design
- API Integration
- Loading and Error States

## Run Project

```bash
npm install
npm start
```

The app runs at:

```text
http://localhost:3000
```

## API Authorization

During local development, Create React App forwards API calls through:

```text
http://4.224.186.213
```

The frontend uses the relative endpoint `/evaluation-service/notifications`, so
restart `npm start` after changing `package.json`.

## Priority Logic

Notifications are prioritized in this order:

```text
Placement > Result > Event
```

## Suggested Screenshots

- All Notifications
- Filtered Notifications
- Priority Inbox
- Mobile Responsive View
