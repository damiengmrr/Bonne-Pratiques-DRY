const tasks = [
    { id: 1, title: 'Mettre à jour le README', completed: false },
    { id: 2, title: 'Corriger le bug du formulaire', completed: true },
    { id: 3, title: 'Revoir les PRs en attente', completed: false },
    { id: 4, title: 'Nettoyer le CSS', completed: true }
  ];
  
  const tasksListEl = document.querySelector('#tasks-list');
  const emptyStateEl = document.querySelector('#empty-state');
  
  const filterAllBtn = document.querySelector('#filter-all-btn');
  const filterActiveBtn = document.querySelector('#filter-active-btn');
  const filterCompletedBtn = document.querySelector('#filter-completed-btn');
  
  let currentFilter = 'all';
  
  function getFilteredTasks() {
    if (currentFilter === 'active') {
      return tasks.filter(task => !task.completed);
    }
  
    if (currentFilter === 'completed') {
      return tasks.filter(task => task.completed);
    }
  
    return tasks;
  }
  
  function getEmptyMessage() {
    if (currentFilter === 'active') {
      return 'Aucune tâche en cours.';
    }
    if (currentFilter === 'completed') {
      return 'Aucune tâche terminée.';
    }
    return 'Aucune tâche à afficher.';
  }
  
  function renderTasks() {
    const filteredTasks = getFilteredTasks();
  
    // vider la liste
    tasksListEl.innerHTML = '';
  
    // gérer l'état vide
    if (filteredTasks.length === 0) {
      emptyStateEl.textContent = getEmptyMessage();
      emptyStateEl.style.display = 'block';
      return;
    }
  
    emptyStateEl.style.display = 'none';
  
    // afficher les tâches
    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';
      if (task.completed) {
        li.classList.add('task-completed');
      }
      li.textContent = task.title;
      tasksListEl.appendChild(li);
    });
  }
  
  // gestion des clics sur les filtres
  filterAllBtn.addEventListener('click', () => {
    currentFilter = 'all';
    renderTasks();
  });
  
  filterActiveBtn.addEventListener('click', () => {
    currentFilter = 'active';
    renderTasks();
  });
  
  filterCompletedBtn.addEventListener('click', () => {
    currentFilter = 'completed';
    renderTasks();
  });
  
  // affichage initial
  renderTasks();