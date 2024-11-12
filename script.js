document.addEventListener('DOMContentLoaded', function () {
    // Modal de Boas-Vindas
    const welcomeModal = document.getElementById('welcome-modal');
    const closeWelcomeBtn = welcomeModal.querySelector('.close');

    // Mostrar o modal de boas-vindas após o carregamento da página
    window.onload = function () {
        welcomeModal.classList.add('show');
    };

    // Fechar o modal de boas-vindas
    closeWelcomeBtn.onclick = function () {
        welcomeModal.classList.remove('show');
    };

    // Fechar o modal de boas-vindas se clicar fora da caixa de conteúdo
    window.onclick = function (event) {
        if (event.target === welcomeModal) {
            welcomeModal.classList.remove('show');
        }
    };

    // Modal de Ajuda
    const helpModal = document.getElementById('help-modal');
    const helpButton = document.getElementById('help-button');
    const closeHelpBtn = helpModal.querySelector('.close');

    // Mostrar o modal de ajuda
    helpButton.onclick = function () {
        helpModal.classList.add('show');
    };

    // Fechar o modal de ajuda
    closeHelpBtn.onclick = function () {
        helpModal.classList.remove('show');
    };

    // Fechar o modal de ajuda se clicar fora da caixa de conteúdo
    window.onclick = function (event) {
        if (event.target === helpModal) {
            helpModal.classList.remove('show');
        }
    };

    // Seleciona todos os cards com dropdown-content
    const cards = document.querySelectorAll('.card');

    // Adiciona o evento de click em cada card para abrir/fechar o dropdown
    cards.forEach(card => {
        card.addEventListener('click', function (event) {
            // Impede o clique no card de se propagar para o documento
            event.stopPropagation();

            const dropdownContent = this.querySelector('.dropdown-content');
            const isVisible = dropdownContent.style.display === 'block';

            // Fecha todos os dropdowns abertos
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.style.display = 'none';
            });

            // Abre o dropdown do card clicado, se não estiver visível
            if (!isVisible) {
                dropdownContent.style.display = 'block';
                setTimeout(() => {
                    dropdownContent.style.opacity = '1'; // Transição suave de opacidade
                    dropdownContent.style.transform = 'translateY(0)'; // Transição suave de posição
                }, 10); // Pequeno atraso para permitir a animação
            }
        });
    });

    // Fecha o dropdown se clicar fora do card
    document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.style.opacity = '0'; // Transição suave de opacidade
            dropdown.style.transform = 'translateY(-10px)'; // Transição suave de posição
            setTimeout(() => {
                dropdown.style.display = 'none'; // Oculta o dropdown
            }, 300); // Tempo correspondente à duração da animação
        });
    });

    // Pesquisa
    const searchInput = document.getElementById('search');
    const cardsContainer = document.getElementById('cards-container');

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        cards.forEach(card => {
            const state = card.getAttribute('data-state').toLowerCase();

            if (state.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        function openModal(text) {
            document.getElementById('modal-text').innerText = text;
            document.getElementById('explanation-modal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('explanation-modal').style.display = 'none';
        }

        // Fechar o modal se clicar fora da caixa de conteúdo
        window.onclick = function(event) {
            const modal = document.getElementById('explanation-modal');
            if (event.target === modal) {
                closeModal();
            }
        }
    });
});
// Função para abrir o modal
function openModal(text) {
    const modal = document.getElementById('explanation-modal');
    const modalText = document.getElementById('modal-text');
    modalText.innerText = text; // Define o texto do modal
    modal.classList.add('show'); // Adiciona a classe 'show' para exibir o modal
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.opacity = '1'; // Torna o conteúdo visível após a animação
    }, 10); // Atraso para garantir que a animação funcione
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('explanation-modal');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.opacity = '0'; // Animação de saída
    setTimeout(() => {
        modal.classList.remove('show'); // Remove a classe 'show' após a animação
    }, 500); // Aguarda a duração da animação antes de esconder
}

// Fechar o modal se clicar fora da caixa de conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('explanation-modal');
    if (event.target === modal) {
        closeModal();
    }
}

