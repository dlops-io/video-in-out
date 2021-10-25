import os
import io
from pathlib import Path
from fastapi import APIRouter, Query
from fastapi import Header
from fastapi import Request, Response
from starlette.responses import FileResponse
from starlette.responses import StreamingResponse
import aiofiles

# Define Router
router = APIRouter()
CHUNK_SIZE = 1024*1024

# Routes


@router.get("/get_videos_list")
async def get_videos_list():
    videos_list = os.listdir("inputs")

    return videos_list


@router.get("/get_video")
async def get_video_data(
        path: str = Query(..., description="Video path")
):
    print(path)
    video_path = os.path.join("inputs", path)
    # return FileResponse(video_path, media_type="video/mp4")
    # with open(video_path, "rb") as video:
    #     return StreamingResponse(video, media_type="video/mp4")

    # async def file_gen(file_name, blocksize=1024 * 1024):
    #     async with aiofiles.open(file_name, mode="rb") as file_like:

    #         chunk = await file_like.read(blocksize)
    #         while chunk:
    #             yield chunk
    #             chunk = await file_like.read(blocksize)

    # return StreamingResponse(file_gen(video_path), media_type="video/mp4")

    video_file = open(video_path, mode="rb")

    return StreamingResponse(video_file, media_type="video/mp4")


@router.get("/video")
async def video_endpoint(path: str = Query(..., description="Video path"), range: str = Header(None)):
    start, end = range.replace("bytes=", "").split("-")
    start = int(start)
    end = int(end) if end else start + CHUNK_SIZE

    video_path = os.path.join("inputs", path)
    video_path = Path(video_path)

    with open(video_path, "rb") as video:
        video.seek(start)
        data = video.read(end - start)
        filesize = str(video_path.stat().st_size)
        headers = {
            'Content-Range': f'bytes {str(start)}-{str(end)}/{filesize}',
            'Accept-Ranges': 'bytes'
        }
        return Response(data, status_code=206, headers=headers, media_type="video/mp4")

# @router.post("/text2image")
# async def text2audio(json_obj: dict):
#     print(print(json_obj))

#     output_dir = "outputs"
#     os.makedirs(output_dir, exist_ok=True)

#     # Generate a unique id
#     file_id = uuid.uuid1()
#     file_path = os.path.join(output_dir, str(file_id)+".png")

#     img = Image.new('RGB', (300, 200), color=(73, 109, 137))
#     d = ImageDraw.Draw(img)
#     d.text((100, 100), json_obj["text"], fill=(255, 255, 0))

#     # Save the image
#     img.save(file_path)

#     return {
#         "image_path": file_path,
#         "text": json_obj["text"]
#     }
