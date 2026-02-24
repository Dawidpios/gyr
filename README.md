# GYR - Recipe & Fridge Management App

A modern web application for managing recipes, shopping lists, and fridge inventory. Built with Next.js 15, TypeScript, and Prisma.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

## ✨ Features

### 🔐 Authentication
- User registration and login with credentials
- GitHub OAuth integration
- Secure password hashing with bcrypt
- Session management with NextAuth.js

### 🍳 Recipe Management
- Browse all recipes with search functionality
- Create and share your own recipes
- Add recipes to shopping list
- View detailed recipe information (ingredients, cooking time, servings)
- Filter recipes by various criteria
- My Recipes - view and manage your created recipes

### 🛒 Shopping List
- Create and manage shopping lists
- Add ingredients from recipes
- Mark ingredients as available/needed
- Filter ingredients by availability in fridge
- Delete individual ingredients
- Track ingredient quantities and units

### ❄️ Fridge Inventory
- Track items in your fridge
- Add/update/delete fridge items
- Monitor quantities and categories
- Automatic comparison with shopping list
- View items by category

### 🔍 Search & Filter
- Search recipes by name, ingredients
- Filter shopping list by available items
- Smart ingredient matching between fridge and shopping list

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - ORM for database management
- **PostgreSQL** - Relational database
- **NextAuth.js** - Authentication solution
- **bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Prisma Studio** - Database GUI

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **pnpm** or **yarn**
- **PostgreSQL** database (local or hosted)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gyr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up Prisma**
   ```bash
   npx prisma generate
   ```

## ⚙️ Configuration

1. **Create environment variables file**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # GitHub OAuth (optional)
   GITHUB_ID="your-github-oauth-id"
   GITHUB_SECRET="your-github-oauth-secret"
   ```

2. **Generate NextAuth secret**
   ```bash
   openssl rand -base64 32
   ```

3. **Database setup**

   Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

   (Optional) Seed the database:
   ```bash
   npx prisma db seed
   ```

4. **GitHub OAuth Setup** (Optional)
   
   If you want to enable GitHub login:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Client Secret to `.env`

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Database Management
```bash
# Open Prisma Studio
npx prisma studio

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate
```

## 📁 Project Structure

```
gyr/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (home)/           # Landing page
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth endpoints
│   │   │   ├── createUser/   # User registration
│   │   │   ├── login/        # User login
│   │   │   ├── user/         # User operations
│   │   │   ├── addFridgeItem/ # Fridge management
│   │   │   └── shopping-list/ # Shopping list operations
│   │   ├── fridge/           # Fridge inventory pages
│   │   ├── list/             # Shopping list pages
│   │   │   ├── (components)/ # List UI components
│   │   │   └── helpers/      # List utilities
│   │   ├── recipes/          # Recipe management
│   │   │   ├── [id]/         # Recipe detail page
│   │   │   ├── add-recipie/  # Create recipe
│   │   │   ├── my-recipes/   # User's recipes
│   │   │   └── recipeForm/   # Recipe form components
│   │   ├── search/           # Search functionality
│   │   └── settings/         # User settings
│   ├── components/
│   │   ├── customComponents/ # Custom React components
│   │   └── ui/               # Shadcn/ui components
│   ├── context/
│   │   └── Session.tsx       # Session context provider
│   ├── hooks/                # Custom React hooks
│   ├── lib/
│   │   ├── authOptions.ts    # NextAuth configuration
│   │   ├── prisma.ts         # Prisma client
│   │   └── utils.ts          # Utility functions
│   └── types/                # TypeScript type definitions
├── components.json            # Shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔌 API Routes

### Authentication
- `POST /api/createUser` - Register new user
- `POST /api/login` - User login
- `GET /api/user` - Get current user info
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Recipes
- `GET /recipes` - List all recipes
- `GET /recipes/[id]` - Get recipe details
- `POST /recipes/add-recipie` - Create new recipe
- `GET /recipes/my-recipes` - Get user's recipes

### Shopping List
- `GET /api/shopping-list` - Get user's shopping list
- `POST /api/shopping-list` - Add ingredient to list
- `DELETE /api/shopping-list` - Remove ingredient

### Fridge
- `GET /api/addFridgeItem` - Get fridge items
- `POST /api/addFridgeItem` - Add/update fridge item
- `DELETE /api/addFridgeItem` - Remove fridge item

## 🗄️ Database Schema

### Models

#### User
Stores user account information
- Authentication credentials
- Profile information
- Relations: recipes, ingredients, fridge, shopping list

#### Recipes
Recipe information
- Title, description, cooking time, portions
- Image URL
- Relations: ingredients, author

#### Ingredient
Individual ingredients
- Name, amount, unit
- Relations: recipe, list, user

#### List
Shopping lists
- Relations: user, ingredients

#### Fridge
Fridge inventory
- Relations: user, fridge items

#### FridgeItem
Items stored in fridge
- Name, quantity, unit, category
- Timestamps for tracking

## 🔐 Security Features

- Password hashing with bcrypt
- Server-side session validation
- Protected API routes
- CSRF protection
- SQL injection prevention (Prisma ORM)
- XSS protection (React escaping)

## 🎨 UI Components

Built with Radix UI and Tailwind CSS:
- Forms (input, textarea, select)
- Buttons and badges
- Cards and dialogs
- Navigation menu
- Tooltips and popovers
- Collapsible sections
- Sheets and sidebars

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use server actions for mutations
- Implement proper error handling
- Add loading states for async operations

### File Naming
- Components: PascalCase (e.g., `RecipeCard.tsx`)
- Utilities: camelCase (e.g., `addIngredient.ts`)
- API routes: kebab-case folders (e.g., `add-recipie/`)

### Best Practices
- Use server components by default
- Add "use client" only when needed
- Implement proper data revalidation
- Use React Hook Form for complex forms
- Validate data with Zod schemas
- Optimize images with Next.js Image component

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Ensure PostgreSQL database is accessible
4. Set all required environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

Your development team

## 🐛 Known Issues

- Check the Issues tab on GitHub for current bugs and feature requests

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js and TypeScript**