import os
from os.path import join, dirname
import speech_recognition as s_r
import json
from ibm_watson import SpeechToTextV1
from ibm_watson.websocket import RecognizeCallback, AudioSource
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

def generateText(filename, counter):
    # audio_file = s_r.AudioFile(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio_files/audio_segments', filename))

    # rcgnzr = s_r.Recognizer()
    authenticator = IAMAuthenticator('f09rZM-7l8kgahUEpLPdz8nyFjr04mLxG98ucWXcvc0O') 
    service = SpeechToTextV1(authenticator = authenticator)

    service.set_service_url('https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/b6641254-9640-4297-bd4e-8187ea49f967')


    # with audio_file as source: 
    #     rcgnzr.adjust_for_ambient_noise(source) 
    #     clean_audio = rcgnzr.record(source)


    # recognized_speech_ibm = speech_to_text.recognize(clean_audio,content_type="audio/wav").get_result()
    with open(join(dirname('__file__'), 'audio_files/audio_segments', filename), 'rb') as audio_file:
      
        dic = json.loads(
                json.dumps(
                    service.recognize(
                        audio=audio_file,
                        content_type='audio/wav',   
                        model='en-US_BroadbandModel',
                    ).get_result(), indent=2))
  
        str1 = ""
        
        while bool(dic.get('results')):
            str1 = dic.get('results').pop().get('alternatives').pop().get('transcript')+str1[:]
            
  
        # print(str1)
        fn = 'generated_' + str(counter) + '.txt'


        with open(f'./audio_files/text_segments/{fn}',mode ='w') as file:    
            file.write(str1) 
            print('done')

if __name__ == '__main__':
    k = 0
    for fi in os.listdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio_files', 'audio_segments')):
        generateText(fi, k)
        k += 1