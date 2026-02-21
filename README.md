# Anti-Gravity Portfolio 🌌

A premium, immersive 3D personal portfolio built with React, Three.js, and Framer Motion. This project features a high-performance interactive interface with smooth animations and a secure contact system.

## ✨ Features

- **Immersive 3D Graphics**: Integrated Three.js via `@react-three/fiber` for real-time 3D particle fields and floating geometry.
- **Dynamic Animations**: Seamless transitions and entrance animations powered by **Framer Motion** and **GSAP**.
- **Modern UI Components**: Sleek, glassmorphic design system using **Shadcn/UI** and **Tailwind CSS**.
- **Interactive Navigation**: Custom-built interactive cursor and dimension-switching navigation.
- **Secure Contact Form**: Professional contact system integrated with **Resend API** and a Node.js backend to protect sensitive keys.
- **Responsive Architecture**: Fully mobile-responsive layout designed for all screen dimensions.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **3D Engine**: Three.js, React Three Fiber, Drei
- **Styling**: Tailwind CSS, Lucide Icons
- **UI Components**: Shadcn UI, Radix UI
- **Animations**: Framer Motion, GSAP
- **Backend**: Express.js, Node.js
- **Email Service**: Resend (Primary), Nodemailer (Backup)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (or bun/yarn)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/FRONTEND-DEV-KAUSHAL/personal-portfolio.git
   cd anti-gravity-journey-main
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   RESEND_API_KEY="your_resend_api_key"
   EMAIL_USER="your_gmail@gmail.com"
   EMAIL_PASSWORD="your_app_password"
   PORT=5000
   ```

### Running Locally

To run both the frontend and the backend simultaneously:
```bash
npm run dev:full
```

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend: [http://localhost:5000](http://localhost:5000)

## 📄 License

This project is personal portfolio work. All rights reserved.

---

Designed & Built by **Kaushal Gohil**
