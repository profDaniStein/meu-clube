// Seleciona o botão e o menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Adiciona o evento de clique ao botão
menuToggle.addEventListener('click', () => {
    // Alterna a classe 'show' no menu
    menu.classList.toggle('show');
});