import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Blog</h1>
                <p className="text-gray-600 mb-8">
                    This is a simple blog application built with React, FastAPI, and Firebase.
                </p>
                <Link 
                    to="/test" 
                    className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Go to Test Page
                </Link>
            </div>
        </div>
    );
};

export default Home; 