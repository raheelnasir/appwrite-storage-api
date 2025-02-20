# Appwrite File Storage API

![Appwrite](https://avatars.githubusercontent.com/u/25003669?s=280&v=4)

## 🚀 Project Overview
This is a **Node.js & TypeScript** backend API for managing file storage using **Appwrite**. It provides endpoints for uploading, retrieving, and managing files efficiently.

## 📌 Features
- 📂 **File Upload** - Store files securely in Appwrite
- 🔍 **Retrieve Files** - Access stored files via API
- 🗑 **Delete Files** - Remove unwanted files
- 🏷 **Metadata Handling** - Manage file metadata
- 🔧 **TypeScript Support** - Fully typed API for better maintainability
- 🔥 **Modular Code** - Organized and scalable structure

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Storage**: Appwrite
- **Environment Management**: dotenv

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/raheelnasir/appwrite-storage-api.git
cd appwrite-storage-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
APPWRITE_ENDPOINT=https://your-appwrite-server.com/v1
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-secret-api-key
APPWRITE_BUCKET_ID=your-storage-bucket-id
PORT=5000
```

### 4️⃣ Start the Development Server
```sh
npm run dev
```

For production build:
```sh
npm run build && npm start
```

---

## 🔗 API Endpoints

### 📤 Upload a File
```http
POST /api/file/upload
```
**Request:**
- `multipart/form-data`
- `file: <binary file>`

**Response:**
```json
{
  "fileId": "unique-file-id",
  "fileUrl": "https://appwrite-storage-url"
}
```

### 📥 Get a File
```http
GET /api/file/:fileId
```
**Response:**
- Returns the file content

### 🗑 Delete a File
```http
DELETE /api/file/:fileId
```
**Response:**
```json
{
  "message": "File deleted successfully"
}
```

---

## 🛠 Troubleshooting & Debugging
### 🛑 Common Issues & Fixes

1️⃣ **Module Not Found ("@/router")**
   - Ensure TypeScript path aliases are correctly set in `tsconfig.json`:
     ```json
     {
       "compilerOptions": {
         "baseUrl": "./src",
         "paths": {
           "@/*": ["*"]
         }
       }
     }
     ```

2️⃣ **Appwrite SDK Version Mismatch**
   - If you see a warning about SDK version mismatch:
     ```sh
     npm install node-appwrite@1.5.10
     ```
     (or update your Appwrite server to `1.6.0`)

3️⃣ **Build Issues Including `node_modules`**
   - Add `exclude` in `tsconfig.json`:
     ```json
     {
       "exclude": ["node_modules"]
     }
     ```

---

## 📜 License
This project is **MIT Licensed**.

---

## 🙌 Contributing
Feel free to submit a pull request! 😊

```sh
git checkout -b feature-branch
# Make changes
git commit -m "Added a cool feature"
git push origin feature-branch
```

---

## 📞 Contact
- **Author**: [Raheel Nasir](https://github.com/raheelnasir)
- **Email**: iraheeel@gmail.com

