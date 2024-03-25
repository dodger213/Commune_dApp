from pydantic import BaseModel

class FileModel(BaseModel):
    video_filename: str
    image_filename: str
    audio_filename: str
    text_data: str
    time_created: str
    time_updated: str
