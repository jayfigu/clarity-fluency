// Random Topics
const topics = [
  "Is boredom necessary for creativity?",
  "Should failure be celebrated?",
  "What makes someone charismatic?",
  "How would you redesign school?",
  "Is discipline more important than motivation?",
  "Explain confidence in 60 seconds.",
  "Argue for remote work.",
  "Why do habits fail?"
];

const topicBtn = document.getElementById("topicBtn");
const topicDisplay = document.getElementById("topicDisplay");

topicBtn.onclick = () => {
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  topicDisplay.textContent = randomTopic;
};

// Timer
const startTimer = document.getElementById("startTimer");
const timerDisplay = document.getElementById("timer");

let countdown;

startTimer.onclick = () => {
  let timeLeft = 60;
  timerDisplay.textContent = timeLeft;

  clearInterval(countdown);

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert("Time's up. Start recording!");
    }
  }, 1000);
};

// Audio Recording
let mediaRecorder;
let audioChunks = [];

const recordBtn = document.getElementById("recordBtn");
const audioPlayback = document.getElementById("audioPlayback");

recordBtn.onclick = async () => {
  if (recordBtn.textContent === "Start Recording") {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    recordBtn.textContent = "Stop Recording";

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      audioChunks = [];
      const audioURL = URL.createObjectURL(audioBlob);
      audioPlayback.src = audioURL;
    };

  } else {
    mediaRecorder.stop();
    recordBtn.textContent = "Start Recording";
  }
};
