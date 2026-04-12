// ---------------- AUDIO ----------------
let bgAudio = document.getElementById("bgAudio");
let heartbeat = document.getElementById("heartbeat");
let scream = document.getElementById("scream");

let audioStarted = false;
let heartbeatStarted = false;

// start audio on first click (browser rule)
document.body.addEventListener("click", () => {
  if (!audioStarted) {
    bgAudio.volume = 0.4;
    bgAudio.play();
    audioStarted = true;
  }
});

// ---------------- CORE ----------------
let battery = 100;
let shutdownStarted = false;
let chaosIntervals = [];

let wifi = document.getElementById("wifi");
let batteryEl = document.getElementById("battery");
let radio = document.getElementById("radio");
let log = document.getElementById("log");

function addLog(text) {
  let p = document.createElement("p");
  p.innerText = "> " + text;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

let messages = [
  "signal degrading...",
  "packet loss detected",
  "who is still connected?",
  "system integrity failing",
  "ERROR: transmission unstable",
  "…this is the last broadcast",
  "are you receiving this?",
  "connection lost. reconnecting...",
  "no response.",
  "we are not alone here.",
  "bro stop clicking things",
  "this is why we can't have nice systems",
  "who gave you access??"
];

// ---------------- BATTERY ----------------
setInterval(() => {

  if (battery > 5) {
    battery -= Math.random() * 5;
  } else if (battery > 1) {
    battery -= 0.5;
  } else {
    battery = 0;
  }

  if (battery <= 2 && battery > 1) {
    battery = 1;
  }

  if (battery < 0) battery = 0;

  batteryEl.innerText = Math.floor(battery) + "%";

  if (battery <= 50) wifi.innerText = "WEAK";

  // ❤️ HEARTBEAT TRIGGER
  if (battery <= 20 && !heartbeatStarted) {
    heartbeatStarted = true;

    heartbeat.volume = 0.7;
    heartbeat.play();

    addLog("...heartbeat detected...");
  }

  if (battery <= 20) {
    document.body.style.color = "red";
    addLog("CRITICAL FAILURE DETECTED");
  }

  if (battery <= 5) {
    addLog("THIS IS THE FINAL SIGNAL.");
  }

  // 🔥 SHUTDOWN
  if (battery === 1 && !shutdownStarted) {
    shutdownStarted = true;

    addLog("...no power remaining");
    addLog("goodbye.");

    setTimeout(() => {
      startShutdownSequence();
    }, 2000);
  }

}, 1500);

// ---------------- RANDOM LOGS ----------------
chaosIntervals.push(setInterval(() => {
  let msg = messages[Math.floor(Math.random() * messages.length)];
  addLog(msg);
}, 3000));

// ---------------- STORY ----------------
setTimeout(() => addLog("wait..."), 4000);
setTimeout(() => addLog("you’re still here?"), 7000);
setTimeout(() => addLog("that’s not supposed to happen."), 10000);
setTimeout(() => addLog("this interface is not for you."), 13000);
setTimeout(() => addLog("…why are you watching me?"), 16000);

setTimeout(() => {
  document.body.style.cursor = "crosshair";
}, 8000);

setTimeout(() => addLog("tracking user..."), 12000);
setTimeout(() => addLog("location: ???"), 14000);
setTimeout(() => addLog("identity: unresolved"), 16000);

// ---------------- CHAOS ----------------
function startChaos() {

  chaosIntervals.push(setInterval(() => {
    document.body.style.transform =
      `translate(${Math.random()*3}px, ${Math.random()*3}px)`;
  }, 120));

  chaosIntervals.push(setInterval(() => {
    if (Math.random() > 0.8) {
      document.body.style.background = "darkred";
      setTimeout(() => {
        document.body.style.background = "black";
      }, 150);
    }
  }, 2000));

  chaosIntervals.push(setInterval(() => {
    let title = document.querySelector("h1");
    if (!title) return;

    title.innerText = Math.random() > 0.7
      ? "L∆ST S!GN∆L"
      : "LAST SIGNAL";
  }, 400));

  chaosIntervals.push(setInterval(() => {
    if (Math.random() > 0.85) {
      addLog("⍰#@! SIGNAL CORRUPTION ⍰#@!");
    }
  }, 2500));
}

// ---------------- BUTTON ----------------
document.getElementById("dontClick").onclick = () => {

  startChaos();

  document.body.innerHTML = `
    <h1>WHY WOULD YOU DO THAT?</h1>
    <p>you just killed the last signal.</p>
    <p>hope you're happy.</p>
    <p>now you're stuck here with me.</p>

    <button onclick="escape()">TRY TO ESCAPE</button>
  `;

  window.escape = () => {
    document.body.innerHTML = `
      <h1>THERE IS NO ESCAPE.</h1>
      <p>only one connection remains.</p>

      <a href="https://instagram.com/_ira.1106" target="_blank">
        >> FINAL CONTACT <<
      </a>
    `;
  };
};

// ---------------- EASTER EGG ----------------
let clickCount = 0;

document.body.addEventListener("click", () => {
  clickCount++;

  if (clickCount === 30) {
    document.body.innerHTML = `
      <h1>YOU FOUND IT.</h1>
      <p>there was never a system.</p>
      <p>it was just you.</p>

      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        >> FINAL SIGNAL <<
      </a>
    `;
  }
});

// ---------------- SHUTDOWN ----------------
function startShutdownSequence() {

  addLog("CRITICAL POWER FAILURE");
  addLog("initiating emergency protocol...");

  let panic = setInterval(() => {
    addLog([
      "NO NO NO NO",
      "STAY WITH ME",
      "signal collapsing",
      "re-routing power...",
      "ERROR ERROR ERROR",
      "don't leave",
      "who will receive the signal?"
    ][Math.floor(Math.random() * 7)]);
  }, 500);

  let flicker = setInterval(() => {
    document.body.style.opacity = Math.random() > 0.5 ? "0.2" : "1";
  }, 100);

  setTimeout(() => {
    typeFinalMessage("...please...", () => {

      setTimeout(() => {
        typeFinalMessage("...don't go...", () => {

          clearInterval(panic);
          clearInterval(flicker);

          finalBlackout();

        });
      }, 1000);

    });
  }, 2000);
}

// ---------------- TYPING ----------------
function typeFinalMessage(text, callback) {
  let i = 0;
  let p = document.createElement("p");
  log.appendChild(p);

  let typing = setInterval(() => {
    p.innerText += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      if (callback) callback();
    }
  }, 100);
}

// ---------------- FINAL BLACKOUT ----------------
function finalBlackout() {

  // STOP ALL AUDIO
  bgAudio.pause();
  heartbeat.pause();

  // 😱 SCREAM
  scream.volume = 1;
  scream.play();

  document.body.innerHTML = "";

  let overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "black";
  overlay.style.opacity = "0";

  document.body.appendChild(overlay);

  let fade = 0;

  let fadeOut = setInterval(() => {
    fade += 0.03;
    overlay.style.opacity = fade;

    if (fade >= 1) {
      clearInterval(fadeOut);

      setTimeout(() => {
        overlay.innerHTML = `
          <h1 style="color:red; text-align:center; margin-top:40vh;">
            SIGNAL LOST.
          </h1>
        `;
      }, 1000);
    }
  }, 50);
}