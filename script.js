let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
  const noteInput = document.getElementById('noteInput');
  const text = noteInput.value.trim();
  if (!text) return;

  notes.push({ text, favorite: false });
  noteInput.value = '';
  saveNotes();
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function toggleFavorite(index) {
  notes[index].favorite = !notes[index].favorite;
  saveNotes();
  renderNotes();
}

function editNote(index) {
  const newText = prompt("Edit your note:", notes[index].text);
  if (newText !== null) {
    notes[index].text = newText.trim();
    saveNotes();
    renderNotes();
  }
}

function searchNotes() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  renderNotes(query);
}

function renderNotes(search = "") {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';

  notes.forEach((note, index) => {
    if (!note.text.toLowerCase().includes(search)) return;

    const li = document.createElement('li');
    li.className = 'note';

    li.innerHTML = `
      <div class="note-text">${note.text}</div>
      <div class="actions">
        <button onclick="toggleFavorite(${index})">
          ${note.favorite ? '⭐' : '☆'}
        </button>
        <button onclick="editNote(${index})">✏️</button>
        <button onclick="deleteNote(${index})">🗑️</button>
      </div>
    `;

    if (note.favorite) li.classList.add('favorite');

    notesList.appendChild(li);
  });
}

renderNotes();
