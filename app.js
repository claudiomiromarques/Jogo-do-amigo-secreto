//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Array para armazenar os nomes dos participantes do Amigo Secreto
    const listaAmigos = [];
    
    // Obtendo os elementos do HTML
    const inputAmigo = document.getElementById("amigo"); // Campo de entrada do nome
    const btnAdicionar = document.querySelector(".button-add"); // Botão "Adicionar"
    const btnSortear = document.querySelector(".button-draw"); // Botão "Sortear Amigo"
    const btnNovoSorteio = document.querySelector(".button-reset"); // Botão "Novo Sorteio"
    const btnLimparLista = document.querySelector(".button-clear"); // Botão "Limpar Lista"
    const listaAmigosEl = document.getElementById("listaAmigos"); // Lista exibindo os amigos adicionados
    const resultadoEl = document.getElementById("resultado"); // Área onde o sorteado será exibido

    let ultimoSorteado = null; // Variável que armazena o último amigo sorteado

    // Adiciona eventos de clique nos botões
    btnAdicionar.addEventListener("click", adicionarAmigo);
    btnSortear.addEventListener("click", sortearAmigo);
    btnNovoSorteio.addEventListener("click", novoSorteio);
    btnLimparLista.addEventListener("click", limparLista);

    // Função para adicionar um novo amigo à lista
    function adicionarAmigo() {
        const nome = inputAmigo.value.trim(); // Captura o nome digitado e remove espaços extras

        // Verifica se o nome não está vazio e se já não foi adicionado
        if (nome && !listaAmigos.includes(nome)) {
            listaAmigos.push(nome); // Adiciona o nome ao array
            atualizarLista(); // Atualiza a exibição da lista na tela
            inputAmigo.value = ""; // Limpa o campo de entrada
            inputAmigo.focus(); // Mantém o foco no campo de entrada
        } else {
            alert("Nome inválido ou já adicionado."); // Exibe um alerta caso o nome seja inválido
        }
    }

    // Função para atualizar a lista de amigos na tela
    function atualizarLista() {
        listaAmigosEl.innerHTML = ""; // Limpa a lista exibida antes de atualizá-la
        listaAmigos.forEach(nome => {
            const li = document.createElement("li"); // Cria um novo elemento <li>
            li.textContent = nome; // Define o nome do amigo dentro do <li>
            li.classList.add("name-item"); // Adiciona uma classe para estilização
            listaAmigosEl.appendChild(li); // Adiciona o <li> à lista exibida
        });
    }

    // Função para sortear um amigo aleatoriamente
    function sortearAmigo() {
        if (listaAmigos.length < 2) { // Verifica se há pelo menos dois participantes
            alert("Adicione pelo menos dois nomes para o sorteio!"); // Alerta caso haja menos de dois
            return;
        }

        // Sorteia um nome aleatório da lista
        const sorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
        ultimoSorteado = sorteado; // Armazena o nome sorteado para referência futura

        // Exibe o nome sorteado na tela
        resultadoEl.innerHTML = `<li class="result-item">Amigo Sorteado: <strong>${sorteado}</strong></li>`;

        // Habilita o botão "Novo Sorteio" para permitir um próximo sorteio
        btnNovoSorteio.disabled = false;
    }

    // Função para realizar um novo sorteio removendo o último sorteado da lista
    function novoSorteio() {
        if (ultimoSorteado) { // Verifica se há um amigo já sorteado
            const index = listaAmigos.indexOf(ultimoSorteado); // Encontra a posição do nome sorteado
            if (index !== -1) {
                listaAmigos.splice(index, 1); // Remove o nome sorteado da lista
            }
            atualizarLista(); // Atualiza a exibição da lista após a remoção
            resultadoEl.innerHTML = ""; // Limpa a área de exibição do sorteado
            ultimoSorteado = null; // Reseta a variável do sorteado

            // Se a lista tiver menos de dois nomes restantes, desativa o botão de novo sorteio
            if (listaAmigos.length < 2) {
                btnNovoSorteio.disabled = true;
                alert("Fim do sorteio! Adicione mais amigos para continuar.");
            }
        }
    }

    // Função para limpar toda a lista de amigos e resetar o sorteio
    function limparLista() {
        listaAmigos.length = 0; // Esvazia o array de amigos
        atualizarLista(); // Atualiza a exibição para remover os nomes
        resultadoEl.innerHTML = ""; // Limpa o resultado do sorteio
        ultimoSorteado = null; // Reseta a variável do sorteado
        btnNovoSorteio.disabled = true; // Desativa o botão "Novo Sorteio"
    }
});

