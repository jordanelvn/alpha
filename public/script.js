const output = document.getElementById('output');
const input = document.getElementById('userInput');
const button = document.getElementById('submitBtn');

async function sendToAlpha(message) {
  try {
    const response = await fetch('https://alpha-intelligence.onrender.com/api/alpha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (data.answer) {
      output.innerHTML += `<div class="response">ALPHA: ${data.answer}</div>`;
    } else {
      output.innerHTML += `<div class="response error">ALPHA: Something went wrong...</div>`;
    }

    output.scrollTop = output.scrollHeight;
  } catch (err) {
    console.error('Fetch error:', err);
    output.innerHTML += `<div class="response error">ALPHA: Cannot reach the core right now.</div>`;
  }
}

button.addEventListener('click', () => {
  const query = input.value.trim();
  if (query) {
    output.innerHTML += `<div class="query">You: ${query}</div>`;
    sendToAlpha(query);
    input.value = '';
  }
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    button.click();
  }
});
