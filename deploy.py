import os
from google.cloud import storage
from google.oauth2 import service_account

# Set up credentials
credentials = service_account.Credentials.from_service_account_file(
    'blog-feff1-firebase-adminsdk-fbsvc-581ceb2365.json',
    scopes=['https://www.googleapis.com/auth/cloud-platform']
)

# Initialize the storage client
storage_client = storage.Client(credentials=credentials)
bucket_name = 'blog-feff1.appspot.com'

# Create bucket if it doesn't exist
try:
    bucket = storage_client.get_bucket(bucket_name)
except Exception:
    bucket = storage_client.create_bucket(bucket_name)
    print(f'Created bucket {bucket_name}')

# Upload files from dist directory
def upload_directory(directory_path):
    for root, _, files in os.walk(directory_path):
        for file in files:
            local_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_path, directory_path)
            blob = bucket.blob(relative_path)
            blob.upload_from_filename(local_path)
            print(f'Uploaded {relative_path}')

# Deploy the site
if __name__ == '__main__':
    dist_path = os.path.join(os.path.dirname(__file__), 'dist')
    upload_directory(dist_path)
    print('Deployment completed successfully!') 