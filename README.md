
# FROST HACK 2021

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
