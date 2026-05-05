# Chit-Chat - MERN Chat Application

A modern, full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can sign up, log in, and engage in real-time messaging with other users.

## 📸 Screenshots

### Authentication Pages

- **Sign Up Page**: Create a new account with name, email, password, and profile picture
- **Login Page**: Secure login with email and password authentication

### Main Chat Interface

- **Chat Dashboard**: Browse and manage conversations
- **Messages**: Real-time messaging with other users
- **User Search**: Search and connect with other users
- **Profile Management**: Update profile information and picture

## ✨ Features

- **User Authentication**: Secure sign-up and login with JWT tokens
- **Real-time Messaging**: Send and receive messages instantly
- **User Search**: Search for users and start conversations
- **Group Chats**: Create and manage group conversations
- **User Profiles**: Upload profile pictures and manage user information
- **Chat History**: View message history with other users
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User Presence**: See online status of other users

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client for API calls
- **CSS** - Styling

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Mongoose** - MongoDB ODM

## 📁 Project Structure

```
mern-chatapp/
├── backend/
│   ├── config/
│   │   ├── db.js           # Database connection
│   │   └── generateToken.js # JWT token generation
│   ├── controllers/
│   │   ├── userControllers.js    # User operations
│   │   ├── chatControllers.js    # Chat operations
│   │   └── messageControllers.js # Message operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # Authentication middleware
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js        # User schema
│   │   ├── Chat.js        # Chat schema
│   │   └── Message.js     # Message schema
│   ├── routes/
│   │   ├── user.js        # User routes
│   │   ├── chat.js        # Chat routes
│   │   └── message.js     # Message routes
│   ├── server.js          # Main server file
│   └── package.json
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Signup.js
│   │   │   ├── chats/
│   │   │   │   ├── ChatBox.js
│   │   │   │   ├── ChatLoading.js
│   │   │   │   ├── ChatPanel.js
│   │   │   │   ├── GroupChatModal.js
│   │   │   │   ├── MyChats.js
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Profile.js
│   │   │   │   ├── ScrollableChat.js
│   │   │   │   ├── SearchDrawer.js
│   │   │   │   └── SingleChat.js
│   │   │   └── user/
│   │   │       ├── ChatUser.js
│   │   │       ├── Rightbar.js
│   │   │       ├── UserBadgeItem.js
│   │   │       └── UserListItem.js
│   │   ├── config/
│   │   │   ├── auth-header.js    # API headers with auth token
│   │   │   └── chatLogic.js      # Chat utility functions
│   │   ├── context/
│   │   │   └── ChatProvider.js   # Global chat context
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── Chats.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
└── package.json (root)
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database set up
- Git installed

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mern-chatapp.git
   cd mern-chatapp
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

Create a `.env` file in the `backend` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Running the Application

**Terminal 1 - Start Backend Server**

```bash
cd backend
npm start
```

The server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server**

```bash
cd client
npm start
```

The client will run on `http://localhost:3000`

## 📝 API Endpoints

### User Routes

- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user` - Get all users
- `POST /api/user/search` - Search users

### Chat Routes

- `GET /api/chat` - Get all chats for user
- `POST /api/chat` - Create a new chat
- `PUT /api/chat/:id` - Update chat
- `DELETE /api/chat/:id` - Delete chat

### Message Routes

- `GET /api/message/:chatId` - Get all messages in a chat
- `POST /api/message` - Send a new message

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are generated on successful login/signup
- Tokens are stored in browser localStorage
- Protected routes check token validity in the `authMiddleware`

## 🎯 Usage

1. **Sign Up**: Create an account with your email, password, and profile picture
2. **Login**: Log in with your credentials
3. **Search Users**: Use the search feature to find and connect with other users
4. **Start Chatting**: Click on a user to start a direct conversation
5. **Create Groups**: Create group chats with multiple users
6. **Update Profile**: Click on your profile to update your information

## 📦 Dependencies

### Backend

- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors

### Frontend

- react
- react-router-dom
- axios
- lottie-react (for animations)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

Created as a full-stack MERN application project.

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check your `MONGO_URI` in `.env` is correct

### JWT Token Errors

- Clear browser cache and localStorage
- Ensure `JWT_SECRET` is set in `.env`

### Port Already in Use

- Change the PORT in `.env` if port 5000 is busy
- Change React app port using: `PORT=3001 npm start`

**Happy Chatting!** 💬
