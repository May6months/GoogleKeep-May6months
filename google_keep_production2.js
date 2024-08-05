

document.addEventListener('DOMContentLoaded', function () {

    const mainButton = document.getElementById('button2-1');
    const archiveButton = document.getElementById('button2-2');
    const contentArea = document.getElementById('content-area-2');

    const pages = {
        main: `
    <div class="main-page-2">
      <div class="to-do-list-block">
        <h3>Your Notes</h3>
        <input type="text" id="to-do-input" placeholder="Take a note">
        <button id="create-to-do-button">Pin</button>              
      </div>
    </div>
    <ul id="to-do-list">  </ul>
  `,

        archive: `
    <div class="archive-page-2">
      <h1 class="archive-title">Archive Page</h1>
      <ul id="archive-list">  </ul>
    </div>
  `,
    }

    let todosArray = [];
    let archivedTodosArray = [];

    function loadPage(page) {

        const removing = () => {
            const allArchiveButtons = document.querySelectorAll('.archive-wrapper')
            allArchiveButtons.forEach((note) => {
                note.addEventListener("click", (e) => {
                    const tar = e.target
                    if (tar.closest('.delete-from-archive')) {
                        note.remove()
                    }
                })
            })
        }
        //removing()

        contentArea.innerHTML = pages[page];
        if (page === 'main') {
            const toDoInput = document.getElementById('to-do-input');
            const createToDoButton = document.getElementById('create-to-do-button');
            const toDoList = document.getElementById('to-do-list');
            toDoList.innerHTML = '';

            todosArray.forEach((todo, index) => {
                // #2 
                const todoWrapper = document.createElement('div');
                todoWrapper.className = 'todoWrapper';

                const listItem = document.createElement('li');
                listItem.className = 'li-todo-item';
                listItem.textContent = todo.text;

                const archiveButton = document.createElement('button');
                archiveButton.innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">' +
                    '<path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"> </path>' +
                    '</svg>';
                archiveButton.className = 'archive-btn-2'
                todoWrapper.appendChild(listItem)
                todoWrapper.appendChild(archiveButton)
                toDoList.appendChild(todoWrapper)

                archiveButton.addEventListener('click', () => {
                    archivedTodosArray.push(todo); // let archivedTodosArray = [];
                    todosArray.splice(index, 1);
                    loadPage('main');
                    const archiveList = document.getElementById('archive-list');

                    const archivedListItem = document.createElement('li');
                    archivedListItem.textContent = todo.text;

                    const deleteBtn = document.createElement('button')
                    deleteBtn.textContent = 'delete btn'

                    archiveList.appendChild(archivedListItem);
                    archiveList.appendChild(deleteBtn)
                });
            });

            createToDoButton.addEventListener('click', () => {
                const toDoItem = toDoInput.value.trim();

                if (toDoItem) {
                    // #1
                    const todoWrapper = document.createElement('div');
                    todoWrapper.className = 'todoWrapper';

                    // CREATING <li> #-3
                    const listItem = document.createElement('li');
                    listItem.className = 'li-todo-item';
                    listItem.textContent = toDoItem;

                    const archiveButton = document.createElement('button');
                    archiveButton.innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">' +
                        '<path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"> </path>' +
                        '</svg>';
                    archiveButton.className = 'archive-button';
                    todoWrapper.appendChild(listItem)
                    todoWrapper.appendChild(archiveButton)
                    toDoList.appendChild(todoWrapper)
                    toDoInput.value = '';
                    todosArray.push({ text: toDoItem });

                    archiveButton.addEventListener('click', () => {
                        const todoIndex = todosArray.findIndex((todo) => todo.text === toDoItem);
                        if (todoIndex !== -1) {
                            archivedTodosArray.push(todosArray[todoIndex]);
                            todosArray.splice(todoIndex, 1);
                            loadPage('main');
                            const archiveList = document.getElementById('archive-list');

                            // ?
                            const todoWrapper = document.createElement('div');
                            todoWrapper.className = 'todoWrapper';

                            const archivedListItem = document.createElement('li');
                            archivedListItem.className = 'li-todo-item'
                            archivedListItem.textContent = toDoItem;

                            const archiveButton = document.createElement('button');
                            archiveButton.textContent = 'Archive';
                            archiveButton.className = 'archive-button';

                            todoWrapper.appendChild(archivedListItem);
                            todoWrapper.appendChild(archiveButton);
                            archiveList.appendChild(todoWrapper);
                        }
                    });
                }
            });

        } else if (page === 'archive') {
            const archiveList = document.getElementById('archive-list');

            archivedTodosArray.forEach((todo) => {
                // #3 'Archive' 
                const archiveWrapper = document.createElement('div')
                archiveWrapper.className = 'archive-wrapper'

                const listItem = document.createElement('li');
                listItem.textContent = todo.text;
                listItem.className = 'li-li';

                const deleteFromArchive = document.createElement('button')
                deleteFromArchive.className = 'delete-from-archive'
                deleteFromArchive.textContent = 'delete from archive'

                archiveWrapper.appendChild(listItem)
                archiveWrapper.appendChild(deleteFromArchive)
                archiveList.appendChild(archiveWrapper);
            });

            removing()
        }
    }

    mainButton.addEventListener('click', () => {
        loadPage('main');
    });

    archiveButton.addEventListener('click', () => {
     
        loadPage('archive');
        archivedTodosArray = [];
    });

    loadPage('main');

}); //'DOMContentLoaded'
