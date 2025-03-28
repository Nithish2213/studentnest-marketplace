
# StudentNest Project Structure

## Overview
StudentNest is a marketplace web application designed for university students to buy and sell items, services, and more within their university community. The application has different interfaces for students and administrators.

## Tech Stack
- React (with JSX)
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Shadcn/UI components for UI elements
- React Query for data fetching
- Local storage for persistence

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/         # Layout components
│   │   ├── Footer.jsx  # Site footer with links and info
│   │   ├── Header.jsx  # Site header with navigation
│   │   └── Layout.jsx  # Main layout wrapper
│   ├── LoadingScreen.jsx     # Loading indicator
│   ├── products/             # Product related components
│   │   ├── ProductCard.jsx   # Individual product display
│   │   └── ProductSection.jsx # Section to display multiple products
│   ├── categories/           # Category related components
│   │   └── Categories.jsx    # Product categories component
│   ├── home/                 # Home page components
│   │   └── HeroBanner.jsx    # Homepage hero banner
│   └── ui/                   # UI components from shadcn
├── context/                  # React context providers
│   ├── AuthContext.jsx       # Authentication context provider
│   └── FavoritesContext.jsx  # Favorites management context
├── hooks/                    # Custom React hooks
│   └── use-toast.ts          # Toast notification hook
├── lib/                      # Utility libraries
│   └── utils.js              # Utility functions
├── pages/                    # Application pages
│   ├── AdminDashboard.jsx    # Admin dashboard page
│   ├── ChatWithSeller.jsx    # Messaging with sellers
│   ├── Favorites.jsx         # User's favorite items
│   ├── Home.jsx              # Main homepage
│   ├── Index.jsx             # Landing/redirect page
│   ├── NotFound.jsx          # 404 page
│   ├── Notifications.jsx     # User notifications
│   ├── ProductDetail.jsx     # Individual product page
│   ├── Profile.jsx           # User profile page
│   ├── RecentItems.jsx       # Recent listings page
│   ├── SellItem.jsx          # Page to sell/list items
│   ├── SellerProfile.jsx     # Seller profile view
│   ├── SignIn.jsx            # Login page
│   ├── SignUp.jsx            # Registration page
│   └── TrendingItems.jsx     # Trending items page
├── App.jsx                   # Main application component with routes
├── main.jsx                  # JavaScript entry point
└── index.css                 # Global styles
```

## Key Features

### Authentication
- Student and admin user types
- Email-based authentication
- Role-based access control
- Protected routes

### Products
- Listing items for sale
- Browsing products
- Product details view
- Favoriting items

### User Features
- User profiles
- Seller profiles
- Chat system with sellers
- Notification system
- Favorites management

### Admin Features
- Admin dashboard
- User management
- Content moderation

## Routing Structure

```
/                        # Index/landing page, redirects based on auth status
/home                    # Main homepage for students
/product/:id             # Product detail page
/profile                 # User profile page
/sell                    # Page to sell/list items
/favorites               # User's favorite items
/notifications           # User notifications
/chat/:sellerId/product/:productId  # Chat with a seller about a product
/seller/:sellerId        # View a seller's profile
/admin                   # Admin dashboard
/category/trending       # Trending items page
/category/recent         # Recent items page
/signin                  # Login page
/signup                  # Registration page
*                        # 404 Not Found page
```

## Authentication
- Students: Must use @kgkite.ac.in email domain
- Admins: Must use @kgisl.ac.in email domain
- Different redirects based on user role:
  - Admins are directed to /admin
  - Students are directed to /home

## Data Flow
The application uses React Context for state management:
- AuthContext: Manages user authentication state
- FavoritesContext: Manages user favorites

Local storage is used for persistence of user data between sessions.

## UI Components
The application uses a combination of custom components and Shadcn UI components for a consistent design language.

## Responsive Design
All pages and components are designed to be responsive for optimal viewing on various devices from mobile to desktop.
