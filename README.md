
# Ed-AI by Team Did It All For The Cookies


## Problem
Due to the pandemic, one thing which changed drastically was the education and many were not ready for it.
From teachers to students, they cannot associate it with offline learning and feel a little overwhelmed. After the pandemic also, online education will stay.
Currently we are focusing on two main problems:
Most Classes happen on video conferencing sites like Google Meet, Zoom, etc. It gets difficult for students to make notes as most teachers don't write anything. They show pdf, give information verbally or sometimes play video, so students don’t have anything to study during exams or tests.
We are developing solutions which help students to make automatic notes with all pictures of slides and what the teacher taught about that slide.

It gets difficult for teachers to identify which students are   attentive during the lecture. For the teachers, online education has become a boring non-interactive way of teaching.
Students get distracted very easily. Students enter the class and don’t give attention in class. They surf social media, watch videos or they leave class meet on and go somewhere else.
 Teachers can speak out the names of a few but not of  hundred students. So our solution will help teachers to make class more interactive and attentive for students.

## Solution
We have 3 parts for our solution:
Web Application 
Chrome Extension
Notes Taking Bot

We have implemented mainly two features:
1. One for students to free them from the hassle of making notes by creating a bot that will enter the online lecture on platforms like Google Meet. It will automatically take screenshots of the screen shared by the teacher and 
convert whole audio into text. 
We will then process this text and make a short summary of what the teacher taught, and save it in form of editable doc file or pdf, which will show picture of slide and summary of what teacher taught below that, which will be shown on our web app where students can store it there, edit it and share it with their friends. 


2. Another feature is for teachers, using which they can check for the attentiveness of students during the lecture.
They will create a class and generate a meet link for the students on our web app. 
We have created a chrome extension using which the teacher can pop a question anytime during a live lecture which will be shown on the students screen and a student has to answer the question in the given time frame and the result of which will be shown on the teacher’s dashboard on our web app.


## Instructions to run the bot
#### It is running on python 3.7.6

<ul>
  <li> First run "python -r requirements.txt", It will install all the necessary dependacies </li>
  <li> Then install wkhtmltopdf from https://wkhtmltopdf.org/downloads.html </li>
  <li> to run the bot, enter "python bot.py -e [your gmail account mail id] -p [password of your gmail account] -m [meeting link (code only)] </li>
  <li> As an output, output_final.pdf file will be generated </li>
</ul>

## Working of the bot

<ul>
  <li> Firstly we are using selenium to enter the google meet through link provided </li>
  <li> After entering the meet, bot will automatically start recording the meet(without audio) using opencv video recorder and it will also record audio in the background using sounddevice and store it as a .wav file </li>
  <li> After the end of meet, the bot will capture screenshots from recorded video, delete the duplicate screenshots and store the final distinct screenshots along with their time stamps </li>
  <li> Using the timestamps of previous point, bot will divide the whole recorded audio in smaller chunks and pass it through ibm_watson speech to text api to generate text file from it </li>
  <li> From this generated text files, summary will be generated using the function generate_summary in summary.py file </li>
  <li> using the captured screenshots and summary file, bot will create one html doc (for formatting and image storing purpose) and using wkhtmltopdf configuration with pdfkit bot will convert it into pdf "output_final.pdf", which will be stored locally and on google drive.</li>
