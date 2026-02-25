# 🚀 How to Deploy DreamCanvas to the Internet

To make your application accessible from anywhere in the world, you need to deploy (host) it on the internet. Since this is a full-stack app, the easiest and most standard approach is to host the **Backend on Render** and the **Frontend on Vercel**. Both have excellent **Free Tiers!**

Here is your step-by-step guide:

---

## Part 1: Prepare Your Code for Deployment

1. **Upload your code to GitHub**
   Before deploying, your entire project code needs to be on a GitHub repository. 
   - Create a new repository on [GitHub](https://github.com/).
   - Open your terminal in the `DreamCanvas-main` folder and run:
     ```bash
     git init
     git add .
     git commit -m "Ready for deployment"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```

---

## Part 2: Deploy the Node.js Backend (Render)

We will use **Render.com** (it’s free and perfect for Node.js).

1. Go to [Render.com](https://render.com/) and sign up with your GitHub account.
2. Click **New +** and select **Web Service**.
3. Choose **Build and deploy from a Git repository** and connect the GitHub repository you just created.
4. **Configure the Service:**
   - **Name:** `dreamcanvas-backend`
   - **Root Directory:** `backend` *(⚠️ Extremely Important: make sure you type `backend` here because your express server is inside this folder!)*
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   Scroll down to the "Environment Variables" section and click **Add Environment Variable**. Add all the secrets from your `backend/.env` file:
   - `MONGODB_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `your_jwt_secret`
   - `PORT` = `4000`
   - `HF_API_KEY` = `hf_YourHuggingFaceTokenHere`
6. Click **Create Web Service**. 
   - *It will take a few minutes to build. Once it finishes, Render will give you a live URL (e.g., `https://dreamcanvas-backend.onrender.com`). Copy this URL, you will need it for the frontend!*

---

## Part 3: Deploy the React Frontend (Vercel)

We will use **Vercel.com** (the best free host for Vite/React apps).

1. Go to [Vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your DreamCanvas GitHub repository.
4. **Configure Project:**
   - **Framework Preset:** Vercel should automatically detect `Vite`.
   - **Root Directory:** Edit this and LEAVE IT EMPTY (or select `./`) because your frontend code is in the main root folder.
5. **Environment Variables:**
   Open the dropdown for Environment Variables and add your backend's new public URL:
   - **Name:** `VITE_BACKEND_URL`
   - **Value:** `https://dreamcanvas-backend.onrender.com` *(Paste the URL you got from Render in Step 2 here. Make sure there is NO trailing slash `/` at the end!)*
6. Click **Deploy**.
   - *Vercel will build your frontend and within 1-2 minutes give you a beautiful, live `.vercel.app` link.*

---

## 🎉 You're Done!
You can now click on your Vercel link (e.g., `https://dreamcanvas.vercel.app`), send it to your friends from anywhere in the world, and they will be able to generate images for free on your deployed website!
