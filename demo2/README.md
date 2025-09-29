# Trust Company Financial Platform

A comprehensive frontend web application built with React/Next.js for a trust company business system. This platform provides a modern, responsive interface for managing trust accounts, portfolios, clients, and financial transactions.

## Features

### Authentication
- **Sign Up/Sign In**: Secure authentication with form validation
- **User Management**: Role-based access control (Admin, Manager, Analyst)
- **Session Management**: Persistent login state with localStorage

### Dashboard
- **Overview**: Key metrics and performance indicators
- **Charts**: Interactive portfolio performance and asset allocation charts
- **Recent Activity**: Transaction history and alerts
- **Real-time Data**: Live updates on trust company metrics

### Navigation System
- **Sidebar Navigation**: Easy access to all major sections
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Active State**: Visual indicators for current page
- **User Profile**: Quick access to user information and logout

### Core Sections
1. **Portfolio Management**: Asset allocation, performance tracking
2. **Client Management**: Client directory, account management
3. **Trust Management**: Trust creation, beneficiary management
4. **Transaction Management**: Deposit/withdrawal processing, audit trails
5. **Reports & Analytics**: Financial statements, custom reports
6. **Advanced Analytics**: Performance metrics, risk analysis
7. **Settings**: System configuration, user preferences

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Credentials
The application uses mock authentication for demonstration:
- **Email**: Any valid email format
- **Password**: Any password (6+ characters)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard and sub-pages
│   ├── signin/           # Authentication pages
│   ├── signup/
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/          # Layout components
│   └── ui/              # Base UI components
├── contexts/            # React contexts
├── lib/                 # Utility functions
└── types/               # TypeScript type definitions
```

## Key Components

### Authentication
- `AuthContext`: Global authentication state management
- `SignInPage`: Login form with validation
- `SignUpPage`: Registration form with validation

### Dashboard
- `DashboardLayout`: Main layout with sidebar and header
- `PortfolioChart`: Interactive line chart for portfolio performance
- `AssetAllocationChart`: Pie chart for asset distribution
- `RecentTransactions`: Data table with transaction history
- `StatsCard`: Reusable metric display cards

### Navigation
- `Sidebar`: Collapsible navigation with active states
- `Header`: Top navigation with search and user menu

## Backend Integration

This frontend is designed to integrate with a Spring Boot backend. The authentication context includes mock API calls that can be easily replaced with actual HTTP requests to your Spring Boot endpoints.

### API Integration Points
- Authentication endpoints (`/api/auth/login`, `/api/auth/register`)
- Dashboard data endpoints (`/api/dashboard/stats`, `/api/dashboard/charts`)
- CRUD operations for clients, trusts, and transactions

## Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update component styles in individual component files
- Global styles in `src/app/globals.css`

### Adding New Sections
1. Create new page in `src/app/dashboard/[section]/page.tsx`
2. Add navigation item in `src/components/layout/Sidebar.tsx`
3. Implement section-specific components in `src/components/dashboard/`

## Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)

## Future Enhancements

- Real-time notifications
- Advanced data visualization
- Mobile app development
- Multi-language support
- Advanced security features
- API rate limiting
- Caching strategies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.