# E-Commerce API

A streamlined e-commerce backend API built with NestJS, PostgreSQL, and Drizzle ORM.

Features authentication, product management, order processing, file uploads, and analytics. 

Perfect for frontend developers' testing needs, easily deployable to Vercel, and completely free to use.

## Features

- **Authentication and Authorization**
  - JWT-based authentication
  - User roles (admin, customer)
  - Protected routes with guards

- **User Management**
  - User registration and profile management
  - Role-based access control

- **Product Management**
  - Product CRUD operations
  - Categories and inventory management
  - Product images via Vercel Blob storage

- **Order Processing**
  - Order creation and management
  - Order status tracking (pending, processing, delivered, cancelled)

- **Content Management**
  - Banner management for promotional content
  - Active/inactive status control

- **File Uploads**
  - Image upload and management with Vercel Blob

- **Dashboard and Analytics**
  - Sales statistics and reporting
  - Order status breakdowns
  - Revenue tracking and daily order statistics

- **API Documentation**
  - Swagger UI documentation
  - API versioning

## Tech Stack

- **Framework**: NestJS 11
- **Database**: PostgreSQL (via Vercel Postgres)
- **ORM**: Drizzle ORM
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator and class-transformer
- **File Storage**: Vercel Blob
- **API Documentation**: Swagger/OpenAPI
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (or Vercel Postgres)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/e-commerce-api.git
   cd e-commerce-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   JWT_SECRET=your_jwt_secret
   POSTGRES_URL=your_postgres_connection_string
   BLOB_READ_WRITE_TOKEN=for_file_upload_with_vercel_blob
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. The API will be available at `http://localhost:4001/api`
   - Swagger documentation: `http://localhost:4001/docs`

### Database Setup

The application uses Drizzle ORM with Vercel Postgres. You can seed the database with initial data using:

```bash
npm run seed
```

This will generate:
- Admin and customer user accounts
- Product categories
- Sample products
- Banner data
- Mock orders for the last 30 days

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (admin)
- `POST /api/users` - Create user (admin)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `GET /api/products/:id` - Get product by ID
- `PATCH /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `GET /api/categories/:id` - Get category by ID
- `PATCH /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order status (admin)
- `DELETE /api/orders/:id` - Delete order (admin)

### Banners
- `GET /api/banners` - Get all banners
- `POST /api/banners` - Create banner (admin)
- `GET /api/banners/:id` - Get banner by ID
- `PATCH /api/banners/:id` - Update banner (admin)
- `DELETE /api/banners/:id` - Delete banner (admin)

### Files
- `POST /api/files/upload` - Upload file

### Statistics
- `GET /api/statistics/dashboard` - Get dashboard statistics
- `GET /api/statistics/orders` - Get order statistics
- `POST /api/statistics/revenue` - Get revenue statistics by date range
- `POST /api/statistics/daily-order-counts` - Get daily order counts by date range
- `POST /api/statistics/daily-order-totals` - Get daily order total amounts by date range

### Public Endpoints
- `GET /api/front/products` - Get all active products
- `GET /api/front/categories` - Get all active categories
- `GET /api/front/banners` - Get all active banners
- `POST /api/front/orders` - Create order (customer)
- `GET /api/front/orders/:id` - Get order by ID (customer)

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for serverless deployment.

## Default Credentials

After seeding the database, you can use the following credentials to log in:

- Admin User:
  - Email: admin@nt.uz
  - Password: pass123

- Customer User:
  - Email: olim@example.com
  - Password: password123

## License

This project is licensed under the MIT License.
