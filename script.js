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
            <ul class="mt-4 space-y-2 text-gray-700 overflow-y-auto max-h-96 pr-2">
                <li><strong>-</strong> TRT-2.</li>
                <li><strong>1.</strong> SÃO PAULO</li>
                <li><strong>2.</strong> ARUJA</li>
                <li><strong>3.</strong> BARUERI</li>
                <li><strong>4.</strong> BERTIOGA</li>
                <li><strong>5.</strong> BIRITIBA-MIRIM</li>
                <li><strong>6.</strong> CAIEIRAS</li>
                <li><strong>7.</strong> CAJAMAR</li>
                <li><strong>8.</strong> CARAPICUIBA</li>
                <li><strong>9.</strong> COTIA</li>
                <li><strong>10.</strong> CUBATÃO</li>
                <li><strong>11.</strong> DIADEMA</li>
                <li><strong>12.</strong> EMBU DAS ARTES</li>
                <li><strong>13.</strong> EMBU-GUAÇU</li>
                <li><strong>14.</strong> FERRAZ DE VASCONCELOS</li>
                <li><strong>15.</strong> FRANCISCO MORATO</li>
                <li><strong>16.</strong> FRANCO DA ROCHA</li>
                <li><strong>17.</strong> GUARAREMA</li>
                <li><strong>18.</strong> GUARUJA</li>
                <li><strong>19.</strong> GUARULHOS</li>
                <li><strong>20.</strong> IBIUNA</li>
                <li><strong>21.</strong> ITAPECERICA DA SERRA</li>
                <li><strong>22.</strong> ITAPEVI</li>
                <li><strong>23.</strong> ITAQUAQUECETUBA</li>
                <li><strong>24.</strong> JANDIRA</li>
                <li><strong>25.</strong> JUQUITIBA</li>
                <li><strong>26.</strong> MARIPORÃ</li>
                <li><strong>27.</strong> OSASCO</li>
                <li><strong>28.</strong> PIRAPORA DO BOM JESUS</li>
                <li><strong>29.</strong> POA</li>
                <li><strong>30.</strong> SANTA ISABEL</li>
                <li><strong>31.</strong> SANTANA DE PARNAÍBA</li>
                <li><strong>32.</strong> SANTO ANDRÉ</li>
                <li><strong>33.</strong> SANTOS</li>
                <li><strong>34.</strong> SÃO BERNARDO DO CAMPO</li>
                <li><strong>35.</strong> SÃO CAETANO DO SUL</li>
                <li><strong>36.</strong> SÃO LOURENÇO DA SERRA</li>
                <li><strong>37.</strong> SÃO VICENTE</li>
                <li><strong>38.</strong> VARGEM GRANDE PAULISTA</li>
                <li><strong>39.</strong> Cidades não listadas acima se referem ao TRT-15 (informações exclusivas ao Estado de São Paulo).</li>
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

    // Abrir o modal ao clicar nos botões de lupa
    const buttons = document.querySelectorAll(".fa-magnifying-glass");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            modal.classList.remove("hidden");
        });
    });

    // Fechar o modal ao clicar no botão fechar
    modal.querySelector("#close-modal").addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Fechar o modal ao clicar fora da área do conteúdo
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    });
});
