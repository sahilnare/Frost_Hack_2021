import sys
import os
import time
import cv2
import pyautogui
import numpy as np
from pydub import AudioSegment
import argparse
import queue


from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.alert import Alert

from screenshots import screenshot
from orb_sim import orb_sim
from orb_sim import print_save_final_images
from speech_to_text import generateText
from summary import SummariserCosine
import sounddevice as sd
import soundfile as sf
from scipy.io.wavfile import write
import wavio as wv
import threading
import pdfkit
from drive_upload import upload_file

parser = argparse.ArgumentParser()

parser.add_argument('-e', '--email', required = True,
                    help = "enter your google mail id")
parser.add_argument('-p', '--password', required = True,
                    help = "enter the password")
parser.add_argument('-m', '--meet', required = True,
                    help = "enter the meeting id for the bot")

args = vars(parser.parse_args())

opt = Options()
opt.add_argument("--disable-infobars")
opt.add_argument("--mute-audio")
opt.add_argument("start-maximized")
opt.add_argument("enable-usermedia-screen-capturing")
opt.add_experimental_option('excludeSwitches', ['test-type'])
opt.add_experimental_option("prefs", {
    "profile.default_content_setting_values.media_stream_mic": 1,
    "profile.default_content_setting_values.media_stream_camera": 1,
    "profile.default_content_setting_values.geolocation": 0,
    "profile.default_content_setting_values.notifications": 1
})

driver= webdriver.Chrome(options=opt)
meeting_end = False
q = queue.Queue()

def turnOffMicCam(driver):
    driver = driver
    time.sleep(2)
    driver.find_element_by_xpath("//*[@id='yDmH0d']/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[1]/div/div/div").click()
    driver.implicitly_wait(3000)
         #//*[@id="yDmH0d"]/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[1]/div
    time.sleep(1)
    driver.find_element_by_xpath(
        "//*[@id='yDmH0d']/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[2]/div/div").click()
    driver.implicitly_wait(3000)

def AskToJoin(driver):
    # Ask to Join meet
    driver=driver
    time.sleep(5)
    driver.implicitly_wait(200)
    driver.find_element_by_css_selector(
        'div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt').click()

def Glogin(mail_address, password, driver):
    driver = driver
    # Login Page
    driver.get(
        'https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=GAZAAQ')

    # input Gmail
    driver.find_element_by_id("identifierId").send_keys(mail_address)
    driver.find_element_by_id("identifierNext").click()
    driver.implicitly_wait(10)

    # input Password
    driver.find_element_by_xpath(
        '//*[@id="password"]/div[1]/div/div[1]/input').send_keys(password)
    driver.implicitly_wait(10)
    driver.find_element_by_id("passwordNext").click()
    driver.implicitly_wait(10)

    # go to google home page
    driver.get('https://google.com/')
    driver.implicitly_wait(50)

def joinNow(driver):
    # Join meet
    driver=driver
    time.sleep(5)
    driver.find_element_by_css_selector('div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt').click()
    driver.implicitly_wait(200)
    #driver.find_element_by_css_selector('div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt').click()
    print(1)


def record_video():
    codec = cv2.VideoWriter_fourcc(*"XVID")

    out = cv2.VideoWriter("Recorded.avi", codec , 10 , (1920, 1080))

    cv2.namedWindow("Recording", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("Recording", 480, 270) 
    global meeting_end

    while meeting_end == False:
        img = pyautogui.screenshot() #capturing screenshot
        frame = np.array(img) #converting the image into numpy array representation 
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) #converting the BGR image into RGB image
        out.write(frame) #writing the RBG image to file
        cv2.imshow('Recording', frame) #display screen/frame being recorded
        if cv2.waitKey(1) == ord('q'): #Wait for the user to press 'q' key to stop the recording
            break

    out.release() #closing the video file
    cv2.destroyAllWindows() #destroying the recording window

def take_screenshot():
    global meeting_end
    while meeting_end == False:
        screenshot()
        
        img1 = cv2.imread('./images/screenshot.png')
        img2 = cv2.imread('./images/to_compare.png')
        value = orb_sim(img1, img2)
        print(value)
        if value>=0.7:
            meeting_end = True
            return

        time.sleep(10) 

# def record_audio():
#     print("audio recording started!")
#     freq = 48000 # sampling frequency
#     duration = 120  # recording duraion

#     recording = sd.rec(int(duration * freq), samplerate=freq, channels=2)

#     # Record audio for the given number of seconds
#     sd.wait()

#     write("./audio_files/recording001.wav", freq, recording)

#     # Convert the NumPy array to audio file
#     wv.write("./audio_files/r.wav", recording, freq, sampwidth=2)

def callback(indata, frames, time, status):
    """This is called (from a separate thread) for each audio block."""
    if status:
        print(status, file=sys.stderr)
    q.put(indata.copy())

def record_audio():
    global meeting_end
    if os.path.exists('./audio_files/r1.wav'):
        os.remove('./audio_files/r1.wav')
    print("audio recording started!")
    freq = 48000 # sampling frequency
    print(meeting_end)
    
    with sf.SoundFile('./audio_files/r1.wav', mode='x', samplerate=freq,
                    channels= 2) as file:
        with sd.InputStream(samplerate=freq, channels=2, callback=callback):
            while meeting_end == False:
                file.write(q.get())

    return 


def functions():
    video_thread = threading.Thread(target=record_video, args=())
    video_thread.start()

    audio_thread = threading.Thread(target=record_audio, args=())
    audio_thread.start()

    screenshot_thread = threading.Thread(target=take_screenshot, args=())
    screenshot_thread.start()

    global meeting_end
    while meeting_end == False:
        time.sleep(10)

    print('MeetingEnded')
    driver.close()

    end_time = print_save_final_images()
    # time.sleep(300)

    t1 = 0
    t2 = 0
    k = 0

    try:
        os.mkdir('./audio_files/audio_segments')
    except Exception as e:
        print(e)

    dir = './audio_files/audio_segments'
    for f in os.listdir(dir):
        os.remove(os.path.join(dir, f))
        
    for t in end_time:
        t2 = t
        newAudio = AudioSegment.from_wav("./audio_files/r1.wav")
        newAudio = newAudio[t1*1000:t2*1000]
        newAudio.export('./audio_files/audio_segments/recording'+ str(k)+'.wav', format="wav") #Exports to a wav file in the current path.
        k = k+1
        t1 = t2
        # print("done" + str(k))

    k = 0

    sc = SummariserCosine()

    try:
        os.mkdir('./audio_files/text_segments')
    except Exception as e:
        print(e)
    
    try:
        os.mkdir('./audio_files/summary_segments')
    except Exception as e:
        print(e)

    dir = './audio_files/summary_segments'
    for f in os.listdir(dir):
        os.remove(os.path.join(dir, f))
    
    dir = './audio_files/text_segments'
    for f in os.listdir(dir):
        os.remove(os.path.join(dir, f))

    for filename in os.listdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio_files', 'audio_segments')):
        generateText(filename, k)
        # create_summary_file(k)
        fn = 'generated_' + str(k) + '.txt'
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio_files', 'text_segments', fn), 'r') as fi:
            text = fi.read()
            st, _ = sc.generate_summary(text)
            print(st)

        time.sleep(3)

        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio_files', 'summary_segments', fn), 'w') as fi:
            fi.write(st)
            print("done writing")

        k = k+1

    
    doc = '''<!DOCTYPE html>
    <html lang="en">

    <head>
    <title>Notes</title>
    </head>

    <body>'''
    
    file = open('doc.html','w')
    file.write(doc+'\n')
    file.close()

    doc = ' <h1>Notes</h1>'

    file = open('doc.html','a')
    file.write(doc+'\n')
    file.close()

    k = 0
    for filename in os.listdir('./images/data'):
        fname = 'generated_' + str(k) + '.txt'
        try:
            f = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio_files', 'summary_segments', fname), 'r')
            fileContent = f.read()  
            doc = ' <h1>'+fileContent+'</h1>'

            file = open('doc.html','a')
            file.write(doc +'\n')
            file.close()
            f.close()
            # summary_text = summary_text + " " + fileContent
        except IOError:
            print("File not accessible")
        
        loc = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images', 'data', filename)
        k = k+1
        doc = ' <img src=\''+loc+'\' alt="Description for image" width="1000" height="800">'

        file = open('doc.html','a')
        file.write(doc+'\n')
        file.close()

        doc = ' <h1>'+str(end_time[k-1]/60)+' minutes: </h1>'

        file = open('doc.html','a')
        file.write(doc+'\n')
        file.close()

    doc = '''
    </body>
    </html>
    '''

    file = open('doc.html','a')
    file.write(doc+'\n')
    file.close()
    
    path_wkhtmltopdf = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'
    config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
    options = {'enable-local-file-access': None}
    pdfkit.from_file(os.path.join(os.path.dirname(os.path.abspath(__file__)), "doc.html"), os.path.join(os.path.dirname(os.path.abspath(__file__)), "output_final.pdf"), configuration=config, options=options)
    time.sleep(5)
    head = upload_file()
    print(head)

# main working code
Glogin(args['email'], args['password'], driver)
driver.get('https://meet.google.com/'+ args['meet'])
time.sleep(2)

turnOffMicCam(driver)
joinNow(driver)

try:
    WebDriverWait(driver, 3).until(EC.alert_is_present(),
                                   'Timed out waiting for PA creation ' +
                                   'confirmation popup to appear.')

    alert = driver.switch_to.alert
    alert.accept()
    print("alert accepted")
except:
    print("no alert")

time.sleep(3)
functions()