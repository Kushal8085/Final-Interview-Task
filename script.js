(function () {
  console.log(
    "%c[ZENITHRA SECURE TERMINAL] INITIALIZING...",
    "color: #555; font-family: monospace;",
  );

  setTimeout(() => {
    console.info(
      "%c🕵️‍♂️ Inspecting the DOM? Nice try. The data is rendered at the pixel level. Master the CSS to reveal the terminal.",
      "color: #00ff41; font-weight: bold; font-size: 14px; background: black; padding: 5px; border: 1px solid #00ff41;",
    );
  }, 1000);

  // // Base64 encoded: "https://api.yourcompany.com/v1/interview/start"
  // const _0x1a = [
  //   "aHR0cHM6Ly",
  //   "9hcGkueW91",
  //   "cmNvbXBhbn",
  //   "kuY29tL3Yx",
  //   "L2ludGVydm",
  //   "lldy9zdGFy",
  //   "dA==",
  // ];

  // Base64 encoded: "https://onboarding.zenithratech.com/v1/interview/start"
  const _0x1a = [
    "aHR0cHM6Ly",
    "9vbmJvYXJk",
    "aW5nLnplbm",
    "l0aHJhdGVj",
    "aC5jb20vdj",
    "EvaW50ZXJ2",
    "aWV3L3N0YX",
    "J0"
  ];

  const targetPath = atob(_0x1a.join(""));

  document.addEventListener("DOMContentLoaded", () => {
    // Create a CANVAS element instead of a DIV
    const canvas = document.createElement("canvas");
    canvas.id = "quest-init";
    canvas.width = 600;
    canvas.height = 120;

    // Get the 2D drawing context
    const ctx = canvas.getContext("2d");

    // Paint the background of the canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Paint the border
    ctx.strokeStyle = "#00ff41";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

    // Paint the Secret Text as PIXELS
    ctx.fillStyle = "#00ff41";
    ctx.font = "bold 18px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("TARGET ACQUIRED:", canvas.width / 2, 40);

    ctx.font = "16px Courier New";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(targetPath, canvas.width / 2, 70);

    ctx.font = "12px Courier New";
    ctx.fillStyle = "#00ff41";
    ctx.fillText("[INITIATE POSTMAN PROTOCOL]", canvas.width / 2, 100);

    // Append the canvas to the body
    document.body.appendChild(canvas);
  });
})();

// =======================================
// TERMINAL → DASHBOARD TRANSITION
// =======================================

setTimeout(() => {

  document.getElementById("terminal").style.display = "none";

  const dashboard = document.getElementById("dashboard");
  dashboard.style.display = "flex";

}, 4000);


let cameraStream = null;

const startBtn = document.getElementById("startCamera");
const stopBtn = document.getElementById("stopCamera");
const video = document.getElementById("videoFeed");
const status = document.getElementById("cameraStatus");

// START CAMERA
startBtn.onclick = async () => {
  try {

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    video.srcObject = cameraStream;
    status.textContent = "● Camera Active";
    status.classList.add("active");
    status.classList.remove("error");
    startBtn.style.display = "none";
    stopBtn.style.display = "inline-block";

  } catch (err) {

    status.textContent = "⚠ Camera permission denied";
    status.classList.remove("active");
    status.classList.add("error");

  }
};

// STOP CAMERA
stopBtn.onclick = () => {

  if (cameraStream) {

    cameraStream.getTracks().forEach(track => track.stop());

    video.srcObject = null;
    cameraStream = null;

  }

  status.textContent = "● Camera Off";
  status.classList.remove("active");

  stopBtn.style.display = "none";
  startBtn.style.display = "inline-block";

};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;


let recognition = null;
let isListening = false;
const startVoiceBtn = document.getElementById("startVoice");
const stopVoiceBtn = document.getElementById("stopVoice");
const clearVoiceBtn = document.getElementById("clearVoice");

const voiceText = document.getElementById("voiceText");
const voiceStatus = document.getElementById("voiceStatus");

if (SpeechRecognition) {

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  // let isListening = false;
  // START LISTENING
  startVoiceBtn.onclick = () => {

    if (isListening) return; // prevent multiple starts

    try {
      console.log(isListening)
      recognition.start();
      isListening = true;

      voiceStatus.textContent = "● Listening...";
      voiceStatus.classList.add("active");
      voiceStatus.classList.remove("error");

      startVoiceBtn.style.display = "none";
      stopVoiceBtn.style.display = "inline-block";

    } catch (error) {
      console.log(error);
    }
  };

  // STOP LISTENING
  stopVoiceBtn.onclick = () => {

    if (!isListening) return;

    recognition.stop();
    isListening = false;

    voiceStatus.textContent = "● Microphone Idle";
    voiceStatus.classList.remove("active");

    stopVoiceBtn.style.display = "none";
    startVoiceBtn.style.display = "inline-block";
  };

  // SPEECH RESULT
  recognition.onresult = (event) => {

    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    voiceText.textContent = transcript;
  };

  // ERROR HANDLING (permission denied etc.)
  recognition.onerror = (event) => {

    // isListening = false;

    if (event.error === "not-allowed") {

      voiceStatus.textContent = "⚠ Microphone permission denied";
      voiceStatus.classList.add("error");

    }

    stopVoiceBtn.style.display = "none";
    startVoiceBtn.style.display = "inline-block";

  };

  recognition.onend = () => {

    isListening = false;

    stopVoiceBtn.style.display = "none";
    startVoiceBtn.style.display = "inline-block";

    if (!voiceStatus.classList.contains("error")) {
      voiceStatus.textContent = "● Microphone Idle";
    }

  };

}

clearVoiceBtn.onclick = () => {

  let text = voiceText.textContent;

  const interval = setInterval(() => {

    text = text.slice(0, -1);
    voiceText.textContent = text;
    console.log(text)
    console.log(text.length)
    if (text.length === 0) {
      voiceText.textContent = "Waiting for speech...";
      clearInterval(interval);
    }

  }, 20);

};

document.getElementById("scanBluetooth").onclick = async () => {

  try {

    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    });

    document.getElementById("btResult").textContent =
      `Connected: ${device.name || device.id}`;

  } catch (error) {

    document.getElementById("btResult").textContent =
      "No device selected";

  }

};