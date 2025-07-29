# React AI - Architecture Documentation

## System Overview

React AI is a Next.js-based application that generates React components using AI (Google Gemini). It features user authentication, session management, and real-time component preview capabilities.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              REACT AI ARCHITECTURE                              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLIENT LAYER  │    │   PRESENTATION  │    │   BUSINESS      │    │   DATA LAYER    │
│                 │    │     LAYER       │    │     LAYER       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    FRONTEND                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Pages     │  │ Components  │  │   Styles    │  │   Public    │            │
│  │             │  │             │  │             │  │             │            │
│  │ • index.js  │  │ • Layout/   │  │ • globals.css│  │ • Static    │            │
│  │ • _app.js   │  │ • Chat/     │  │ • Tailwind  │  │   Assets    │            │
│  │ • _document │  │ • Preview/  │  │             │  │             │            │
│  │ • auth/     │  │             │  │             │  │             │            │
│  │ • session/  │  │             │  │             │  │             │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   BACKEND                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   API       │  │   Models    │  │   Library   │  │   External  │            │
│  │   Routes    │  │             │  │             │  │   Services  │            │
│  │             │  │             │  │             │  │             │            │
│  │ • /api/auth │  │ • User.js   │  │ • mongodb.js│  │ • Google    │            │
│  │ • /api/chat │  │ • Session.js│  │             │  │   Gemini    │            │
│  │ • /api/sess │  │             │  │             │  │ • NextAuth  │            │
│  │ • /api/test │  │             │  │             │  │ • MongoDB   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 DATA FLOW                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  User Input → Frontend → API Route → Business Logic → AI Service → Database    │
│       ↑                                                              ↓         │
│  Component Preview ← Response ← Generated Code ← AI Response ← Database Query  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              COMPONENT DETAILS                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

## Frontend Components

### Pages (`/pages`)
- **`index.js`**: Main dashboard/home page
- **`_app.js`**: App wrapper with global providers
- **`_document.js`**: Custom document for HTML structure
- **`/auth/signin.js`**: User sign-in page
- **`/auth/signup.js`**: User registration page
- **`/session/[id].js`**: Individual session page with chat and preview

### Components (`/components`)
- **Layout Components** (`/layout`):
  - `Layout.js`: Main layout wrapper
  - `Navbar.js`: Navigation bar
  - `Sidebar.js`: Side navigation
- **Chat Components** (`/chat`):
  - `ChatPanel.js`: Chat interface for AI interactions
- **Preview Components** (`/preview`):
  - `ComponentPreview.js`: Live preview of generated components

## Backend Architecture

### API Routes (`/pages/api`)
- **Authentication** (`/auth`):
  - `[...nextauth].js`: NextAuth configuration with Google OAuth and credentials
  - `signup.js`: User registration endpoint
- **Chat** (`/chat`):
  - `index.js`: Main chat endpoint for AI component generation
- **Sessions** (`/sessions`):
  - `index.js`: Session management (create, list, update)
  - `[id].js`: Individual session operations
- **Test** (`/test`):
  - `create-user.js`: Development/testing endpoint

### Data Models (`/models`)
- **User.js**: User schema with authentication fields
- **Session.js**: Session schema with chat history and generated code

### Library (`/lib`)
- **mongodb.js**: Database connection utility

## External Services Integration

### AI Service
- **Google Gemini API**: Component generation using `gemini-1.5-flash` model
- **System Prompt**: Structured prompt for React component generation
- **Response Parsing**: Extracts JSX and CSS from AI responses

### Authentication
- **NextAuth.js**: JWT-based authentication
- **Providers**: Google OAuth + Credentials (email/password)
- **Session Management**: Server-side session handling

### Database
- **MongoDB**: NoSQL database with Mongoose ODM
- **Collections**: Users, Sessions
- **Connection**: Cached connection for performance

## Technology Stack

### Frontend
- **Next.js 15.4.4**: React framework with SSR/SSG
- **React 19.1.0**: UI library
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Icons**: Icon library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Mongoose**: MongoDB ODM
- **NextAuth.js**: Authentication solution
- **bcryptjs**: Password hashing

### AI & Utilities
- **Google Generative AI**: AI component generation
- **Axios**: HTTP client
- **Formidable**: File upload handling
- **JSZip**: File compression
- **File-saver**: File download

## Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure session management
- **Input Validation**: Form data validation
- **Authentication Guards**: Protected API routes
- **Environment Variables**: Secure configuration management

## Deployment Considerations

- **Vercel/Render Ready**: Optimized for serverless deployment
- **Environment Variables**: Required for production deployment
- **Database**: MongoDB Atlas recommended for production
- **File Storage**: Cloud storage needed for image uploads

## Environment Variables Required

```env
# Database
MONGODB_URI=mongodb://localhost:27017/react-ai

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI Service
GEMINI_API_KEY=your-gemini-api-key
```

## Development Workflow

1. **User Authentication**: Sign up/sign in via Google OAuth or credentials
2. **Session Creation**: Create new development session
3. **AI Interaction**: Chat with AI to generate React components
4. **Live Preview**: View generated components in real-time
5. **Code Export**: Download generated code as ZIP files
6. **Session Management**: Save and manage multiple sessions

This architecture provides a scalable, secure, and user-friendly platform for AI-powered React component generation with real-time preview capabilities. 