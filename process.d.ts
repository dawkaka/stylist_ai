declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string
        NEXTAUTH_SECRET: string
        GITHUB_ID: string
        GITHUB_SECRET: string
        FACEBOOK_ID: string
        FACEBOOK_SECRET: string
        TWITTER_ID: string
        TWITTER_SECRET: string
        GOOGLE_ID: string
        GOOGLE_SECRET: string
        GOOGLE_PROJECT_ID: string
        CLARIFAI_KEY: string
        DATABASE_URL: string
        FIREBASE_API_KEY: string
        FIREBASE_AUTH_DOMAIN: string
        FIREBASE_PROJECT_ID: string
        FIREBASE_STORAGE_BUCKET: string
        FIREBASE_MESSAGING_SENDER_ID: string
        FIREBASE_APP_ID: string
        FIREBASE_MEASUREMENT_ID: string
        CLOUDINARY_CLOUD_NAME: string
        CLOUDINARY_API_SECRET: string
        CLOUDINARY_API_KEY: string
    }
}
