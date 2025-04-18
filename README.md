# Blog Application

A modern blog application built with React, FastAPI, and Firebase.

## Features

- Real-time messaging
- Password-protected content
- Responsive design
- Firebase integration for data storage

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Firebase SDK

- Backend:
  - FastAPI
  - Python
  - Firebase Admin SDK

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. Install frontend dependencies:
   ```bash
   cd src
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration details

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   python main.py
   ```

2. Start the frontend development server:
   ```bash
   cd src
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
blog/
├── server/             # Backend code
│   ├── main.py        # FastAPI application
│   ├── firebase_init.py
│   └── firebase_config.py
├── src/               # Frontend code
│   ├── components/    # React components
│   ├── config/        # Configuration files
│   ├── services/      # Service modules
│   └── App.tsx        # Main application component
└── .env.example       # Environment variables template
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
