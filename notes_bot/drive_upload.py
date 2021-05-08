import json
import requests

headers = {"Authorization": "Bearer ya29.a0AfH6SMDZrvL0yHVR59hX0ijBwoSZ01xbleXM8BNCDh65GObVMKkgJHK2mbh_9tUyrP_Y_vQOQEJ0Q6hOWMuCbrIxRyxnv44iTahwYeqUQpkyv1E-FmY3js2oJmkuWTCvFaLD4hvUWtzZpqQlDhIEIj5jUktk"}
para = {
    "name": "output.pdf",
}
files = {
    'data': ('metadata', json.dumps(para), 'application/json; charset=UTF-8'),
    'file': open("./output.pdf", "rb")
}
r = requests.post(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    headers=headers,
    files=files
)
print(r.text)
