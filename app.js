const button = document.getElementById('button');
const name = document.getElementById('name');
const text = document.getElementById('text');
const footer = document.getElementById('footer');

function send() {
  const obj = {}; /* 객체에 넣는다. */
  obj.username = name.value;
  obj.text = text.value;
  obj.roomname = '코드스테이츠';
  /* POST */
  fetch('http://52.78.206.149:3000/messages', { 
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { "content-type": "application/json", }
  }).then(res => res.json());
  /* input을 초기화 한다. */
  name.value = ''; 
  text.value = '';
}

function addText(obj) {
  const div = document.createElement('div');
  div.innerText = obj.username + ' : ' + obj.text;
  footer.appendChild(div);
}

function get() {
  footer.innerHTML = '';
  fetch('http://52.78.206.149:3000/messages')
    .then(res => res.json())
    .then(json => {
      for(let i = json.length - 1; i > json.length - 21; i--) {
        addText(json[i]);
      }
    });
}

button.addEventListener('click', function() {
  send();
  setTimeout(function() {
    get();
  }, 500);
});

get();