# Pair Dev Finder

Pair Dev Finder is a comprehensive platform designed to bridge the gap between developers seeking collaborative programming experiences. Our solution goes beyond simple matching by providing an integrated environment where developers can connect, communicate, and code together in real-time.

## 🚀 Key Features

### 🔍 Developer Matching System

Our advanced matching algorithm considers multiple factors to create meaningful connections:

- **Technical Skill Alignment**: Matches developers based on complementary or similar skill sets
- **Project Interests**: Connects users working on similar technologies or project types
- **Availability Synchronization**: Finds partners with compatible schedules across timezones
- **Personality Indicators**: Optional personality quiz to improve pairing compatibility

### 💻 Seamless Real-time Collaboration Suite

The platform provides everything needed for productive pair programming:

- **High-Quality Video Calls**: WebRTC-based video conferencing with screen sharing capabilities
- **Interactive Messaging**: Persistent chat channels with Pusher-powered real-time updates
- **Session Management**: Scheduling system with calendar integration and reminders
- **Code Collaboration**: Shared workspace with optional IDE integration (coming soon)

### 🛠️ Technical Implementation Highlights

- **Optimized Next.js Architecture**: Leveraging App Router for improved performance
- **Type-Safe Development**: Comprehensive TypeScript integration throughout the stack
- **Modern Styling**: Tailwind CSS with custom design system for consistent UI
- **Component Library**: Storybook-driven development for UI consistency

## 🛠️ Comprehensive Tech Stack

### Frontend Implementation

- **Next.js 14**: Utilizing the latest App Router features for optimized routing and server components
- **TypeScript**: Full type coverage with strict mode enabled for maximum reliability
- **Tailwind CSS**: Utility-first styling with custom plugins and theming support
- **State Management**: Zustand for global state with specialized stores for session data
- **Form Handling**: React Hook Form with Zod validation for complex forms

### Backend Services

- **Next.js API Routes**: Organized RESTful endpoints with middleware support
- **Supabase Integration**:
  - Authentication with email/password and OAuth providers
  - PostgreSQL database with row-level security
  - Storage for user uploads and assets
- **Drizzle ORM**: Type-safe database queries with schema migrations
- **Pusher Channels**: Real-time websocket connections for chat features

### Testing Infrastructure

- **Unit Testing**: Jest with React Testing Library for component tests
- **Integration Testing**: API route testing with mocked database responses
- **E2E Testing**: Cypress test suite covering critical user journeys
- **Visual Testing**: Storybook with Chromatic for UI regression testing

### Development Tooling

- **Code Quality**: ESLint + Prettier with Git hooks via Husky
- **Commit Standards**: Conventional Commits with commitlint
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Monitoring**: Error tracking with Sentry (optional)

## 🛠️ Detailed Installation Guide

### Prerequisites

Ensure your system has:

- Node.js v18 or later
- npm v9 or later (or yarn/pnpm)
- Git for version control
- Supabase account (free tier available)
- Pusher account (developer plan sufficient)

## Figma Design

You can view the design on [Figma](https://www.figma.com/design/yZodyGIJg8YQ0M5L48XbHE/Pair-dev-finder?node-id=0-1&p=f&t=nkH3xBlftrfROAk0-0).

### Step-by-Step Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pair-dev-finder.git
   cd pair-dev-finder
   ```
