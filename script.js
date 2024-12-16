const popularDorks = [
    "inurl:/admin.php",
    "intitle:\"index of\"",
    "intext:\"password\"",
    "filetype:pdf",
    "inurl:\"wp-content\"",
    "intitle:\"Index of /backup\"",
    "inurl:\"/phpinfo.php\"",
    "ext:sql intext:\"password\" \"username\"",
    "intitle:\"Index of /\" \"Parent Directory\"",
    "inurl:\"/admin/login.php\"",
    "intext:\"powered by WordPress\"",
    "inurl:\"/config.php\"",
    "intitle:\"Index of /admin\"",
    "inurl:\"/install.php\"",
    "intext:\"error in your SQL syntax\"",
    "inurl:\"/login.php\"",
    "inurl:\"/wp-admin/\"",
    "intitle:\"Index of /password\"",
    "inurl:\"/_next/static\"",
    "inurl:\"/admin/\"",
    "intext:\"Index of /config\"",
    "intext:\"root:x:0:0:\"",
    "filetype:env intext:DB_PASSWORD",
    "intitle:\"index of /\" inurl:backup",
    "inurl:\"/web.config\"",
    "inurl:\"/wp-login.php\"",
    "inurl:\"/.env\"",
    "intext:\"Index of /.git\"",
    "inurl:\"/.git/config\"",
    "intitle:\"Index of /\" \"database.yml\"",
];

const dorkSelect = document.getElementById('dorkSelect');
const searchInput = document.getElementById('searchInput');
const engineSelect = document.getElementById('engineSelect');
const searchButton = document.getElementById('searchButton');
const addDorkButton = document.getElementById('addDorkButton');
const editDorkSection = document.getElementById('editDorkSection');
const newDorkInput = document.getElementById('newDorkInput');
const saveDorkButton = document.getElementById('saveDorkButton');
const cancelDorkButton = document.getElementById('cancelDorkButton');
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
const dots = [];
const dorkList = document.getElementById('dorkList')


function loadDorks() {
  let customDorks = JSON.parse(localStorage.getItem('customDorks')) || [];
    let allDorks = [...popularDorks, ...customDorks];

    dorkSelect.innerHTML = '';
    allDorks.forEach(dork => {
        const option = document.createElement('option');
        option.value = dork;
        option.text = dork;
        dorkSelect.add(option);
    });

  renderDorkList()
}

function search() {
    const target = searchInput.value;
    const selectedDork = dorkSelect.value;
    const engineURL = engineSelect.value;
    const fullQuery = `site:${target} ${selectedDork}`;
    window.open(engineURL + encodeURIComponent(fullQuery));
}

function toggleEditDorkSection() {
    editDorkSection.classList.toggle('hidden');
    newDorkInput.value = ''; // Clear input field when toggling
  renderDorkList()
}

function saveDork() {
  const newDork = newDorkInput.value.trim();
  if (newDork) {
    let customDorks = JSON.parse(localStorage.getItem('customDorks')) || [];
    customDorks.push(newDork);
    localStorage.setItem('customDorks', JSON.stringify(customDorks));
      loadDorks();
    toggleEditDorkSection();
  }
}

function cancelDork() {
  toggleEditDorkSection();
}

function renderDorkList() {
  const customDorks = JSON.parse(localStorage.getItem('customDorks')) || [];
  dorkList.innerHTML = "";

  customDorks.forEach((dork, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('dork-list-item')

    const dorkText = document.createElement('span');
    dorkText.classList.add('dork-text')
      dorkText.textContent = dork;
      listItem.appendChild(dorkText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteDork(index));
    listItem.appendChild(deleteButton);

    dorkList.appendChild(listItem);
  })
}

function deleteDork(index) {
  let customDorks = JSON.parse(localStorage.getItem('customDorks')) || [];
  customDorks.splice(index, 1);
  localStorage.setItem('customDorks', JSON.stringify(customDorks));
    loadDorks()
    renderDorkList()
}


// Event Listeners
searchButton.addEventListener('click', search);
addDorkButton.addEventListener('click', toggleEditDorkSection);
saveDorkButton.addEventListener('click', saveDork);
cancelDorkButton.addEventListener('click', cancelDork);
dorkSelect.addEventListener('change', () => {
    searchInput.value = '';
});

// Initialize
loadDorks();

// ----- Background Dots -----

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createDot() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    color: Math.random() > 0.5 ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 255, 0.7)'
  }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
      ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
        dot.x += dot.speedX;
        dot.y += dot.speedY;

      if (dot.x + dot.radius < 0 || dot.x - dot.radius > canvas.width) {
        dot.x = Math.random() * canvas.width;
      }
      if (dot.y + dot.radius < 0 || dot.y - dot.radius > canvas.height) {
        dot.y = Math.random() * canvas.height;
      }
    });
    requestAnimationFrame(draw);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for(let i = 0; i < 100; i++){
  dots.push(createDot())
}
draw()