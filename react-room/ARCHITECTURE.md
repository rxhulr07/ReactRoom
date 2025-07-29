flowchart TD
    %% Entry & Authentication
    A[👤 User] -->|Visits App| B[🌐 Landing Page]
    B --> C{🔐 Authentication}
    C -->|Google OAuth<br>or Email/Password| D[NextAuth.js]
    D -->|JWT Token| E[🔒 Cookie Storage]
    E --> F[📊 Dashboard]

    %% Session Management
    F --> G[🆕 New Session]
    F --> H[📁 Past Sessions]
    G --> I[💬 Chat Interface]

    %% AI Interaction
    I --> J[📝 User Prompt]
    J --> K[📨 Submit Prompt]
    K --> L[/api/chat/]
    L --> M[🔑 JWT Verification]
    M --> N[🧾 Parse Input (Formidable)]
    N --> O[🧠 Gemini API]
    O --> P[🛠️ Generate JSX/CSS]
    P --> Q[🧹 Format Response]

    %% Database Ops
    Q --> R[(🗄️ MongoDB)]
    R -->|Save Session| S[📜 Update History]
    S --> T[📨 Return Response]

    %% Frontend Update
    T --> U[🧱 Render Component]
    U --> V[👀 Live Preview]
    V --> W[🎛️ User Options]
    W -->|📋 Copy Code| X[📎 Clipboard]
    W -->|⬇️ Download| Y[💾 FileSaver.js]
    W -->|↩️ Continue Chat| J

    %% Grouped Sections
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

    subgraph AI Engine
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

    %% Style Definitions
    classDef frontend fill:#e0f7ff,stroke:#036;
    classDef backend fill:#f3e5f5,stroke:#603;
    classDef ai fill:#fff9c4,stroke:#660;
    classDef db fill:#dcedc8,stroke:#262;
    classDef util fill:#eceff1,stroke:#555;
    class Frontend frontend;
    class Backend backend;
    class AIEngine ai;
    class Database db;
    class Utilities util;
