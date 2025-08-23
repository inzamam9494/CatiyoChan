# 🎮 CatiyoChan

### A Full-Stack Gaming Community Platform for Emulators and ROMs & BLOGS

<div align="center">

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/inzamam9494/CatiyoChan)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-green.svg)](https://mongodb.com/)

*A modern, responsive web application for gaming enthusiasts to discover, download, and discuss retro games and emulators.*

[Live Demo](#) • [Documentation](#documentation) • [Contributing](#contributing) • [Support](#support)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📖 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎯 Usage](#-usage)
- [📚 API Documentation](#-api-documentation)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🌟 Features

### 🎮 Core Gaming Features
- **Multi-Platform Support**: ROMs for Nintendo Switch, PlayStation, Xbox, Nintendo Wii, and more
- **Emulator Library**: Comprehensive collection of emulators for various gaming platforms
- **Advanced Search**: Find games by title, category, platform, or developer
- **Game Details**: Detailed information including screenshots, file sizes, and descriptions
- **Download Management**: Direct download links with file size information

### 💬 Community Features
- **Comment System**: User discussions on games and emulators with category-specific filtering
- **Help Center**: Report issues and get community support
- **Request System**: Request specific ROMs or emulators from the community
- **Responsive Design**: Optimized for desktop and mobile devices

### 🔧 Technical Features
- **Pagination**: Efficient data loading with infinite scroll
- **Real-time Search**: Instant search results as you type
- **Error Handling**: Comprehensive error management and user feedback
- **Performance Optimized**: Lazy loading and data caching
- **RESTful API**: Clean, documented API endpoints

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Frontend - React/Vite] --> B[API Layer - Axios]
    B --> C[Backend - Express.js]
    C --> D[Database - MongoDB]
    C --> E[Static Files - JSON Data]
    
    subgraph "Frontend Components"
        F[Game Screens]
        G[Comment System]
        H[Search & Pagination]
    end
    
    subgraph "Backend Services"
        I[ROM Controllers]
        J[Comment Controllers]
        K[Help Center]
    end
```

**Architecture Highlights:**
- **Frontend**: React 19 with Vite for fast development and building
- **Backend**: Node.js with Express for RESTful API
- **Database**: MongoDB for user-generated content (comments, reports)
- **Data Storage**: JSON files for game and emulator metadata
- **State Management**: Custom React hooks for API interactions

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/inzamam9494/CatiyoChan.git
cd CatiyoChan

# Install dependencies for both frontend and backend
npm run install:all

# Set up environment variables
cp backend/.env.example backend/.env

# Start development servers
npm run dev
```

Your application will be running at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

---

## 📖 Installation

### Prerequisites

- **Node.js**: Version 18 or higher
- **MongoDB**: Local instance or MongoDB Atlas account
- **Git**: For version control
- **npm** or **yarn**: Package manager

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/inzamam9494/CatiyoChan.git
cd CatiyoChan
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### 4. Database Setup
```bash
# Start MongoDB service (if running locally)
sudo systemctl start mongod

# Or use MongoDB Atlas connection string in .env
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/CatiyoChan_DB

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Security (Optional)
JWT_SECRET=your_jwt_secret_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Configuration

Update `src/constant/baseUrl.js`:

```javascript
export const BASE_URL = 'http://localhost:4000/api/v1/public/user';
```

---

## 🎯 Usage

### For Users

#### Browsing Games
1. **Navigate Categories**: Choose from various gaming platforms
2. **Search Games**: Use the search bar to find specific titles
3. **View Details**: Click on any game to see detailed information
4. **Download**: Use the download button to get game files

#### Community Interaction
1. **Post Comments**: Share your thoughts on games and emulators
2. **Report Issues**: Use the help center for technical problems
3. **Request Content**: Ask for specific ROMs or emulators

### For Developers

#### Adding New Game Categories
```javascript
// In backend/src/data/gamelist.json
{
  "gamelist": {
    "New Console Game List": [
      {
        "game_name": "Game Title",
        "slug": "game-title",
        "game_id": 1,
        "game_image": "https://example.com/image.jpg",
        "game_size": "2.5 GB",
        "game_category": "Action",
        "game_details": {
          "console": "New Console",
          "publisher": "Publisher Name",
          "released": "2024-01-01",
          "developer": "Developer Name",
          "filesize": "2.5 GB",
          "genre": "Action",
          "description": "Game description here...",
          "downloadLink": "https://example.com/download"
        }
      }
    ]
  }
}
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api/v1/public/user
```

### Game Endpoints

#### Get All ROM Categories
```http
GET /roms-categories
```
**Response:**
```json
{
  "statusCode": 200,
  "data": "Roms categories fetched successfully",
  "message": [
    {
      "_id": "category_id",
      "name": "Nintendo Switch",
      "slug": "nintendo-switch-1",
      "description": "Nintendo Switch ROMs",
      "icon": "https://example.com/icon.png"
    }
  ]
}
```

#### Get Games by Category
```http
GET /roms-categories/{slug}?page=1&limit=20
```
**Parameters:**
- `slug`: Category slug (e.g., "nintendo-switch-1")
- `page`: Page number (optional, default: 1)
- `limit`: Items per page (optional, default: 20, max: 500)

#### Get Game by ID
```http
GET /games/{id}
```

### Comment Endpoints

#### Post Comment
```http
POST /comments
Content-Type: application/json

{
  "content": "Great game!",
  "name": "User Name",
  "email": "user@example.com",
  "game": 1,
  "gameCategory": "nintendo-switch-1",
  "commentType": "game"
}
```

#### Get Game Comments
```http
GET /comments/game/{category}/{gameId}
```

### Error Responses

All endpoints return consistent error formats:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "success": false
}
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI Framework |
| **Vite** | 7.0.0 | Build Tool |
| **TailwindCSS** | 4.1.11 | Styling |
| **Axios** | 1.10.0 | HTTP Client |
| **React Router** | 7.6.2 | Routing |
| **Lucide React** | 0.525.0 | Icons |
| **React Responsive** | 10.0.1 | Responsive Design |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime |
| **Express** | 5.1.0 | Web Framework |
| **MongoDB** | 6.17.0 | Database |
| **Mongoose** | 8.16.0 | ODM |
| **CORS** | 2.8.5 | Cross-Origin Requests |
| **Dotenv** | 16.5.0 | Environment Variables |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Nodemon** | Auto-restart server |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |

---

## 📁 Project Structure

```
CatiyoChan/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/          # Request handlers
│   │   │   ├── comment.controllers.js
│   │   │   ├── roms.controllers.js
│   │   │   └── help.center.controllers.js
│   │   ├── 📁 models/               # Database models
│   │   │   ├── comment.model.js
│   │   │   └── gamelist.model.js
│   │   ├── 📁 routes/               # API routes
│   │   │   └── public.user.routes.js
│   │   ├── 📁 middlewares/          # Custom middleware
│   │   ├── 📁 utils/                # Utility functions
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   └── asyncHandler.js
│   │   ├── 📁 data/                 # JSON data files
│   │   │   ├── gamelist.json
│   │   │   └── emulators_list.json
│   │   ├── 📁 db/                   # Database configuration
│   │   ├── app.js                   # Express app setup
│   │   ├── server.js               # Server entry point
│   │   └── constants.js            # App constants
│   ├── package.json
│   └── .env.example
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/           # Reusable components
│   │   │   ├── 📁 common/
│   │   │   └── 📁 ui/
│   │   │       ├── CommentCard.jsx
│   │   │       ├── GameCard.jsx
│   │   │       └── HelpModal.jsx
│   │   ├── 📁 pages/                # Page components
│   │   │   ├── HomeScreen.jsx
│   │   │   ├── GameScreen.jsx
│   │   │   └── GameDetailScreen.jsx
│   │   ├── 📁 hooks/                # Custom React hooks
│   │   │   ├── useApi.js
│   │   │   └── useMediaQuery.js
│   │   ├── 📁 services/             # API services
│   │   │   └── apiService.js
│   │   ├── 📁 constant/             # Constants
│   │   │   └── baseUrl.js
│   │   ├── 📁 routes/               # Routing
│   │   │   └── Routers.jsx
│   │   ├── 📁 layout/               # Layout components
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── README.md
└── .gitignore
```

---

## 🔧 Development

### Development Workflow

1. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

2. **Code Style Guidelines**
- Follow ESLint rules for JavaScript
- Use Prettier for consistent formatting
- Follow React hooks best practices
- Use semantic commit messages

3. **Testing**
```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

### Adding New Features

#### 1. Backend API Endpoint
```javascript
// controllers/example.controllers.js
export const exampleController = asyncHandler(async (req, res) => {
  // Implementation
  res.status(200).json(
    new ApiResponse(200, data, "Success message")
  );
});
```

#### 2. Frontend Hook
```javascript
// hooks/useExample.js
export const useExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Implementation
  
  return { data, loading, error };
};
```

#### 3. React Component
```jsx
// components/ExampleComponent.jsx
const ExampleComponent = ({ prop1, prop2 }) => {
  const { data, loading } = useExample();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="component-styles">
      {/* Component JSX */}
    </div>
  );
};
```

---

## 🚢 Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
# Build files will be in dist/
```

#### Backend
```bash
cd backend
# Set NODE_ENV=production in .env
npm start
```

### Deployment Options

#### 1. **Vercel (Frontend)**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

#### 2. **Heroku (Full Stack)**
```bash
# Create Procfile in root
echo "web: cd backend && npm start" > Procfile

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### 3. **Docker**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 4000

CMD ["npm", "start"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://yourdomain.com
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Getting Started
1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

### Contribution Guidelines

#### Code Standards
- Follow existing code style
- Add tests for new features
- Update documentation
- Use descriptive commit messages

#### Commit Message Format
```
type(scope): description

Examples:
feat(comments): add category-specific filtering
fix(api): resolve pagination bug
docs(readme): update installation guide
```

#### Pull Request Process
1. Ensure CI/CD checks pass
2. Update README if needed
3. Add screenshots for UI changes
4. Request review from maintainers

### Development Setup for Contributors
```bash
# Fork and clone
git clone https://github.com/your-username/CatiyoChan.git
cd CatiyoChan

# Add upstream remote
git remote add upstream https://github.com/inzamam9494/CatiyoChan.git

# Create feature branch
git checkout -b feature/your-feature-name

# Install dependencies
npm run install:all

# Start development
npm run dev
```

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

---

## 👨‍💻 Author

**Inzamam**
- GitHub: [@inzamam9494](https://github.com/inzamam9494)
- Email: [Contact](mailto:your-email@example.com)
- LinkedIn: [Profile](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped this project grow
- Gaming community for feature requests and feedback
- Open source libraries that make this project possible

---

## 📞 Support

### Getting Help
- 📖 Check the [Documentation](#documentation)
- 🐛 Report bugs in [Issues](https://github.com/inzamam9494/CatiyoChan/issues)
- 💬 Join our [Discord](https://discord.gg/your-server) community
- 📧 Email support: support@catiyochan.com

### Frequently Asked Questions

**Q: How do I add new game categories?**
A: Edit the `backend/src/data/gamelist.json` file and add your category following the existing structure.

**Q: Can I contribute game ROMs?**
A: Please ensure you have legal rights to any content you wish to contribute.

**Q: How do I report a bug?**
A: Use the GitHub Issues tab with the bug report template.

---

<div align="center">

### ⭐ Star this project if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/inzamam9494/CatiyoChan.svg?style=social&label=Star)](https://github.com/inzamam9494/CatiyoChan)
[![GitHub forks](https://img.shields.io/github/forks/inzamam9494/CatiyoChan.svg?style=social&label=Fork)](https://github.com/inzamam9494/CatiyoChan/fork)

**Made with ❤️ by the CatiyoChan Team**

</div>
