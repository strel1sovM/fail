const openModalBtn = document.querySelector('#openModal')
const openCardModal = document.querySelector('#openCardModal')
const closeModal = document.querySelectorAll('#closeModal');
const modal = document.getElementById('modal');
const main = document.querySelector('.main-content')
const taskList = document.querySelector('.task-list')
const cardForm = document.querySelector('form[name="addCard"]');
const taskForm = document.querySelector('form[name="addTask"]');

openModalBtn.onclick = () => {
    modal.classList.remove('hidden');
    taskForm.classList.remove('hidden');
    cardForm.classList.add('hidden');
}

openCardModal.onclick = () => {
    modal.classList.remove('hidden');
    taskForm.classList.add('hidden');
    cardForm.classList.remove('hidden');

}


closeModal.forEach((cm) => {
    cm.onclick = () => {
        modal.classList.add('hidden');
    }
})

reloadCard(todoCards);





cardForm.onsubmit = (e) => {
    e.preventDefault();

    const card = {
        id: Math.random(),
        title: '',
        tasks: []
    };

    const fm = new FormData(cardForm);
    fm.forEach((val, key) => {
        card[key] = val;
    });

    todoCards.push(card);

    reloadCard(todoCards); 

   
    setTimeout(() => {
        reloadCardTask(todoCards);
    }, 10);
};




taskForm.onsubmit = (e) => {
    e.preventDefault();

    const task = {
        id: Math.random(),
        title: '',
        date: '',
        isDone: false
    };

    const fm = new FormData(taskForm);
    fm.forEach((val, key) => {
        task[key] = val;
    });

    const selectedCategory = document.getElementById('task_type').value;

    if (!selectedCategory) {
        alert('Выберите категорию для задачи!');
        return;
    }

   
    const targetCard = todoCards.find(card => card.title === selectedCategory);

    if (targetCard) {
        targetCard.tasks.push(task);
    } else {
        alert('Категория не найдена!');
    }

    reloadCardTask(todoCards);
    reloadCard(todoCards);
};

