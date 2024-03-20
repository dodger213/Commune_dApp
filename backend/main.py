from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from controller import (
    save_address,
    save_file_data,
    get_file_by_id,
    get_all_files,
    save_transaction,
)
from databases import Database
import os
from embedding import get_image_video_text_embeddings
from dotenv import load_dotenv
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load .env file
load_dotenv()

project_id = os.getenv("PROJECT_ID")
location = os.getenv("LOCATION")
database_url = os.getenv("DATABASE_URL")

app = FastAPI()

database = Database(database_url)

# Configure CORS
origins = [
    "http://localhost:3000",  # Add the origins you want to allow
]

# to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url=database_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can specify specific HTTP methods if needed
    allow_headers=["*"],  # You can specify specific HTTP headers if needed
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.on_event("startup")
async def startup_db_client():
    await database.connect()


@app.on_event("shutdown")
async def shutdown_db_client():
    await database.disconnect()


@app.post("/upload")
async def upload_files(
    video: UploadFile = File(...),
    image: UploadFile = File(...),
    audio: UploadFile = File(...),
    text: str = Form(...),
    address: str = Form(...),
):
    # Create an "uploads" folder if it doesn't exist
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    # Save files with full path
    video_filename = os.path.join(upload_folder, video.filename)
    image_filename = os.path.join(upload_folder, image.filename)
    audio_filename = os.path.join(upload_folder, audio.filename)

    # Example: Get embeddings using OpenAI API
    # get_image_video_text_embeddings(
    #     project_id, location, image_filename, video_filename, text
    # )

    # Save video file
    with open(video_filename, "wb") as video_file:
        video_file.write(video.file.read())

    # Save image file
    with open(image_filename, "wb") as image_file:
        image_file.write(image.file.read())

    # Save audio file
    with open(audio_filename, "wb") as audio_file:
        audio_file.write(audio.file.read())

    # Process text data
    processed_text = text.upper()

    # Save data to database
    file_id = await save_file_data(
        video_filename, image_filename, audio_filename, processed_text, address
    )

    return JSONResponse(
        content={
            "message": "Files uploaded and data saved successfully",
            "file_id": file_id,
        }
    )


@app.get("/files/{file_id}")
async def get_file(file_id: int):
    file_data = await get_file_by_id(file_id)
    if file_data is None:
        raise HTTPException(status_code=404, detail="File not found")

    return file_data


@app.get("/files")
async def get_all_files_endpoint():
    all_files = await get_all_files()
    return all_files


class MetaMaskAddress(BaseModel):
    address: str


@app.post("/saveMetamask")
async def save_metamask_address(meta_mask_address: MetaMaskAddress):
    address = meta_mask_address.address
    user_id = await save_address(address)
    return JSONResponse(
        content={
            "message": "Address saved successfully",
            "user_id": user_id,
        }
    )


class Transaction(BaseModel):
    payType: str
    amount: float
    destinationAddress: str
    txHash: str


@app.post("/saveTransaction")
async def save_transaction_record(transaction: Transaction):
    payType = transaction.payType
    amount = transaction.amount
    destinationAddress = transaction.destinationAddress
    txHash = transaction.txHash
    user_id = await save_transaction(payType, amount, destinationAddress, txHash)
    return JSONResponse(
        content={
            "message": "Transaction saved successfully",
            "user_id": user_id,
        }
    )
