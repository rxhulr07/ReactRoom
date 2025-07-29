# React AI - Compact Architecture

```mermaid
flowchart LR
    %% Simplified Authentication
    A[User] --> B{Login}
    B -->|Google/Email| C[(NextAuth\nJWT)]
    C --> D[Dashboard]

    %% Core Flow
    D --> E[New Chat]
    E --> F[Prompt] --> G[/API\nValidation/]
    G --> H[(Gemini AI)] --> I{Parse\nJSX/CSS}
    I --> J[(MongoDB)] --> K[Live Preview]

    %% User Actions
    K --> L{Copy|Download|Continue}
    L -->|Continue| F
    L -->|End| M[Sign Out]

    %% System Boundaries
    subgraph Frontend
        A
        D
        E
        F
        K
        L
    end

    subgraph Backend
        C
        G
    end

    subgraph External
        H
        J
    end

    %% Styling
    classDef front fill:#d4f1f9,stroke:#333,rounded:4px;
    classDef back fill:#e7d4f9,stroke:#333,rounded:4px;
    classDef ext fill:#fff3cd,stroke:#333,rounded:4px;
    class Frontend front;
    class Backend back;
    class External ext;