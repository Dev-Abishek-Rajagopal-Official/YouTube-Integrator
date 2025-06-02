# YouTube Integrator

YouTube Integrator is a full-stack application designed to seamlessly integrate and manage YouTube content. Built with a Python backend and a TypeScript frontend, this project aims to provide users with an intuitive interface to interact with YouTube's API and manage video content efficiently.

## Features

* **YouTube API Integration**: Fetch and display video data using YouTube's API.
* **Responsive Frontend**: A user-friendly interface built with modern web technologies.
* **Backend Services**: Robust backend to handle API requests and data processing.

## Technologies Used

### Backend

* **Python**: Core programming language for backend development.
* **Framework**: Django.

### Frontend

* **Framework**: React.JS.
* **Styling**: CSS and HTML for layout and design.

## Project Structure

```

YouTube-Integrator/
├── yt_backend/
│   └── [Backend source files]
│   └── .env
├── yt_frontend/
│   └── yt-frontend/
│       └── [Frontend source files]
├── README.md
```



## Getting Started

### Prerequisites

* **Node.js**: For frontend development.
* **Python 3.x**: For backend development.
* **Google API Key**:

---

### ✅ Final Guide: YouTube API Key Setup for React + Django Integration

---

#### 🔐 Step 1: Get Your YouTube API Key

1. **Go to** [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. **Create a new project** (or use an existing one)
3. **Enable YouTube Data API v3**:

   * Go to [https://console.cloud.google.com/apis/library](https://console.cloud.google.com/apis/library)
   * Search for and enable **YouTube Data API v3**
4. **Create API Key**:

   * Go to [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
   * Click **“+ Create Credentials” → “API Key”**
   * Copy the key
5. **Restrict Your API Key** (Recommended):

   * Choose `IP address` restriction if you're using this from Django backend
   * Restrict usage to **YouTube Data API v3**

---

#### ⚙️ Step 2: Add the API Key to Django

**1. Add `.env` file to your Django root:**

```env
YOUTUBE_API_KEY=your_real_youtube_api_key_here
```


---

#### 🛡️ Step 3: Add These Django URLs

```python
from django.urls import path
from . import views

urlpatterns = [
    path("api/youtube/search", name="youtube-search"),
    path("api/youtube/video", name="youtube-video-detail"),
]
```


### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Dev-Abishek-Rajagopal-Official/YouTube-Integrator.git
   cd YouTube-Integrator
   ```



2. **Setup Backend**:

   ```bash
   cd yt_backend
   pip install -r requirements.txt
   # Run backend server
   python manage.py runserver
   ```



3. **Setup Frontend**:

   ```bash
   cd yt_frontend/yt-frontend
   npm install
   # Run frontend development server
   npm start dev
   ```



## Usage

Once both the backend and frontend servers are running:

1. Navigate to `http://localhost:5173` in your web browser.
2. Use the application to interact with YouTube content.

