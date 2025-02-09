// Set up alarm when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed, setting up alarm...");
  // Create an alarm that triggers every hour
  chrome.alarms.create('fetchJoke', {
    periodInMinutes: 1
  });
  // Fetch a joke immediately when extension is installed
  fetchAndShowJoke();
});

// Function to fetch and display joke
async function fetchAndShowJoke() {
  try {
    console.log("Fetching joke...");
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    
    console.log("Joke fetched:", data.value);
    await chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'Chuck Norris Joke',
      message: data.value
    });
  } catch (error) {
    console.error('Error fetching joke:', error);
  }
}


// Listen for alarm and fetch joke when it triggers
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchJoke') {
    console.log("Alarm triggered, fetching joke...");
    fetchAndShowJoke();
  }
});

// Manually trigger the alarm for testing
chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started, triggering alarm for testing...");
  fetchAndShowJoke();
});