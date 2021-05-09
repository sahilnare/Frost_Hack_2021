const socket = io('http://localhost:8000', {
  transports: ['websocket'],
  autoConnect: false,
});

console.log("Background Loaded");

let active_tab_id = -1;
let current_url = "";
let current_meet = ""

function connectToServer(url) {
  socket.connect();
  const meetId = url.split('/').slice(-1)[0].split('?')[0];
  const local_email = JSON.parse(localStorage.getItem('frost_email'));
  console.log("sending to server", meetId, local_email.email);
  socket.emit("join room", meetId, local_email.email);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  if(/^https:\/\/meet.google/.test(tab.url)) {
    if(changeInfo.status === "complete") {
      current_url = tab.url;
      active_tab_id = tabId;
      connectToServer(tab.url);
      chrome.tabs.executeScript(tabId, {file: './javascript/content.js'}, () => {
        console.log("script injected");
        // chrome.tabs.get(tabId, tab => console.log(tab));
      });
    }
  }
});

socket.on('come ques', (question) => {
  chrome.tabs.sendMessage(active_tab_id, {question: question, command: 'student_ques'});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if(request.command === "email") {
    localStorage.setItem('frost_email', JSON.stringify({email: request.email}));
    fetch('http://localhost:8000/api/class/getRole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: request.email})
    }).then(res => res.json()).then(res => {
      console.log(res);
      localStorage.setItem('frost_role', JSON.stringify({role: res.role}));
    });
  }

  if(request.command == "fetch_ques") {
    let storage = JSON.parse(localStorage.getItem('frost_role'));
    console.log(request);
    if(storage.role == "teacher") {
      console.log("here");
      fetch('http://localhost:8000/api/class/getMeetQuestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({meetlink: request.meetlink})
      }).then(res => res.json()).then(res => {
        console.log(res);
        chrome.tabs.sendMessage(active_tab_id, {questions: res.questions, command: 'teacher_ques'});
      });
    }
  }

  if(request.command === "broadcast_ques") {
    const meetId = request.meetlink.split('/').slice(-1)[0].split('?')[0];
    console.log("broadcasting question", request.question, meetId);
    socket.emit("broadcast ques", request.question, meetId);
  }

});
