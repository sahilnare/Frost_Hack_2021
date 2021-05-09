console.log('Hello Google Meet!');

chrome.runtime.sendMessage({
  command: 'fetch_ques',
  meetlink: document.URL
});

function sendQues(question) {
  chrome.runtime.sendMessage({
    command: 'broadcast_ques',
    question: question,
    meetlink: document.URL
  });
}

function answerQues(answer) {
  console.log(answer);
  // chrome.runtime.sendMessage({
  //   command: 'broadcast_ques',
  //   question: question,
  //   meetlink: document.URL
  // });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.command === 'teacher_ques') {

    request.questions.forEach((ques, i) => {
      let quesString = `
        <div id="injected${i}">
          <button id="ques${i}" class="broadcast">Broadcast this question</button>
          <div>
            <label for="answer" id="questionLabel${i}">${ques.title}</label>
          </div>
          <p>${ques.option1}</p>
          <p>${ques.option2}</p>
          <p>${ques.option3}</p>
          <p>${ques.option4}</p>
        </div>
      `;
        document.querySelector('body').insertAdjacentHTML( 'beforeend', quesString );
        var injected = document.querySelector('#injected' + i);
        var bottomH = i*220
        injected.style.width = '500px';
        injected.style.height = '200px';
        injected.style.position = 'absolute';
        injected.style.left = '50px';
        injected.style.bottom = bottomH + 'px';
        injected.style.zIndex = '100';
        injected.style.background = '#FFF';
        injected.style.flexDirection = 'column';
        injected.style.alignItems = 'center';
        injected.style.justifyContent = 'center';

        var quesEle = document.querySelector('#questionLabel' + i);
        quesEle.style.fontSize = '18px';
        quesEle.style.fontWeight = '500';
        var broad = document.querySelector('.broadcast');
        broad.style.display = 'block';

        document.querySelector('#ques'+i).addEventListener('click', () => sendQues(request.questions[i]));
    });
  }

  if(request.command === 'student_ques') {
    let question = request.question;
    console.log(question);
    let quesString = `
      <div id="injectedS">
        <div>
          <label for="answer" id="questionLabelS">${question.title}</label>
        </div>
        <button id="answer1" class="options">${question.option1}</button>
        <button id="answer2" class="options">${question.option2}</button>
        <button id="answer3" class="options">${question.option3}</button>
        <button id="answer4" class="options">${question.option4}</button>
      </div>
    `;
      document.querySelector('body').insertAdjacentHTML( 'beforeend', quesString );
      var injected = document.querySelector('#injectedS');
      injected.style.width = '500px';
      injected.style.height = '200px';
      injected.style.position = 'absolute';
      injected.style.left = '50px';
      injected.style.bottom = '320px';
      injected.style.zIndex = '100';
      injected.style.background = '#FFF';
      injected.style.flexDirection = 'column';
      injected.style.alignItems = 'center';
      injected.style.justifyContent = 'center';

      var quesEle = document.querySelector('#questionLabelS');
      quesEle.style.fontSize = '18px';
      quesEle.style.fontWeight = '500';
      var broad = document.querySelector('.options');
      broad.style.display = 'block';

      document.querySelector('#answer1').addEventListener('click', () => answerQues(question.option1));
      document.querySelector('#answer2').addEventListener('click', () => answerQues(question.option2));
      document.querySelector('#answer3').addEventListener('click', () => answerQues(question.option3));
      document.querySelector('#answer4').addEventListener('click', () => answerQues(question.option4));

      setTimeout(() => {
        document.querySelector('#injectedS').style.display = "none";
      }, 10000)
  }
});
