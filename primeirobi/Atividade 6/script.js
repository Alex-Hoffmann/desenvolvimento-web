// Seleciona elementos
const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const list  = document.getElementById('todo-list');

// Adiciona tarefa ao enviar o formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;

  // opcional: permite foco via teclado
  li.tabIndex = 0;

  list.appendChild(li);

  // limpa e volta o foco para digitar outra tarefa
  input.value = '';
  input.focus();
});

// --- REMOÇÃO COM DELEGAÇÃO DE EVENTOS ---
// Ouvimos o "click" na <ul>, não em cada <li>.
// Assim, mesmo itens criados dinamicamente serão capturados.
list.addEventListener('click', (e) => {
  if (e.target && e.target.tagName.toLowerCase() === 'li') {
    e.target.remove();
  }
});

// Acessibilidade extra: permitir remover com Enter/Backspace/Delete quando o <li> tiver foco
list.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (
    e.target &&
    e.target.tagName.toLowerCase() === 'li' &&
    (key === 'enter' || key === 'backspace' || key === 'delete')
  ) {
    e.preventDefault();
    e.target.remove();
  }
});
