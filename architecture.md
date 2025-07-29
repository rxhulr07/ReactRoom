# React-Room Architecture Documentation

## Overview
React-Room is an AI-powered code assistant platform with authentication that provides JSX/TSX and CSS code generation via Google's Gemini API.

```mermaid
graph TD
    A[User] --> B{Authentication}
    B -->|Google OAuth| C[(MongoDB)]
    B -->|Credentials| C
    C --> D[Dashboard]
    D --> E[Chat Panel]
    E --> F[Gemini API]
    F --> G[Code Response]
    G --> E
    C --> H[Session Store]
    H -->|Redis| C