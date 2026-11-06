# Project 1: QuickFeedback (Contact & Feedback Form)

A simple full-stack MERN application demonstrating GitHub Actions CI/CD workflows and deployment to AWS S3 & EC2.

---

## 🛠 Local Setup & Testing

### 1. Backend
```bash
cd backend
npm install
npm test          # Verify tests pass
npm start         # Starts backend at http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev       # Starts Vite dev server at http://localhost:3000
npm run build     # Verifies production bundle builds without errors
```

---

## 🚀 How to Connect to GitHub Actions

1. In GitHub, create a new repository: `quickfeedback`.
2. Initialize and push this folder:
   ```bash
   cd D:\githubactionpractice\project1-quickfeedback
   git init
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/quickfeedback.git
   git add .
   git commit -m "feat: initial commit for Project 1"
   git push -u origin main
   ```
3. Set up the required GitHub Secrets in **Settings > Secrets and variables > Actions**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `S3_BUCKET_NAME`
   - `EC2_HOST`
   - `EC2_USER` (`ubuntu`)
   - `EC2_SSH_KEY`
   - `MONGO_URI`

