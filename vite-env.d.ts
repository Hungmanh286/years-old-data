/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly GEMINI_API_KEY: string;
    // add more env variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
