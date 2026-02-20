const btn = document.querySelector('.btn');
const input = document.querySelector('.field input');

btn.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/code');
    const data = await res.json();
    input.value = data.code; // Remplit le champ avec le code MANZMODS
    alert(`⚡ CODE · ${data.code}`);
  } catch(err) {
    alert('Erreur : impossible de récupérer le code');
    console.error(err);
  }
});

btn.addEventListener('mousedown', () => { btn.style.transition = '0.03s'; });
btn.addEventListener('mouseup', () => { btn.style.transition = '0.1s'; });
