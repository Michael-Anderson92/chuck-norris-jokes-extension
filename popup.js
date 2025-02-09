function updateJoke(joke) {
  document.getElementById('joke').textContent = joke;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateJoke') {
    updateJoke(message.joke);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('joke', (data) => {
    if (data.joke) {
      updateJoke(data.joke);
    } else {
      updateJoke('No joke available. Please wait for the next joke!');
    }
  });

  // Add click event listener to close the popup
  document.body.addEventListener('click', () => {
    window.close();
  });
});
