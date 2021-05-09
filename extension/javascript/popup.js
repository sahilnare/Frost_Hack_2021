let email;

function disableButtons() {
  document.getElementById('signin').disabled = true;
}

function enableButtons() {
  document.getElementById('signin').disabled = false;
}

function login() {
  const email = document.getElementById('email').value;

  disableButtons();
  removeLoginScreen();

  chrome.runtime.sendMessage({
    command: 'email',
    email,
  });

  // fetch('https://standnote.herokuapp.com/rest-auth/login/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email, password }),
  // })
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       throw new Error('Something went wrong');
  //     }
  //   })
  //   .then((data) => {
  //     chrome.storage.sync.set({ key: data.key });
  //     chrome.storage.sync.set({ email });
  //     enableButtons();
  //     showRecordScreen(email);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     enableButtons();
  //   });
}

function removeLoginScreen() {
  document.getElementById('loggedin').style.display = 'block';
  document.getElementById('unlogged').style.display = 'none';
  document.querySelector('#loggedin').style.width = "150px";
  document.querySelector('#loggedin').style.height = "100px";
}

function addLoginListeners() {
  document.getElementById('loggedin').style.display = 'none';
  document.getElementById('signin').addEventListener('click', login);
}

addLoginListeners();

// chrome.storage.sync.get('email', (data) => {
//   if (!data.email) {
//     document.getElementById('login').style.display = 'block';
//     addLoginListeners();
//   } else {
//     showRecordScreen(data.email);
//   }
// });
