<img src="https://github.com/user-attachments/assets/a1d7ced5-e6fc-41fd-9256-9d73a5f33597" alt="Luro Logo" width="50" height="50">

# 🚀 Luro - AI-Powered Social Media Marketing Platform

<img src="https://github.com/user-attachments/assets/0ff7129e-2f5d-48ae-913d-d4fd1507e613" alt="Luro Thumbnail" style="border-radius: 12px;" width="1280">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square)](https://clerk.com/)

## 🌟 Overview

Luro is a cutting-edge social media marketing platform that revolutionizes how businesses manage their social media presence. Built with modern web technologies, it combines AI-powered content creation with comprehensive analytics to help you streamline your social media strategy and maximize engagement across all platforms.

## ✨ Key Features

### 📊 **Analytics & Insights**

- **Real-time Performance Tracking** - Monitor engagement across all social platforms
- **Advanced Analytics Dashboard** - Comprehensive metrics with interactive charts
- **Engagement Rate Calculations** - Track trends and optimize content strategy
- **Audience Demographics** - Understand your audience better with detailed insights
- **ROI Tracking & Analysis** - Measure the impact of your social media efforts
- **Custom Report Generation** - Create tailored reports for stakeholders

### 🤖 **AI-Powered Tools**

- **Smart Content Creation** - AI-assisted post generation and optimization
- **Automated Scheduling** - Intelligent posting times based on audience activity
- **Content Optimization** - AI recommendations for better engagement
- **Trend Analysis** - Stay ahead with AI-powered trend detection

### 🔐 **Security & Authentication**

- **Secure User Authentication** - Powered by Clerk with multiple OAuth providers
- **Role-based Access Control** - Manage team permissions effectively
- **Data Protection** - Enterprise-grade security for your social media data

### 🎨 **User Experience**

- **Responsive Design** - Seamless experience across all devices
- **Dark/Light Mode** - Customizable interface preferences
- **Intuitive Dashboard** - Clean, modern interface built with Shadcn UI
- **Real-time Updates** - Live data synchronization across the platform

## 🛠️ Tech Stack

### **Frontend**

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Modern component library
- **[Magic UI](https://magicui.design/)** - Beautiful animated components
- **[Aceternity UI](https://ui.aceternity.com/)** - Premium UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations

### **Backend & Database**

- **[Prisma](https://prisma.io/)** - Next-generation ORM
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Clerk](https://clerk.com/)** - Authentication and user management

### **Data Visualization**

- **[Recharts](https://recharts.org/)** - Composable charting library
- **Custom Analytics Components** - Tailored data visualization

### **Development Tools**

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Jest](https://jestjs.io/)** - Testing framework
- **[Cypress](https://www.cypress.io/)** - E2E testing
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - Code quality
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MongoDB database
- Clerk account for authentication

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/Shreyas-29/luro-ai.git
    cd luro-ai
    pnpm install
    ```

# Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_APP_DOMAIN=

# Database
DATABASE_URL=

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/signin"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/signup"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL="/"

# Email Automation (Loops.so)
LOOPS_API_KEY=
NEXT_PUBLIC_LOOPS_FORM_ID=
```

4. Run the development server:
    ```bash
    pnpm run dev
    ```

## ☕ Buy Me a Coffee

If you enjoy using Luro, consider supporting my work!  
[Buy Me a Coffee ☕](https://buymeacoffee.com/shreyas29)

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 💬 Contact

If you have any questions or feedback, feel free to reach out via [GitHub Issues](https://github.com/Shreyas-29/luro-ai/issues).

---

Built with ❤️ by [Shreyas](https://shreyas-sihasane.vercel.app/)
