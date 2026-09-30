const overlay = document.getElementById('overlay');
const sidebar = document.getElementById('sidebar');
const model = document.getElementById('modal');

const openSideBarBtn = document.getElementById('openSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');

const openModelBtn = document.getElementById('openModalBtn');
const closeModelBtn = document.getElementById('closeModalBtn');

function ToggleElement(element) {
    const isActive = element.classList.toggle('active');
    overlay.classList.toggle('active', isActive)
};

function closeAll() {
    sidebar.classList.remove('active');
    model.classList.remove('active');
    overlay.classList.remove('active');
}

// Event Listeners for Sidebar
openSideBarBtn.addEventListener('click', () => ToggleElement(sidebar));
closeSidebarBtn.addEventListener('click', closeAll);


openModelBtn.addEventListener('click', () => ToggleElement(model));
closeModelBtn.addEventListener('click', closeAll)

// Close on Overlay Click or Escape Key
overlay.addEventListener('click', closeAll);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
});