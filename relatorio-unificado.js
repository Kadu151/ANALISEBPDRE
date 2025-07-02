document.getElementById('btn-exportar').addEventListener('click', async () => {
  const comentarioDiv = document.getElementById('comentarioAnaliseTexto');
  const comentarioTexto = comentarioDiv ? comentarioDiv.textContent.trim() : '';

  if (!comentarioTexto) {
    alert('O campo de comentário é obrigatório para exportar o PDF.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const paginas = ['pagina1', 'pagina2', 'pagina3'];

  for (let i = 0; i < paginas.length; i++) {
    const pagina = document.getElementById(paginas[i]);
    if (!pagina) continue;

    const canvas = await html2canvas(pagina, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Adiciona nova página só se não for a última
    if (i < paginas.length - 1) pdf.addPage();
  }

  // Comentário final
  pdf.addPage();
  pdf.setFontSize(14);
  pdf.text("Comentário Interno da Análise:", 10, 20);
  pdf.setFontSize(12);
  const lines = pdf.splitTextToSize(comentarioTexto, 180);
  pdf.text(lines, 10, 30);

  pdf.save('Relatorio-Financeiro.pdf');
});


document.addEventListener('DOMContentLoaded', () => {
  // Dados do Usuário
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};
  const usuarioNome = usuarioLogado.nome || 'Não informado';

  // Dados do Cliente
  const cliente = JSON.parse(localStorage.getItem('cliente')) || {};
  const clienteNome = cliente.nomeCliente || 'Não informado';
  const clienteGrupoCota = cliente.grupoCota || 'Não informado';
  const clienteRamo = cliente.ramo || 'Não informado';

  // Preenchendo os campos da página
  document.getElementById('usuarioNome').textContent = usuarioNome;
  document.getElementById('clienteNome').textContent = clienteNome;
  document.getElementById('clienteGrupoCota').textContent = clienteGrupoCota;
  document.getElementById('clienteRamo').textContent = clienteRamo;
});

// Efeito da Tela de Carregamento
document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loading-screen');
  const startTime = Date.now();

  window.addEventListener('load', function () {
    const elapsedTime = Date.now() - startTime;
    const minDelay = 2500;
    const remainingTime = minDelay - elapsedTime;

    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease';
      setTimeout(() => loadingScreen.style.display = 'none', 500);
    }, remainingTime > 0 ? remainingTime : 0);
  });
});


// Lógica do campo de comentário
document.addEventListener('DOMContentLoaded', function () {
  const campoComentario = document.getElementById('campoComentario');
  const btnSalvarComentario = document.getElementById('btnSalvarComentario');
  const textareaComentario = document.getElementById('comentarioAnalise');
  const divComentarioTexto = document.getElementById('comentarioAnaliseTexto');

  // Já deixa o campo visível (no HTML já está display:block)

  btnSalvarComentario.addEventListener('click', () => {
    const texto = textareaComentario.value.trim();
    if (texto) {
      divComentarioTexto.textContent = texto;
      campoComentario.style.display = 'none'; // Oculta campo após salvar
      alert('Comentário salvo com sucesso! Ele será incluído no PDF.');
    } else {
      alert('Por favor, escreva algum comentário antes de salvar.');
    }
  });
});
function toggleInfo(id) {
  const info = document.getElementById(id);
  if (info.style.display === 'none' || info.style.display === '') {
    info.style.display = 'block';
  } else {
    info.style.display = 'none';
  }
}
function flipCard(id) {
  const card = document.getElementById(id);
  card.classList.toggle('flipped');
}

// Exibição dos índices no HTML para o ano vigente
indices.forEach((item, index) => {
  const span = document.getElementById(`indice${index + 1}`);
  if (span) {
    let valorFormatado = typeof item.valor === 'number'
      ? item.valor.toFixed(2).replace('.', ',')
      : item.valor;
    span.textContent = valorFormatado;
  }
});

// Exibição dos índices no HTML para o ano anterior
indicesAnterior.forEach((item, index) => {
  const spanAnt = document.getElementById(`indice${index + 1}-anterior`);
  if (spanAnt) {
    let valorFormatadoAnt = typeof item.valor === 'number'
      ? item.valor.toFixed(2).replace('.', ',')
      : item.valor;
    spanAnt.textContent = valorFormatadoAnt;
  }
});
