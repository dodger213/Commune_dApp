from sqlalchemy import select
from databases import Database
from models import FileModel, UserModel, TransactionRecordModel
import os

database = Database(os.environ["DATABASE_URL"])


async def connect_to_database():
    await database.connect()


async def disconnect_from_database():
    await database.disconnect()


async def save_file_data(
    video_filename: str,
    image_filename: str,
    audio_filename: str,
    text_data: str,
    address: str,
):
    try:

        await connect_to_database()

        query = FileModel.__table__.insert().values(
            video_filename=video_filename,
            image_filename=image_filename,
            audio_filename=audio_filename,
            text_data=text_data,
            wallet_address=address,
        )

        return await database.execute(query)

    finally:
        await disconnect_from_database()


async def get_file_by_id(file_id: int):
    try:
        await connect_to_database()
        query = select(FileModel).where(FileModel.c.id == file_id)
        return await database.fetch_one(query)
    finally:
        await disconnect_from_database()


async def get_all_files():
    try:
        await connect_to_database()
        query = select(FileModel)
        return await database.fetch_all(query)
    finally:
        await disconnect_from_database()


async def save_address(address: str):
    try:
        await connect_to_database()

        query = select([UserModel]).where(UserModel.meta_mask_address == address)
        existing_address = await database.fetch_one(query)

        if existing_address:
            return "Address already exists in the database"

        insert_query = UserModel.__table__.insert().values(meta_mask_address=address)
        return await database.execute(insert_query)

    finally:
        await disconnect_from_database()


async def save_transaction(
    payType: str, amount: str, destinationAddress: str, txHash: str
):
    try:
        await connect_to_database()
        insert_query = TransactionRecordModel.__table__.insert().values(
            payType=payType,
            amount=amount,
            destinationAddress=destinationAddress,
            txHash=txHash,
        )
        return await database.execute(insert_query)
    finally:
        await disconnect_from_database()
