# Simple Flow Quiz

A premium, animated, single-page quiz application built with Next.js, Tailwind CSS, and Framer Motion.

## Features

-   **Premium UI/UX**: Smooth animations, glassmorphism, and a modern aesthetic.
-   **Multi-language Support**: English and Russian.
-   **Branching Logic**: Conditional flows based on user answers.
-   **Secure Submission**: Answers are sent to a webhook via a secure API route.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set Environment Variable**:
    Create a `.env.local` file:
    ```env
    WEBHOOK_URL="https://your-webhook-url.com"
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Deployment

### Cloudflare Pages

1.  Connect your GitHub repository to Cloudflare Pages.
2.  Select the **Next.js** framework preset.
3.  Add the Environment Variable:
    -   `WEBHOOK_URL`: Your webhook URL.
4.  Deploy!

### Vercel

1.  Import the project to Vercel.
2.  Add the `WEBHOOK_URL` environment variable.
3.  Deploy.
