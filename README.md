# AI Time Tracker

> A modern, responsive web application for tracking daily activities with Firebase authentication and real-time database integration. Track your 24-hour day (1440 minutes) across different categories and visualize your time usage with interactive analytics.

## 🔗 Live Demo

**Deployed Application:** https://khushbooverma2197.github.io/FireBase-Evaluation/

**GitHub Repository:** https://github.com/khushbooverma2197/FireBase-Evaluation

## 🎥 Video Walkthrough

**Video Demo:** https://drive.google.com/file/d/15eDJtIiMpVv9nDGpydoldNQiOtsnP-uq/view?usp=drive_link

*2-5 minute walkthrough covering:*
- Main features demonstration
- Dashboard and analytics visualization
- "No data available" state
- Activity CRUD operations
- How AI tools (GitHub Copilot) were used in development

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Dashboard - Activity Tracking
![Dashboard](screenshots/dashboard.png)

### Analytics - Pie Chart Visualization
![Analytics](screenshots/analytics.png)

### No Data State
![No Data](screenshots/no-data.png)

### Mobile Responsive View
![Mobile View](screenshots/mobile.png)

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom animations, gradients, flexbox, grid, glassmorphism
- **JavaScript (ES6+)** - Vanilla JS with async/await, fetch API
- **Google Fonts** - Inter typeface

### Backend & Services
- **Firebase Authentication** - Email/Password + Google OAuth
- **Firebase Realtime Database** - NoSQL real-time data storage (Asia-Southeast1)
- **Firebase Hosting** - Static site deployment (optional)

### Libraries & Tools
- **Chart.js** - Interactive pie chart visualization
- **Firebase SDK v9.22.0** - Compat mode for auth and database

### Development Tools
- **VS Code** - Code editor
- **GitHub Copilot** - AI-assisted coding
- **Live Server** - Local development server
- **Git** - Version control

---

## ✨ Features

### 🔐 User Authentication
- ✅ Email/Password sign-up and login
- ✅ Google Sign-In integration
- ✅ Secure Firebase Authentication
- ✅ User-specific data isolation
- ✅ Protected routes (auto-redirect if not authenticated)

### 📝 Activity Management
- ✅ Add daily activities with name, category, and duration
- ✅ Edit existing activities
- ✅ Delete activities with confirmation
- ✅ Real-time calculation of total and remaining minutes
- ✅ Visual feedback with toast notifications
- ✅ Form validation (1-1440 minutes)
- ✅ Auto-save to Firebase Realtime Database
- ✅ Per-user, per-date activity logs

### 📊 Analytics Dashboard
- ✅ Interactive pie chart showing time distribution by category
- ✅ Daily statistics display (total hours, activity count)
- ✅ Beautiful gradient color scheme (10 unique colors)
- ✅ "Analyze" button enabled only when day is complete (1440 minutes)
- ✅ Empty state messaging when no data exists
- ✅ Responsive chart sizing

### 🎨 Modern UI/UX
- ✅ Dark theme with radial gradients
- ✅ Smooth page transitions and animations
- ✅ Glassmorphism effects with backdrop blur
- ✅ Interactive hover states on all buttons
- ✅ Ripple effects on button clicks
- ✅ Fade-in animations for rows and cards
- ✅ Toast notifications (success/error messages)
- ✅ Animated logo with pulse effect
- ✅ Gradient section titles with expanding underline
- ✅ Stat cards with hover lift effects

### 📱 Responsive Design
- ✅ Mobile-first approach (320px+)
- ✅ Tablet optimized (640px - 900px)
- ✅ Desktop layouts (900px+)
- ✅ Touch-friendly buttons (48px+ tap targets)
- ✅ Flexible grid layouts
- ✅ Viewport meta tag for proper scaling

### 🔒 Security Features
- ✅ Authentication required for all operations
- ✅ JWT tokens in all database requests
- ✅ User-specific database rules
- ✅ Data isolation (users only see their own data)
- ✅ Secure password handling by Firebase

---

## 🚀 How to Run the Project Locally

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Firebase account (free tier is sufficient)
- Git installed (optional, for cloning)

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd FireBaseEvaluation
```

Or download the ZIP file and extract it.

### Step 2: Set Up Firebase Project

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Enter project name (e.g., "ai-time-tracker")
   - Disable Google Analytics (optional)
   - Click "Create Project"

2. **Enable Authentication**
   - In Firebase Console, go to **Authentication** → **Sign-in method**
   - Enable **Email/Password** provider
   - Enable **Google** provider
   - Add your domain to authorized domains (for deployment)

3. **Create Realtime Database**
   - Go to **Realtime Database** → **Create Database**
   - Choose location: **asia-southeast1**
   - Start in **test mode** (we'll update rules next)

4. **Set Database Rules**
   - Go to **Realtime Database** → **Rules**
   - Replace with:
   ```json
   {
     "rules": {
       "users": {
         "$userId": {
           ".read": "auth != null && auth.uid == $userId",
           ".write": "auth != null && auth.uid == $userId"
         }
       }
     }
   }
   ```
   - Click **Publish**

5. **Get Firebase Configuration**
   - Go to **Project Settings** (gear icon) → **General**
   - Scroll to "Your apps" → Click **Web** icon (</>)
   - Register app with nickname
   - Copy the `firebaseConfig` object

### Step 3: Configure Firebase in Your Project

1. Open `firebase-config.js`
2. Replace the configuration with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. Save the file

### Step 4: Install Dependencies (Optional)

This project uses CDN links for all libraries, so no npm installation is needed. However, if you want a local development server:

**Option A: Using VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

**Option B: Using Python**
```bash
python -m http.server 8000
```

**Option C: Using Node.js**
```bash
npx http-server -p 8000
```

**Option D: Using PHP**
```bash
php -S localhost:8000
```

### Step 5: Run the Application

1. Open your browser
2. Navigate to `http://localhost:8000` (or the port shown by your server)
3. You should see the login page

### Step 6: Create an Account & Test

1. Click **"Sign up"** to create a new account
2. Or use **"Sign in with Google"**
3. After login, you'll be redirected to the dashboard
4. Try adding activities:
   - Activity: "Morning workout"
   - Category: "Exercise"
   - Minutes: 60
5. Add more activities until you reach 1440 minutes
6. Click **"Analyse this day"** to see the pie chart

---

## 📁 Project Structure

```
FireBaseEvaluation/
│
├── index.html              # Login page with authentication form
├── signup.html             # User registration page
├── dashboard.html          # Main application interface
│
├── style.css               # Global styles with animations (600+ lines)
│
├── firebase-config.js      # Firebase SDK initialization
├── auth-login.js           # Login authentication logic
├── auth-signup.js          # Signup authentication logic
├── dashboard.js            # Main app logic (371 lines)
│                            - CRUD operations
│                            - Chart rendering
│                            - Real-time calculations
│
├── README.md               # This file
└── screenshots/            # App screenshots (create this folder)
```

---

## 🎯 How AI Tools Were Used in Development

### GitHub Copilot Assistance

1. **Code Generation**
   - Auto-completing Firebase fetch requests with auth tokens
   - Generating CSS animations and keyframes
   - Writing responsive media queries
   - Creating toast notification function

2. **Refactoring**
   - Converting old localStorage code to Firebase
   - Restructuring database paths for user isolation
   - Optimizing event listener initialization

3. **Problem Solving**
   - Debugging authentication state management
   - Fixing async/await patterns in data loading
   - Resolving CORS issues with Firebase
   - Implementing proper error handling

4. **UI/UX Enhancements**
   - Suggesting modern CSS properties (backdrop-filter, gradients)
   - Recommending animation timing functions
   - Providing color palette suggestions
   - Creating glassmorphism effects

5. **Documentation**
   - Generating comprehensive README structure
   - Writing inline code comments
   - Creating setup instructions

### Development Workflow
```
1. Wrote function signature → Copilot suggested implementation
2. Created HTML structure → Copilot suggested CSS styling
3. Implemented feature → Copilot suggested error handling
4. Fixed bugs → Copilot suggested alternative approaches
5. Refactored code → Copilot improved efficiency
```

---

## 🐛 Troubleshooting

### Login Issues
**Problem:** Can't sign in with email/password
- ✅ Verify Firebase API key in `firebase-config.js`
- ✅ Check Authentication is enabled in Firebase Console
- ✅ Ensure email/password provider is active
- ✅ Check browser console for errors

**Problem:** Google Sign-In not working
- ✅ Enable Google provider in Firebase Console
- ✅ Add authorized domains in Firebase Authentication settings
- ✅ Check popup blockers in browser

### Data Not Showing
**Problem:** Activities not appearing after adding
- ✅ Check browser console for errors
- ✅ Verify database rules allow authenticated read/write
- ✅ Ensure user is logged in (check network tab for auth token)
- ✅ Check database URL matches your Firebase region

**Problem:** Old data from other users visible
- ✅ Clear browser cache and localStorage
- ✅ Verify database path includes user ID
- ✅ Check database rules enforce user isolation

### Analytics Issues
**Problem:** Analyse button stays disabled
- ✅ Ensure total minutes equals exactly 1440
- ✅ Check calculation logic in browser console
- ✅ Verify all activities have valid minute values

**Problem:** Chart not displaying
- ✅ Check Chart.js CDN is loading (network tab)
- ✅ Verify canvas element exists in HTML
- ✅ Ensure activities exist for selected date
- ✅ Check browser console for Chart.js errors

### Styling Issues
**Problem:** Animations not working
- ✅ Check CSS file is loading correctly
- ✅ Verify browser supports CSS animations
- ✅ Clear browser cache
- ✅ Test in different browser

---

## 📱 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |
| Chrome Mobile | 90+ | ✅ Full |

**Required Features:**
- CSS Grid & Flexbox
- CSS Animations & Transforms
- Fetch API
- ES6+ JavaScript
- backdrop-filter (for glassmorphism)

---

## 🔮 Future Improvements

### Planned Features
- [ ] **Weekly/Monthly Analytics** - Aggregate view across multiple days
- [ ] **Export Data** - Download activities as CSV/PDF
- [ ] **Dark/Light Theme Toggle** - User preference storage
- [ ] **Activity Templates** - Quick add for recurring activities
- [ ] **Time Range Picker** - Select start/end time instead of just minutes
- [ ] **Category Management** - Create custom categories with colors
- [ ] **Streak Counter** - Track consecutive days of complete logging
- [ ] **Notifications** - Remind user to log activities
- [ ] **Offline Mode** - PWA with service worker for offline access
- [ ] **Multi-language Support** - i18n for different languages

### Technical Enhancements
- [ ] **Unit Tests** - Jest/Mocha for testing functions
- [ ] **TypeScript** - Type safety for better development
- [ ] **State Management** - Redux/Context for complex state
- [ ] **Component Framework** - Migrate to React/Vue for scalability
- [ ] **API Layer** - Abstract Firebase calls into service layer
- [ ] **Error Boundary** - Graceful error handling UI
- [ ] **Performance Optimization** - Code splitting, lazy loading
- [ ] **Accessibility** - WCAG 2.1 AA compliance, screen reader support
- [ ] **CI/CD Pipeline** - Automated testing and deployment

### UI/UX Enhancements
- [ ] **Drag & Drop** - Reorder activities
- [ ] **Custom Themes** - User-created color schemes
- [ ] **Data Visualization** - More chart types (bar, line, area)
- [ ] **Activity Icons** - Visual category representations
- [ ] **Shortcuts** - Keyboard shortcuts for power users
- [ ] **Quick Stats** - Dashboard widgets for insights
- [ ] **Gamification** - Badges, achievements for consistency

---

## 🤝 Contributing

While this is a personal project for an AI assignment, suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes as part of a Masai School AI assignment.

**Use Case:** Portfolio project demonstrating Firebase integration and modern web development practices.

---

## 👤 Author

**Khushboo Verma**
- GitHub: [@khushbooverma2197](https://github.com/khushbooverma2197)
- Email: khushbooverma2197@gmail.com
- Portfolio: https://khushbooverma2197.github.io/

---

## 🙏 Acknowledgments

- **Masai School** - For the assignment and learning opportunity
- **Firebase** - For comprehensive backend infrastructure
- **Chart.js** - For beautiful data visualization
- **Google Fonts** - For the Inter typeface
- **GitHub Copilot** - For AI-assisted development
- **MDN Web Docs** - For excellent documentation
- **Firebase Documentation** - For clear API references

---

## 📊 Project Statistics

- **Total Lines of Code:** ~1,500+
- **JavaScript Files:** 4
- **HTML Pages:** 3
- **CSS Lines:** 600+
- **Development Time:** [Add your time]
- **Firebase Features Used:** 2 (Auth + Database)
- **Chart Types:** 1 (Pie Chart)
- **Responsive Breakpoints:** 4

---

**Built with ❤️ using Firebase, Vanilla JavaScript, and GitHub Copilot**

*Last Updated: December 9, 2025*

