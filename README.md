

## Repository



The repository is structured into two folders:

```
/flavorai
  /flavorai-backend   # NestJS API
  /flavorai-frontend  # Next.js App
```

---

## Backend Setup (NestJS)

1. Create .env file in /flavorai-frontend:

   ```env
   DATABASE_URL=postgresql://<DB_USER>:<DB_PASS>@localhost:5432/flavorai
   JWT_SECRET=your_jwt_secret_here
   ```

2. **Install dependencies**:

   ```bash
   cd flavorai-backend
   npm install
   ```

3. **Prisma migration**:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Run the server**:

   ```bash
   npm run start:dev
   # Server listens on http://localhost:4000
   ```

5. **Verify**: Open `http://localhost:4000/api` or use `curl http://localhost:4000/recipes`.

---

## Frontend Setup (Next.js)

1. **Environment**: Create `.env.local` in `flavorai-frontend`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

2. **Install dependencies**:

   ```bash
   cd flavorai-frontend
   npm install
   # or yarn
   ```

3. **Run the dev server**:

   ```bash
   npm run dev
   # App runs on http://localhost:3000
   ```

4. **Verify**: Visit `http://localhost:3000` and sign up / log in.

---


### Backend (`flavorai-backend`)

- `npm run start` - Run in production mode
- `npm run start:dev` - Run in development (with hot reload)
- `npm run prisma:migrate` - Apply migrations
- `npm run prisma:generate` - Generate Prisma client

### Frontend (`flavorai-frontend`)

- `npm run dev` - Start Next.js in development
- `npm run build` - Build for production
- `npm run start` - Start built app

---


