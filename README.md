# AI Time Tracker

A modern, responsive web application for tracking daily activities with Firebase authentication and real-time database integration. Track your 24-hour day (1440 minutes) across different categories and visualize your time usage with interactive analytics.

## 🚀 Features

### Core Functionality
- **User Authentication**
  - Email/Password sign-up and login
  - Google Sign-In integration
  - Secure Firebase Authentication
  - User-specific data isolation

- **Activity Management**
  - Add, edit, and delete daily activities
  - Categorize activities (Work, Sleep, Exercise, etc.)
  - Track minutes spent on each activity
  - Real-time calculation of total and remaining minutes
  - Per-user, per-date activity logs

- **Analytics Dashboard**
  - Visual pie chart showing time distribution by category
  - Daily statistics (total hours, activity count)
  - Analyze button enabled only when day is complete (1440 minutes)
  - Beautiful gradient color scheme for categories

### UI/UX
- **Modern Design**
  - Dark theme with gradient backgrounds
  - Smooth animations and transitions
  - Glassmorphism effects with backdrop blur
  - Interactive hover states and micro-interactions
  - Toast notifications for user feedback

- **Responsive Design**
  - Mobile-friendly (320px+)
  - Tablet optimized (640px - 900px)
  - Desktop layouts (900px+)
  - Touch-friendly buttons and controls

## 🛠️ Technologies Used

- **Frontend**
  - HTML5
  - CSS3 (Custom animations, gradients, flexbox, grid)
  - Vanilla JavaScript (ES6+)

- **Backend & Database**
  - Firebase Realtime Database (Asia-Southeast1)
  - Firebase Authentication
  - REST API with fetch()

- **Visualization**
  - Chart.js for pie charts

## 📁 Project Structure

```
FireBaseEvaluation/
│
├── index.html              # Login page
├── signup.html             # User registration page
├── dashboard.html          # Main application interface
│
├── style.css               # Global styles with animations
│
├── firebase-config.js      # Firebase configuration
├── auth-login.js           # Login authentication logic
├── auth-signup.js          # Signup authentication logic
├── dashboard.js            # Main app logic (358 lines)
│
└── README.md               # This file
```

## 🔧 Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account
- Web server (Live Server, Python SimpleHTTPServer, or similar)

### Installation

1. **Clone or download the project**
   ```bash
   cd FireBaseEvaluation
   ```

2. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google Sign-In)
   - Enable Realtime Database
   - Set database region to `asia-southeast1`
   - Update `firebase-config.js` with your credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

3. **Set Database Rules**
   In Firebase Console → Realtime Database → Rules:
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

4. **Run the Application**
   - Using VS Code Live Server: Right-click `index.html` → Open with Live Server
   - Or using Python:
     ```bash
     python -m http.server 8000
     ```
   - Or using Node.js:
     ```bash
     npx http-server
     ```

5. **Access the Application**
   - Open `http://localhost:8000` (or your server port)
   - Create an account or sign in with Google

## 📖 How to Use

### 1. Authentication
- **Sign Up**: Click "Sign up" on login page, enter email and password
- **Login**: Use email/password or Google Sign-In button
- **Logout**: Click the logout button in the header

### 2. Adding Activities
1. Select a date (defaults to today)
2. Enter activity name (e.g., "Deep Work", "Gym Session")
3. Enter category (e.g., "Work", "Exercise", "Sleep")
4. Enter minutes spent (1-1440)
5. Click "Add Activity"
6. Watch your progress update in real-time!

### 3. Editing Activities
1. Click "Edit" button on any activity
2. Modify the details in the form
3. Click "Save Changes"

### 4. Deleting Activities
1. Click "Delete" button on any activity
2. Confirm the deletion

### 5. Analyzing Your Day
1. Add activities until total reaches 1440 minutes
2. "Analyse this day" button becomes enabled
3. Click to view:
   - Total hours logged
   - Number of activities
   - Pie chart showing time distribution by category

## 🎨 UI Features

### Animations
- **Page Load**: Smooth fade-in with slide-up effect
- **Cards**: Staggered animation on load, hover lift effect
- **Buttons**: Ripple effect on click, smooth transforms
- **Table Rows**: Fade-in animation, hover highlight
- **Toast Notifications**: Slide in from right

### Color Scheme
- **Background**: Dark gradient (#020617 to #0f172a)
- **Accent**: Purple to blue gradient (#6366f1, #a855f7)
- **Success**: Green (#22c55e, #34d399)
- **Danger**: Red (#f87171, #f97373)
- **Chart**: 10 gradient colors for categories

### Interactive Elements
- Glassmorphism header with backdrop blur
- Animated logo with pulse effect
- Gradient-filled section titles with expanding underline
- Stat cards with gradient top border on hover
- Action buttons with emoji icons

## 🔐 Security Features

- User authentication required for all operations
- JWT tokens included in all database requests
- User-specific data isolation (users can only access their own data)
- Secure password authentication
- Google OAuth integration

## 📊 Database Structure

```
firebase-app/
└── users/
    └── {userId}/
        └── {date}/          # Format: YYYY-MM-DD
            ├── activity1/
            │   ├── title: "Deep Work"
            │   ├── category: "Work"
            │   └── minutes: 120
            ├── activity2/
            │   ├── title: "Gym"
            │   ├── category: "Exercise"
            │   └── minutes: 60
            └── ...
```

## 🌟 Key Highlights

- **Zero Framework**: Pure vanilla JavaScript - no React, Vue, or Angular
- **Modern CSS**: Gradients, animations, glassmorphism, responsive design
- **Real-time Updates**: Instant UI updates on data changes
- **User Isolation**: Complete data separation between users
- **Professional UI**: Smooth animations, toast notifications, hover effects
- **Accessible**: Keyboard navigation, semantic HTML, ARIA labels

## 🐛 Troubleshooting

### Login Issues
- Verify Firebase API key is correct
- Check that Authentication is enabled in Firebase Console
- Ensure Google Sign-In provider is configured

### Data Not Showing
- Check browser console for errors
- Verify database rules allow read/write for authenticated users
- Ensure user is logged in (check network tab for auth token)

### Analytics Not Working
- Ensure total minutes equals exactly 1440
- Check that Chart.js CDN is loading
- Verify activities exist for the selected date

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🤝 Contributing

This is a personal project for AI assignment evaluation. If you'd like to suggest improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes as part of an AI assignment.

## 👥 Author

Created for Masai School AI Assignment

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Chart.js for visualization
- Google Fonts (Inter) for typography
- Masai School for the assignment opportunity

---

**Built with ❤️ using Firebase + Vanilla JavaScript**
