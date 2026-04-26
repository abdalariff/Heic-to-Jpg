# HEIC to JPG Converter — Local & Secure

A production-quality full-stack web application to convert HEIC/HEIF images to JPG directly on your local machine. No cloud processing, no privacy concerns.

![UI Preview](https://via.placeholder.com/1200x600.png?text=HEIC+to+JPG+Converter+UI)

## 🚀 Features
- **Local Processing**: Runs entirely on your machine.
- **Batch Conversion**: Convert multiple images at once.
- **Adjustable Quality**: Fine-tune JPG compression (1-100).
- **Native Downloads**: Uses blob-based downloads to ensure the browser handles file saving (bypassing IDM/external managers).
- **Dark Mode**: Modern, responsive UI with theme persistence.
- **Auto-Cleanup**: Temporary files are automatically deleted after processing.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Sonner Toasts.
- **Backend**: Node.js, Express, Sharp, HEIC-Convert, Multer.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/abdalariff/Heic-to-Jpg.git
cd Heic-to-Jpg
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:5000`.

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## 🔒 Privacy
This tool is designed to be secure. Your images never leave your local environment. The server uses a temporary directory that is automatically cleared every 5 minutes.

---
Built with ❤️ for privacy-conscious developers and users.