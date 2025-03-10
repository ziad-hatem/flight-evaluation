# Flight Evaluation System

A comprehensive web application for evaluating and reviewing flights, built with Next.js, Prisma, and NextAuth.js. This platform allows users to browse flights, submit ratings and reviews, and helps travelers make informed decisions based on other passengers' experiences.

## Features

### For Users
- **Flight Search**: Search for flights by origin, destination, airline, and date
- **Detailed Flight Information**: View comprehensive details about flights including airline information
- **Rating System**: Rate flights on multiple criteria:
  - Check-in experience
  - Boarding experience
  - Cabin crew service
  - Seat comfort
  - Food quality
  - Entertainment options
  - Flight performance
  - Value for money
  - Overall rating
- **Review System**: Write detailed reviews about flight experiences
- **User Profiles**: Manage personal information and view past ratings and reviews
- **Authentication**: Secure login and registration system

### For Administrators
- **Airline Management**: Add, update, and delete airlines
- **Flight Management**: Add, update, and delete flights
- **User Management**: View and manage user accounts
- **Content Moderation**: Monitor and manage user reviews
- **Analytics Dashboard**: View statistics on flights, ratings, and user activity

## Tech Stack

- **Frontend**: React 19, Next.js 15.2, TailwindCSS 4
- **Backend**: Next.js API Routes
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Chart.js with React-ChartJS-2

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/flight-evaluation.git
   cd flight-evaluation
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database
   ```bash
   npx prisma migrate dev
   # or
   yarn prisma migrate dev
   ```

5. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Usage

### User Guide

1. **Registration and Login**
   - Create a new account or log in with existing credentials
   - User profiles include name, email, and optional profile picture

2. **Browsing Flights**
   - Use the search functionality to find flights by origin, destination, airline, or date
   - View detailed information about each flight

3. **Rating and Reviewing**
   - Rate flights on multiple criteria (1-5 scale)
   - Write detailed reviews about your flight experience
   - Edit or update your previous ratings and reviews

### Admin Guide

1. **Accessing Admin Panel**
   - Log in with admin credentials
   - Navigate to the admin dashboard

2. **Managing Airlines**
   - Add new airlines with name, logo, and description
   - Edit existing airline information
   - Delete airlines (only if they have no associated flights)

3. **Managing Flights**
   - Add new flights with flight number, origin, destination, times, and airline
   - Edit existing flight details
   - Delete flights (will also remove associated ratings and reviews)

## API Documentation

The application provides RESTful API endpoints for:

- **Authentication**: User registration, login, and session management
- **Airlines**: CRUD operations for airline data
- **Flights**: CRUD operations for flight data
- **Ratings**: Create and retrieve flight ratings
- **Reviews**: Create and retrieve flight reviews

All API routes are located under `/api` and follow RESTful conventions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
