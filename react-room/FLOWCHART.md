# React AI - Pure Flowchart

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              REACT AI SYSTEM FLOW                              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│   USER ENTRY    │
│                 │
│ 1. Visit App    │
│ 2. See Landing  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  AUTHENTICATION │
│                 │
│ 3. Sign In/Up   │
│    Options:     │
│    • Google OAuth│
│    • Email/Pass │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   JWT TOKEN     │
│                 │
│ 4. Token Created│
│ 5. Stored Cookie│
│ 6. User Session │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   DASHBOARD     │
│                 │
│ 7. View Sessions│
│ 8. Create New   │
│    Session      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  SESSION PAGE   │
│                 │
│ 9. Chat Interface│
│ 10. Component   │
│     Preview     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   USER INPUT    │
│                 │
│ 11. Type Prompt │
│ 12. Upload Image│
│     (Optional)  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  JWT VALIDATION │
│                 │
│ 13. Token Check │
│ 14. User ID     │
│     Extract     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  API PROCESSING │
│                 │
│ 15. /api/chat   │
│     • Form Parse│
│     • Auth Check│
│     • Session   │
│       Validation│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   AI SERVICE    │
│                 │
│ 16. Google      │
│     Gemini API  │
│     • Send Prompt│
│     • Generate  │
│       Component │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  RESPONSE PARSE │
│                 │
│ 17. Extract     │
│     JSX & CSS   │
│ 18. Format Code │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  DATABASE SAVE  │
│                 │
│ 19. Update      │
│     Session     │
│     • User ID   │
│       from JWT  │
│     • Chat Hist │
│     • Current   │
│       Code      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  FRONTEND UPDATE│
│                 │
│ 20. Display     │
│     Response    │
│ 21. Update      │
│     Preview     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  USER ACTIONS   │
│                 │
│ 22. View Code   │
│ 23. Copy Code   │
│ 24. Download    │
│ 25. Continue    │
│     Chat        │
└─────────────────┘
```

## JWT FLOW

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   LOGIN     │───▶│  JWT TOKEN  │───▶│   COOKIE    │───▶│   REQUEST   │
│             │    │  CREATED    │    │   STORAGE   │    │   HEADER    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  NextAuth   │    │ User Data   │    │ httpOnly    │    │ Bearer      │
│  Provider   │    │ Encoded     │    │ Secure      │    │ Token       │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Google OAuth│    │ JWT Payload │    │ Browser     │    │ API Route   │
│ Credentials │    │ {id,email}  │    │ Storage     │    │ Validation  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## API FLOW

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   CLIENT    │───▶│   API ROUTE │───▶│  JWT CHECK  │───▶│   DATABASE  │
│  REQUEST    │    │  /api/chat  │    │ getServer   │    │  OPERATION  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ FormData    │    │ Formidable  │    │ Session     │    │ MongoDB     │
│ Message     │    │ Parse       │    │ Validation  │    │ Save/Update │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Image File  │    │ Fields      │    │ User ID     │    │ Session     │
│ (Optional)  │    │ Files       │    │ Extract     │    │ Collection  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## AI GENERATION FLOW

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ USER PROMPT │───▶│ SYSTEM      │───▶│ GEMINI API  │───▶│ AI RESPONSE │
│             │    │ PROMPT      │    │ gemini-1.5  │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ "Create     │    │ React       │    │ Google      │    │ Text        │
│  Button"    │    │ Component   │    │ Generative  │    │ Response    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Chat Input  │    │ Structured  │    │ AI Model    │    │ JSX/CSS     │
│ Form        │    │ Template    │    │ Processing  │    │ Extraction  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## DATABASE SCHEMA

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MONGODB COLLECTIONS                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                USERS COLLECTION                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ {                                                                           │
│   _id: ObjectId,                                                           │
│   name: String,                                                            │
│   email: String (unique),                                                  │
│   hashedPassword: String,                                                  │
│   image: String,                                                           │
│   emailVerified: Date,                                                     │
│   createdAt: Date,                                                         │
│   updatedAt: Date                                                          │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              SESSIONS COLLECTION                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ {                                                                           │
│   _id: ObjectId,                                                           │
│   userId: String (indexed),                                                │
│   name: String,                                                            │
│   chatHistory: [{                                                          │
│     role: 'user' | 'assistant',                                            │
│     content: String,                                                       │
│     timestamp: Date,                                                       │
│     image: String,                                                         │
│     code: { jsx: String, css: String }                                     │
│   }],                                                                       │
│   currentCode: { jsx: String, css: String },                               │
│   createdAt: Date,                                                         │
│   updatedAt: Date                                                          │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## COMPONENT STRUCTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND STRUCTURE                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                   PAGES                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ pages/                                                                      │
│ ├── index.js (Dashboard)                                                   │
│ ├── _app.js (App wrapper)                                                  │
│ ├── _document.js (HTML structure)                                          │
│ ├── auth/                                                                   │
│ │   ├── signin.js                                                          │
│ │   └── signup.js                                                          │
│ └── session/                                                                │
│     └── [id].js (Session page)                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                 COMPONENTS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ components/                                                                 │
│ ├── layout/                                                                 │
│ │   ├── Layout.js                                                          │
│ │   ├── Navbar.js                                                          │
│ │   └── Sidebar.js                                                         │
│ ├── chat/                                                                   │
│ │   └── ChatPanel.js                                                       │
│ └── preview/                                                                │
│     └── ComponentPreview.js                                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                   API ROUTES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ pages/api/                                                                  │
│ ├── auth/                                                                   │
│ │   ├── [...nextauth].js (NextAuth config)                                 │
│ │   └── signup.js                                                          │
│ ├── chat/                                                                   │
│ │   └── index.js (AI component generation)                                 │
│ ├── sessions/                                                               │
│ │   ├── index.js (Session management)                                      │
│ │   └── [id].js (Individual session)                                       │
│ └── test/                                                                   │
│     └── create-user.js                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

## TECHNOLOGY STACK

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TECHNOLOGY STACK                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  FRONTEND   │  │   BACKEND   │  │     AI      │  │  DATABASE   │
│             │  │             │  │             │  │             │
│ Next.js 15  │  │ Next.js API │  │ Google      │  │ MongoDB     │
│ React 19    │  │ Routes      │  │ Gemini      │  │ Mongoose    │
│ Tailwind 4  │  │ NextAuth.js │  │ 1.5 Flash   │  │ ODM         │
│ Framer      │  │ bcryptjs    │  │             │  │             │
│ Motion      │  │ Formidable  │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
``` 