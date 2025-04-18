import firebase_admin
from firebase_admin import credentials, firestore
import os

# Get the absolute path to the service account file
service_account_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'blog-feff1-firebase-adminsdk-fbsvc-581ceb2365.json')

# Initialize Firebase Admin SDK with the service account file
cred = credentials.Certificate(service_account_path)
firebase_admin.initialize_app(cred)

# Get Firestore instance
db = firestore.client()

# Export the database instance
__all__ = ['db'] 