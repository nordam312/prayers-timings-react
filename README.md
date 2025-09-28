# 🕌 Prayer Times App

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-success)](https://prayertimeee.netlify.app/)

[**🌐 Live Demo**](https://prayertimeee.netlify.app/)

</div>

## 📖 Overview

A modern and elegant web application for displaying prayer times for Turkish and Saudi cities with daily Islamic remembrances (Adhkar). Features an attractive user interface and responsive design that works seamlessly across all devices.

🔗 **Live Website:** [https://prayertimeee.netlify.app/](https://prayertimeee.netlify.app/)

## ✨ Features

- 🕌 **Accurate Prayer Times**: Display all five daily prayer times with high accuracy
- ⏰ **Live Countdown**: Shows remaining time until next prayer
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 🌙 **Elegant Dark Theme**: Warm, eye-comfortable colors
- 📿 **Daily Adhkar**: Various Islamic remembrances with translation and rewards
- 🔄 **Auto Updates**: Real-time updates for time and Adhkar
- 🏙️ **Multiple Cities**: Support for major Turkish and Saudi cities

## 🛠️ Technologies Used

- **Frontend Framework:** React 18 + Vite
- **UI Library:** Material-UI (MUI)
- **Styling:** CSS-in-JS + Custom CSS
- **API:** Aladhan Prayer Times API
- **Icons:** Material Icons
- **Hosting:** Netlify
- **Language:** JavaScript (ES6+)

## 🏙️ Supported Cities

### 🇹🇷 Turkey
- Istanbul
- Ankara

### 🇸🇦 Saudi Arabia
- Makkah (Mecca)
- Madinah (Medina)
- Riyadh
- Jeddah
- Dammam

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/prayers_timings.git
cd prayers_timings
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser at**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Production files will be in the `dist/` folder

## 📦 Deployment

### Deploy to Netlify

#### Method 1: Via GitHub (Recommended)

1. Push your project to GitHub
2. Go to [Netlify](https://www.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configuration:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click Deploy site

#### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Method 3: Drag & Drop

1. Build the project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to the page

## 📱 Screenshots

### Main Page
- Current time display
- City selection
- Next prayer countdown

### Prayer Cards
- Unique icons for each prayer
- Accurate timings
- Current prayer highlighting

### Adhkar Section
- Various remembrances
- English translations
- Rewards and virtues
- Auto-change every 10 seconds

## 👨‍💻 Developer

Developed by [Mohamed Nour Damlahi]

## 🙏 Acknowledgments

- [Aladhan API](https://aladhan.com/prayer-times-api) for providing prayer times data
- [Material-UI](https://mui.com/) for UI components
- [Netlify](https://www.netlify.com/) for free hosting

---

<div align="center">

**[🌐 Visit Website](https://prayertimeee.netlify.app/)**

Made with ❤️ for the Muslim Community

</div>