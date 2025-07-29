# React AI - Comprehensive Architecture

```mermaid
flowchart TD
    %% Authentication Section
    A[User] -->|Visits App| B[Landing Page]
    B --> C{Authentication}
    C -->|Google OAuth| D[NextAuth.js]
    C -->|Email/Password| D
    D -->|JWT Token| E[Cookie Storage]
    E --> F[Dashboard]

    %% Session Management
    F --> G[Create New Session]
    F --> H[View Past Sessions]
    G --> I[Chat Interface]

    %% AI Interaction Flow
    I --> J[User Prompt]
    J --> K[Form Submission]
    K --> L[/API Route\n/api/chat/]
    L --> M[JWT Verification]
    M --> N[Formidable\nParse Input]
    N --> O[Gemini API]
    O --> P[Generate JSX/CSS]
    P --> Q[Format Response]

    %% Database Operations
    Q --> R[(MongoDB)]
    R -->|Save Session| S[Update Chat History]
    S --> T[Return Response]

    %% Frontend Update
    T --> U[Display Component]
    U --> V[Live Preview]
    V --> W[User Actions]
    W -->|Copy Code| X[Clipboard]
    W -->|Download| Y[FileSaver.js]
    W -->|Continue Chat| J

    %% System Components
    subgraph Frontend
        B
        F
        I
        U
        V
        W
    end

    subgraph Backend
        D
        L
        M
        N
    end

    subgraph AI
        O
        P
        Q
    end

    subgraph Database
        R
        S
    end

    subgraph Utilities
        X
        Y
    end

    %% Styling
    classDef frontend fill:#cff,stroke:#333;
    classDef backend fill:#fcf,stroke:#333;
    classDef ai fill:#ffc,stroke:#333;
    classDef db fill:#cfc,stroke:#333;
    classDef util fill:#ccc,stroke:#333;
    class Frontend frontend;
    class Backend backend;
    class AI ai;
    class Database db;
    class Utilities util;