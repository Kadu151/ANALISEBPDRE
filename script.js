document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const cards = document.querySelectorAll(".grid > div");

    // Criação do modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Ajuda</h2>
            <p id="modal-text">Este é o modal de ajuda. Aqui você pode encontrar informações sobre como utilizar os links e funcionalidades desta seção.</p>
            <ul>
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
                <li><strong>39.</strong> Cidades não listadas acima se referem ao TRT-15 (informações exclusivas ao Estado de SP).</li>
            </ul>
        </div>
    `;

    document.body.appendChild(modal);

    // Função de filtro de cards
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

    // Botões de lupa que abrem o modal
    const buttons = document.querySelectorAll(".fa-magnifying-glass");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            modal.classList.add("show");
        });
    });

    // Fechar modal clicando no botão X
    modal.querySelector(".close").addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Fechar modal clicando fora do conteúdo
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});
