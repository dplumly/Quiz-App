# Quiz App README

## Overview

This is a Vue.js quiz application with a Node backend.
- **Frontend:** Vue 3 + Vite
- **Backend:** Node.js, saves quiz submissions to a CSV

---

## Folder Structure

```
root/
├─ backend/
│   ├─ server.js          # Node server handling submissions
│   ├─ csv/
│   │   └─ data.csv       # CSV file storing quiz responses
│   ├─ package.json
│   └─ node_modules/
├─ frontend/
│   ├─ index.html
│   ├─ vite.config.js
│   ├─ package.json
│   ├─ node_modules/
│   ├─ public/
│   │   └─ questionnaire.json   # Quiz questions JSON
│   └─ src/
│       └─ ... Vue components
```

---

## Setup Instructions

### 1. Install Dependencies

From **backend**:

```bash
cd backend
npm install
```

From **frontend**:

```bash
cd frontend
npm install
```

> ⚠️ **Do NOT run npm install or npm run dev from the root folder.**
> Only run commands inside `frontend/` or `backend/` to avoid conflicts.

---

### 2. Start the Servers

**Backend** (Node server):

```bash
cd backend
node server.js
```

**Frontend** (Vue dev server):

```bash
cd frontend
npm run dev
```

> Open the URL printed by Vite (usually `http://localhost:5173`) to view the quiz app.

---

### 3. Questions

- Quiz questions are stored in:  
  `frontend/public/questionnaire.json`
- Any edits to questions should be made here.
- **Do not move this file**, or the frontend will fail to load the quiz.

---

### 4. CSV / Submission

- Quiz answers are saved by the backend to:  
  `backend/csv/data.csv`
- The frontend sends submissions to the backend at:  
  `http://localhost:3000/submit-quiz`

---

### 5. Notes / Gotchas

- **Progress Bar:**
  - Only fills when a user selects an answer.
  - Starts at 0% on the first question.

- **Static assets:**
  - Any file placed in `frontend/public/` should be referenced from `/filename.ext` in your Vue components.
  - For example: `/Results-bg.mp4` not `/frontend/public/Results-bg.mp4`.

- **Aliases:**
  - Use `@` to reference `frontend/src/` in imports:  
    ```js
    import Component from '@/components/Component.vue'
    ```

- **Do not run Vite from root:**
  - Running `npm run dev` from the root folder will break paths and imports.

---

### 6. Production Build (Optional)

```bash
cd frontend
npm run build
```

This generates a `dist/` folder you can serve with any static server or backend.

---

### 7. Contact / Support

- For any issues with paths, assets, or submissions, refer to **frontend/public/** and **backend/cs