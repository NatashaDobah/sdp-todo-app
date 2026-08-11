# Running the Application

## Requirements

- **Node.js:** v18.17.0 or higher
- **npm:** v9.0.0 or higher

## Quick Start

### From a Clean Clone

1. **Clone the repository**
   ```bash
   git clone https://github.com/NatashaDobah/sdp-todo-app.git
   cd sdp-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   ```
   http://localhost:3000
   ```

## Running Tests

```bash
npm test
```

## Database

The database file `todo.db` is created automatically on first run. Data persists between restarts.

## Node Version

This project was developed and tested with:
```
Node.js v18.17.0
```

Verify your version:
```bash
node --version
```

## Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### CSS not loading
```bash
rm -rf .next
npm run dev
```

### Port already in use
```bash
npx kill-port 3000
# or
npm run dev -- -p 3001
```

### Database errors
```bash
rm todo.db
npm run dev
```