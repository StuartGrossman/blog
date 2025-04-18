from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from firebase_init import db
from firebase_admin import auth

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class BlogPost(BaseModel):
    title: str
    content: str
    password: str
    timestamp: Optional[datetime] = None

class PasswordVerification(BaseModel):
    password: str

class DeletePostRequest(BaseModel):
    password: str

@app.post("/api/posts")
async def create_post(post: BlogPost):
    try:
        # Verify password
        if post.password != "sniper":
            raise HTTPException(status_code=401, detail="Invalid password")
        
        # Create a new document in Firestore
        doc_ref = db.collection('blog_posts').document()
        post_data = {
            'title': post.title,
            'content': post.content,
            'timestamp': post.timestamp or datetime.now()
        }
        doc_ref.set(post_data)
        
        return {"message": "Post created successfully", "id": doc_ref.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/posts")
async def get_posts():
    try:
        # Get all posts from Firestore
        posts_ref = db.collection('blog_posts')
        posts = posts_ref.order_by('timestamp', direction='DESCENDING').stream()
        
        posts_list = []
        for post in posts:
            post_data = post.to_dict()
            post_data['id'] = post.id
            posts_list.append(post_data)
        
        return posts_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/posts/{post_id}")
async def delete_post(post_id: str, request: DeletePostRequest):
    try:
        # Verify password
        if request.password != "sniper":
            raise HTTPException(status_code=401, detail="Invalid password")
        
        # Delete the post from Firestore
        db.collection('blog_posts').document(post_id).delete()
        
        return {"message": "Post deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/verify-password")
async def verify_password(verification: PasswordVerification):
    try:
        # Verify password (you should use a more secure method in production)
        if verification.password == "sniper":  # Replace with your actual password
            return {"verified": True}
        else:
            return {"verified": False}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Blog API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 