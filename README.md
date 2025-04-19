# RenTech - Car Rental Platform

Welcome to **RenTech**, a modern car rental platform designed to make your car rental experience seamless and enjoyable. This project is built using **React** and **Node.js**, leveraging the power of **MongoDB** for data storage.

---

## 🚀 Features

- **User-Friendly Interface**: Intuitive design for both customers and office owners.
- **Dynamic Dashboard**: Separate dashboards for customers and office owners.
- **Vehicle Management**: Add, edit, and manage vehicles with ease.
- **Reservation System**: Book vehicles and manage reservations efficiently.
- **Secure Authentication**: Login and signup functionality with user roles.
- **Responsive Design**: Fully optimized for all devices.

---

## 📂 Project Structure

```
projectlast/
├── public/          # Static files
├── server/          # Backend server and APIs
│   ├── models/      # Mongoose models
│   └── server.js    # Main server file
├── src/             # Frontend source code
│   ├── components/  # React components
│   ├── App.js       # Main React app file
│   └── index.js     # Entry point
└── package.json     # Project metadata and dependencies
```

---

## 🛠️ Installation

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** (Node Package Manager)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/rentech.git
   cd rentech
   ```

2. **Install Dependencies**
   - For the frontend:
     ```bash
     npm install
     ```
   - For the backend:
     ```bash
     cd server
     npm install
     ```

3. **Set Up Environment Variables**
   Create a `.env` file in the `server/` directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3300
   ```

4. **Run the Application**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ..
     npm start
     ```

5. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

### Note for Server Configuration

If you are using this project, ensure that the `__dirname` variable in the `server.js` file is updated to match the absolute path of your server directory. This is required for serving static files correctly.

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note**: This is a one-way operation. Once you `eject`, you can’t go back!

---

## 🌟 Learn More

- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 📧 Contact

For any inquiries or support, please contact us at:
- **Email**: contact@rentech.com
- **Phone**: +968 99999999

---

### 🌐 Follow Us

Stay connected with us on social media:

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com)
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)

---

**Thank you for choosing RenTech!**
