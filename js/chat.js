// selecione elementos HTML
const chatList = document.querySelector(".chat-list");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-input input");
const chatSendButton = document.querySelector(".chat-input button");
const loadMessage = document.querySelector(".load-message");
const menuButton = document.querySelector(".menu-button");
const chatContent = document.querySelector(".content-chat");
const editContent = document.querySelector(".content-edit-infos");
const saveEdit = document.querySelector(".save-edit");
const cancelEdit = document.querySelector(".cancel-edit");
const inputImageUser = document.querySelector(".input-image-user");
const inputName = document.querySelector(".input-name");
const persona = document.getElementById("persona-image");
const personaName = document.querySelector("#my-name");

// inicialize dados de chat
let activeChat = "Gabi";
const mockChats = {
  Gabi: {
    messages: [{ author: "you", text: "Oii" }],
  },
  Charles: {
    messages: [{ author: "you", text: "Fala comigo" }],
  },
};

// funções auxiliares
function renderChatList() {
  let html = "";
  for (const chat in mockChats) {
    html += `<li class="${
      chat === activeChat ? "active" : ""
    }" data-chat="${chat}">${chat}</li>`;
  }
  chatList.innerHTML = html;
}

function renderMessages() {
  let html = "";
  for (const message of mockChats[activeChat].messages) {
    html += `<li class="${message.author}" >
    <div class='user-image' id="${message.author}"></div>
    <span class='message'>${message.text}</span>
    
    </li>`;
  }
  chatMessages.querySelector("ul").innerHTML = html;
  chatMessages.scrollTop = chatMessages.scrollHeight;
  saveEditInfos();
}

function sendMessage() {
  const text = chatInput.value.trim();
  const author = "me";

  if (text.length > 0) {
    mockChats[activeChat].messages.push({ author, text });
    renderMessages();
    chatInput.value = "";
    loadMessage.classList.add("active");

    setTimeout(() => {
      loadMessage.classList.remove("active");
      const text = "Texto de resposta";
      const author = "you";

      mockChats[activeChat].messages.push({ author, text });
      renderMessages();
      saveEditInfos();
    }, 5000);
  }
}

function showEdit() {
  chatContent.classList.add("removed");
  editContent.classList.add("show");
}

function cancelEdidInfos() {
  chatContent.classList.remove("removed");
  editContent.classList.remove("show");
}

function saveEditInfos() {
  const newImagePersona = inputImageUser.value.trim();
  const newNamePersona = inputName.value.trim();

  if (newImagePersona.length > 0) {
    const meAuthorMessage = document.querySelectorAll("#me");

    chatContent.classList.remove("removed");
    editContent.classList.remove("show");
    persona.style.backgroundImage = `url(${newImagePersona})`;

    for (let index = 0; index < meAuthorMessage.length; index++) {
      meAuthorMessage[index].style.backgroundImage = `url(${newImagePersona})`;
    }
  }

  if (newNamePersona.length > 0) {
    personaName.textContent = newNamePersona;
    chatContent.classList.remove("removed");
    editContent.classList.remove("show");
  }
}

// eventos
chatList.addEventListener("click", (ev) => {
  if (ev.target.tagName === "LI") {
    activeChat = ev.target.dataset.chat;
    renderChatList();
    renderMessages();
  }
});

chatSendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    sendMessage();
  }
});

menuButton.addEventListener("click", () => {
  let r = confirm(
    `Para ver esse botao em funcionamento, terá que depositar no pix...\nBrincadeira não sou a EA... 😂\nEle executará assim que voce apertar em 'OK'`
  );
  if (r == true) {
    showEdit();
  }
});

saveEdit.addEventListener("click", saveEditInfos);
saveEdit.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    saveEditInfos();
  }
});
cancelEdit.addEventListener("click", cancelEdidInfos);

// renderizar o chat inicial
renderChatList();
renderMessages();
