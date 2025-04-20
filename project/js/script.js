// === Declaraties
const chatLog = document.querySelector('#chat-log');
const form = document.querySelector('#comment-form');
const emailInput = document.querySelector('#email');
const commentInput = document.querySelector('#comment');
const typingIndicator = document.querySelector('#typing-indicator');
const themeBtn = document.querySelector('#toggle-theme');

const GRAVATAR_URL = 'https://www.gravatar.com/avatar/';
const STORAGE_KEY = 'chatroom-messages';
const TYPING_TIMEOUT = 1000;
let typingTimeoutId = null;

// === Functies
function renderMessage({ email, text, avatar }) {
	const div = document.createElement('div');
	div.className = 'chat-message';
	div.innerHTML = `
    <img src="${avatar}" title="${email}" />
    <div class="message-content">${text}</div>
  `;
	chatLog.appendChild(div);
	chatLog.scrollTop = chatLog.scrollHeight;
}

async function getMD5(email) {
	const encoder = new TextEncoder();
	const data = encoder.encode(email.trim().toLowerCase());
	const hashBuffer = await crypto.subtle.digest('SHA-1', data);
	return [...new Uint8Array(hashBuffer)]
		// eslint-disable-next-line no-magic-numbers
		.map(b => b.toString(16).padStart(2, '0')).join('');
}

function showTyping() {
	typingIndicator.classList.remove('hidden');
	clearTimeout(typingTimeoutId);
	typingTimeoutId = setTimeout(() => {
		typingIndicator.classList.add('hidden');
	}, TYPING_TIMEOUT);
}

function toggleTheme() {
	document.body.classList.toggle('dark-mode');
	localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

function loadMessages() {
	const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
	for (const msg of stored) renderMessage(msg);
}

function saveMessage(msg) {
	const current = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
	current.push(msg);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

// === Events
form.addEventListener('submit', async(e) => {
	e.preventDefault();
	const email = emailInput.value.trim();
	const text = commentInput.value.trim();

	if (!email || !text) return;

	const hash = await getMD5(email);
	const avatar = `${GRAVATAR_URL}${hash}?d=mp`;

	const message = { email, text, avatar };
	renderMessage(message);
	saveMessage(message);

	commentInput.value = '';
	typingIndicator.classList.add('hidden');
});

commentInput.addEventListener('input', showTyping);
themeBtn.addEventListener('click', toggleTheme);

// === Initialisatie
if (localStorage.getItem('dark-mode') === 'true') {
	document.body.classList.add('dark-mode');
}
loadMessages();
