import json
import requests

#to generate authentication api visit https://developers.google.com/oauthplayground/ then select Drive API v3 then click authorize api(will generate temporary auth api key)
#then click on generate access token from keys and paste that access token below
def upload_file():
    headers = {"Authorization": "Bearer [your google auth2 authentication api]"}
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
