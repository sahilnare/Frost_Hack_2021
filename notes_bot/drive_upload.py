import json
import requests

def upload_file():
    headers = {"Authorization": "Bearer ya29.a0AfH6SMDK2ZNzPy63LO1pagmQr5BLhz2xSzhS6F8Mk_mLSapo3TKfHkVLZduai-o3nS423d2ixO9QVuhy-l9Swed6t0kQa3_uF8ZC84WbLxMF0d7BDci3CAn3E0jmtu2E7sAUN1FTAZS0E17QBhYyPPIRMO5S"}
    para = {
        "name": "output_final.pdf",
    }
    files = {
        'data': ('metadata', json.dumps(para), 'application/json; charset=UTF-8'),
        'file': open("./output_final.pdf", "rb")
    }
    r = requests.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        headers=headers,
        files=files
    )
    # print(r.text)
    return r.text

if __name__ == '__main__':
    op = upload_file()
    print(op)
