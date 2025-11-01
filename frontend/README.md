# StarDQ 2.0 Frontend

<div align="center">

![StarDQ Logo](https://img.shields.io/badge/StarDQ-2.0-007787?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite)

**AI-Augmented Data Quality Fabric Platform**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [License](#license)

---

## 🎯 Overview

**StarDQ 2.0** is an enterprise-grade, AI-augmented Data Quality Fabric platform designed to help organizations monitor, manage, and improve data quality across their entire data ecosystem. Built with modern web technologies, it provides an intuitive interface for data stewards, analysts, and IT administrators to ensure data integrity, compliance, and reliability.

### Key Highlights

- 🤖 **AI-Powered Insights**: Integrated GPT-4 copilot for intelligent data quality recommendations
- 📊 **Real-time Monitoring**: Live dashboards with quality trends and health metrics
- 🔍 **Comprehensive Profiling**: Automated data profiling with completeness, validity, and uniqueness checks
- 🛡️ **PII Masking**: Built-in data privacy and compliance features
- 🧹 **Automated Cleaning**: AI-suggested data cleaning operations with code generation
- 📈 **Visual Analytics**: Interactive charts and visualizations for quality insights
- 🔐 **Role-Based Access**: Fine-grained RBAC with 6 distinct user roles

---

## ✨ Features

### Core Capabilities

#### 1. **Dashboard & Analytics**
- Real-time KPI cards for key metrics
- 7-day quality score trends with bar charts
- Domain health overview with color-coded indicators
- Issue distribution breakdown
- Data quality gauges (completeness, validity, uniqueness)

#### 2. **Data Catalog**
- Multi-view display (grid/list)
- Advanced filtering by badge, domain, and search
- 8 sorting options
- Rich dataset cards with quality metrics

#### 3. **Data Cleaning Studio**
- 3-tab interface (Issues, Operations, Columns)
- Automatic detection of 7 types of data quality issues
- 6 AI-powered cleaning operations
- Before/after impact analysis
- Python/Pandas code generation

#### 4. **Rule Studio**
- 8 comprehensive rule templates
- AI-powered rule recommendations
- Multi-language code generation (SQL, Pandas, Spark)
- Test execution capabilities

#### 5. **AI Copilot**
- Interactive chat interface
- Context-aware suggestions
- Automatic code generation
- Risk assessment for operations

---

## 🛠️ Technology Stack

- **React 18**: Modern UI library with hooks
- **TypeScript 5.0**: Type-safe development
- **Vite 7.1**: Lightning-fast build tool
- **React Router 7**: Client-side routing
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icon set

---

## 📦 Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (or npm/yarn)
- **Git**: Latest version

### Install pnpm:

```bash
npm install -g pnpm
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Navigate to frontend directory
cd StarDQ/frontend

# Install dependencies
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

The app will start at `http://localhost:5173/`

### 3. Default Login

The app seeds with a default Data Steward user:
- **Name**: Ravi Kumar
- **Email**: ravi@example.com
- **Role**: Data Steward

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── atoms/           # Basic UI elements
│   │   ├── organisms/       # Complex components
│   │   └── layouts/         # Layout components
│   ├── pages/               # Page components
│   ├── stores/              # Zustand state stores
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities
│   ├── types/               # TypeScript definitions
│   └── styles/              # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📜 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking
```

---

## 🔐 Environment Variables

Create `.env` in project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# OpenAI (for AI Copilot)
VITE_OPENAI_API_KEY=your-key-here

# Feature Flags
VITE_ENABLE_AI_COPILOT=true
```

---

## 👨‍💻 Development Guide

### Code Style

- Use inline styles for consistency
- Follow TypeScript best practices
- Use Zustand for global state
- Follow atomic design principles

### Color Palette

```css
--primary: #012F35        /* Deep Teal */
--accent: #007787         /* Teal */
--accent-light: #00B3CA   /* Light Teal */
--success: #10b981        /* Green */
--warning: #FFA500        /* Orange */
--danger: #ef4444         /* Red */
```

---

## 🚢 Deployment

### Build

```bash
pnpm build
```

Output will be in `dist/` folder.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

## 📚 Documentation

- **[Product Documentation](./docs/PRODUCT_DOCUMENTATION.md)**: Comprehensive feature guide
- **[Case Study](./docs/CASE_STUDY.md)**: Real-world implementation example

---

## 📄 License

This project is proprietary software. All rights reserved.

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Vite**

**⭐ Star us on GitHub if you find this useful!**

</div>
