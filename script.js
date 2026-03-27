let stats = { hunger: 100, boredom: 100, clean: 100, love: 100, sleep: 100 };
let currentPet = "";

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function selectPet(pet) {
  currentPet = pet;
  document.getElementById('petImage').src = `assets/cats/${pet}_idle.gif`;
  showScreen('game');
  updateBars();
}

function clamp(v) { return Math.max(0, Math.min(100, v)); }

function updateBars() {
  document.getElementById('hunger').style.width = stats.hunger + '%';
  document.getElementById('boredom').style.width = stats.boredom + '%';
  document.getElementById('clean').style.width = stats.clean + '%';
  document.getElementById('love').style.width = stats.love + '%';
  document.getElementById('sleep').style.width = stats.sleep + '%';

  document.getElementById('hungerValue').innerText = stats.hunger.toFixed(0) + '%';
  document.getElementById('boredomValue').innerText = stats.boredom.toFixed(0) + '%';
  document.getElementById('cleanValue').innerText = stats.clean.toFixed(0) + '%';
  document.getElementById('loveValue').innerText = stats.love.toFixed(0) + '%';
  document.getElementById('sleepValue').innerText = stats.sleep.toFixed(0) + '%';

  updateMood();
}

function play() {
  stats.hunger = clamp(stats.hunger - 5);
  stats.clean = clamp(stats.clean - 14);
  stats.sleep = clamp(stats.sleep - 2);
  stats.love = clamp(stats.love + 20);
  stats.boredom = clamp(stats.boredom + 20);
  updateBars();
  setEmotion('play');
}

function pet() {
  stats.love = clamp(stats.love + 25);
  stats.boredom = clamp(stats.boredom + 10);
  updateBars();
  setEmotion('happy');
}

function feed() {
  stats.hunger = clamp(stats.hunger + 20);
  stats.clean = clamp(stats.clean - 5)
  stats.love = clamp(stats.love + 10);
  stats.boredom = clamp(stats.boredom - 0.1);
  updateBars();
  setEmotion('eat');
}

function shower() {
  stats.clean = clamp(stats.clean + 50);
  stats.love = clamp(stats.love - 10)
  stats.boredom = clamp(stats.boredom - 0.5);
  updateBars();
  setEmotion('bath');
}

function sleepPet() {
  stats.sleep = clamp(stats.sleep + 40);
  stats.shower = clamp(stats.shower - 0.5)
  updateBars();
  setEmotion('sleep');
}

function updateMood() {
  let avg = (stats.hunger + stats.boredom + stats.clean + stats.love + stats.sleep) / 5;
  let mood = '😐';
  if (avg > 80) mood = '😄';
  else if (avg < 40) mood = '😢';
  document.getElementById('moodText').innerText = 'Mood: ' + mood;
}

function setEmotion(type) {
  if (!currentPet) return;
  const img = document.getElementById('petImage');
  img.src = `assets/cats/${currentPet}_${type}.gif`;
  setTimeout(() => { img.src = `assets/cats/${currentPet}_idle.gif`; }, 2000);
}

setInterval(() => {
  stats.hunger = clamp(stats.hunger - 10);
  stats.sleep = clamp(stats.sleep - 1);
  stats.boredom = clamp(stats.boredom - 10);
  stats.love = clamp (stats.love - 13)
  stats. 
  updateBars();
}, 2000);

function saveGame() { localStorage.setItem('petSave', JSON.stringify({ stats, currentPet })); }
function loadGame() {
  let data = JSON.parse(localStorage.getItem('petSave'));
  if (!data) return;
  stats = data.stats;
  currentPet = data.currentPet;
  document.getElementById('petImage').src = `assets/cats/${currentPet}_idle.gif`;
  showScreen('game');
  updateBars();

  const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
}
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');

muteBtn.addEventListener('click', () => {
  if (bgMusic.muted) {
    bgMusic.muted = false;
    muteBtn.textContent = '🔊 Mute';
  } else {
    bgMusic.muted = true;
    muteBtn.textContent = '🔇 Unmute';
  }
});
document.addEventListener('click', () => {
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.play().catch(e => console.log('Play blocked until user interacts', e));
}, { once: true });