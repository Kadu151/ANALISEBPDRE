document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const cards = document.querySelectorAll(".grid > div");

    // Criação do modal
    const modal = document.createElement("div");
    modal.id = "help-modal";
    modal.classList.add(
        "fixed", "inset-0", "bg-gray-800", "bg-opacity-75", 
        "flex", "items-center", "justify-center", "hidden"
    );

    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
            <button id="close-modal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            <h2 class="text-2xl font-bold mb-4">Ajuda</h2>
            <p class="text-gray-700">Este é o modal de ajuda. Aqui você pode encontrar informações sobre como utilizar os links e funcionalidades desta seção.</p>
            <ul class="mt-4 space-y-2 text-gray-700">
                <li><strong>1.</strong> Clique no nome do tribunal ou certidão para abrir a página diretamente.</li>
                <li><strong>2.</strong> Use a barra de pesquisa para localizar rapidamente o tribunal ou certidão desejada.</li>
                <li><strong>3.</strong> Caso precise de suporte adicional, entre em contato com a equipe responsável.</li>
            </ul>
        </div>
    `;

    document.body.appendChild(modal);

    // Função para filtrar os cards com base no texto da barra de pesquisa
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase().trim();

        cards.forEach(card => {
            const cardTitle = card.querySelector("h2").textContent.toLowerCase();
            const links = Array.from(card.querySelectorAll("a"))
                .map(link => link.textContent.toLowerCase());

            const matches = cardTitle.includes(query) || links.some(link => link.includes(query));

            card.style.display = matches ? "" : "none";
        });
    });

    // Adiciona funcionalidade ao botão de lupa para exibir o modal
    const buttons = document.querySelectorAll(".fa-magnifying-glass");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            modal.classList.remove("hidden");
        });
    });

    // Fechar o modal
    document.getElementById("close-modal").addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Fechar o modal clicando fora dele
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    });
});
