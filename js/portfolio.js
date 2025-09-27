function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.portfolio-item.hidden');
    const button = document.querySelector('.show-more-btn');
    
    if (hiddenProjects.length > 0 && hiddenProjects[0].style.display === 'none' || hiddenProjects[0].style.display === '') {
        hiddenProjects.forEach(project => {
            project.style.display = 'block';
        });
        button.textContent = 'Less';
    } else {
        hiddenProjects.forEach(project => {
            project.style.display = 'none';
        });
        button.textContent = 'More';
    }
}