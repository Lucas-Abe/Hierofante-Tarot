
//Seleciona todos os botões dos cards de 1 opção apenas.
const botao_carrinhos_tipo1 = document.querySelectorAll('.botao-comprar button');

//Seleciona o card de todas as opções.
const botoes_opcao = document.querySelectorAll('input[type="radio"]');


//Lógica para resetar todos os cards quando for selecionada uma opção de apenas 1 card.
for (let i = 0; i < botao_carrinhos_tipo1.length; i++) {
    botao_carrinhos_tipo1[i].addEventListener('click', function () {
        resetarTodosCards();
        liberarBotaoCarrinho(botao_carrinhos_tipo1[i]);
    })
}

//Lógica para "des-pressionar" um radio e resetar card mais elaborados se necessário
for (let i = 0; i < botoes_opcao.length; i++) {

    botoes_opcao[i].addEventListener('click', function () {
        let card = this.closest('.consulta-tipo');
        let radioSelecionado = this;

        if (radioSelecionado.checked) {
            if (radioSelecionado.dataset.wasChecked) {
                radioSelecionado.checked = false;
                delete radioSelecionado.dataset.wasChecked;

                let botao = card.querySelector('button');
                if (botao) {
                    travaCarrinho(botao);
                }

                let checkboxes = card.querySelectorAll('input[type="checkbox"]')
                checkboxes.forEach(cb => cb.checked = false)

                const lista_checkboxes = card.querySelector('.tipo2-extensao');
                if (lista_checkboxes) lista_checkboxes.classList.remove('ativo');

                return;
            }
            else {
                radioSelecionado.dataset.wasChecked = true;
            }
        }

        let radiosNoCard = card.querySelectorAll('input[type="radio"]')
        radiosNoCard.forEach(r => {
            if (r !== radioSelecionado) delete r.dataset.wasChecked;
        });

        resetarTodosCards(card);

        let lista_checkboxes = card.querySelector('.tipo2-extensao');

        if (lista_checkboxes != null) {
            liberarCheckboxes(card)
        }
        else {
            let botao = card.querySelector('button')
            liberarBotaoCarrinho(botao);
        }

    })
}

//Função que libera o botão de carrinho a ser clicado. Recebe como parâmetro o tipo do carrinho de cada card a ser liberado.
function liberarBotaoCarrinho(botao) {

    botao.disabled = false;
    botao.classList.add('botao-ativo');
}

function liberarCheckboxes(card) {
    let radioSelecionado = card.querySelector('input[type="radio"]:checked')

    if (!radioSelecionado) return;

    let valor_radio = radioSelecionado.dataset.tipo;

    let libera_lista = card.querySelector('.tipo2-extensao');
    libera_lista.classList.add('ativo');

    let lista_opcoes = card.querySelectorAll('.tipo2-opcao input');

    if (valor_radio === "unidade") {
        for (let i = 0; i < lista_opcoes.length; i++) {
            lista_opcoes[i].checked = false;
        }
    }
    else {
        for (let i = 0; i < lista_opcoes.length; i++) {
            lista_opcoes[i].checked = true;
        }
    }
    let botaoCarrinho = card.querySelector('.botao-comprar-tipo2 button');
    validaCheckbox(lista_opcoes, botaoCarrinho)

    for (let i = 0; i < lista_opcoes.length; i++) {

        lista_opcoes[i].addEventListener('change', function () {
            validaCheckbox(lista_opcoes, botaoCarrinho)

            let opcaoUnidade = card.querySelector('input[data-tipo="unidade"]');
            let opcaoCombo = card.querySelector('input[data-tipo="combo"]');

            trocaOpcao(lista_opcoes, opcaoUnidade, opcaoCombo);
        })

    }

}

//Função que deixa o carrinho indisponível para ser clicado. 
function travaCarrinho(botao) {
    botao.disabled = true;
    botao.classList.remove('botao-ativo');
}

//Função onde checa se há algum checkbox marcado. Se tiver, deixa o carrinho liberado.
//Recebe como parâmetro qual checkbox de qual card foi escolhido, e qual carrinho também.
function validaCheckbox(tipo_checkbox, tipo_carrinho) {
    const checarMarcado = Array.from(tipo_checkbox).some(cb => cb.checked);

    if (checarMarcado) {
        liberarBotaoCarrinho(tipo_carrinho);
    }
    else {
        travaCarrinho(tipo_carrinho);
    }

}

//Função onde controla as opções. Se tiver todas marcadas, troca automaticamente para "Combo". Caso não, permance em "Unidade".
//Recebe como função o tipo de checkbox de um card e duas opções. Opcao1 sempre se refere a opção unidade. Opcao2 sempre se refere ao combo.
function trocaOpcao(tipo_checkbox, opcao1, opcao2) {

    //Verifica se tem alguma checkbox não marcada
    const checarNaoMarcado = Array.from(tipo_checkbox).some(cb => cb.checked === false);

    //Se tiver alguma não marcada, troca para a escolha da Unidade
    if (checarNaoMarcado) {
        opcao2.checked = false;
        opcao1.checked = true;
    }
    //Se tiverem todas marcadas, troca/permanece na opção Combo
    else {
        opcao2.checked = true;
        opcao1.checked = false;
    }
}


function resetarTodosCards(card) {
    let todosCards = document.querySelectorAll('.consulta-tipo');

    for (let i = 0; i < todosCards.length; i++) {
        let cardAtual = todosCards[i];
        if (card != cardAtual) {

            let opcao = cardAtual.querySelectorAll('input[type="radio"]');

            for (let j = 0; j < opcao.length; j++) {
                opcao[j].checked = false;
            }

            let lista_checkboxes = cardAtual.querySelector('.tipo2-extensao');

            if (lista_checkboxes != null) {
                lista_checkboxes.classList.remove('ativo');
            }


            let carrinho = cardAtual.querySelector('.botao-comprar-tipo2 button')

            if (carrinho) {
                travaCarrinho(carrinho);
            }

        }
    }

}

//Lógica do carrinho 

const botao_mostrarCarrinho = document.getElementById('ativar-carrinho');
const botao_ocultarCarrinho = document.getElementById('desativar-carrinho');

botao_mostrarCarrinho.addEventListener('click', mostrarCarrinho);
botao_ocultarCarrinho.addEventListener('click', ocultarCarrinho);

function mostrarCarrinho() {
    const aba_carrinho = document.getElementById('aba-carrinho');

    aba_carrinho.classList.remove('ocultar-carrinho');
    aba_carrinho.classList.add('mostrar-carrinho');
}

function ocultarCarrinho() {

    const aba_carrinho = document.getElementById('aba-carrinho');

    aba_carrinho.classList.remove('mostrar-carrinho');
    aba_carrinho.classList.add('ocultar-carrinho');
}

const carrinho = [];
const lista_carrinho = document.getElementById('lista-carrinho');

const botoes = document.querySelectorAll('.botao-comprar button, .botao-comprar-tipo2 button');

for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', function () {
        adicionarAoCarrinho(this);
    })
}

function adicionarAoCarrinho(botao) {

    const opcao = botao.closest('.consulta-tipo');

    const titulo = opcao.querySelector('h4').innerText;

    let preco = 0;

    const radioSelecionado = opcao.querySelector('input[type="radio"]:checked');

    const checkboxesMarcados = opcao.querySelectorAll('input[type="checkbox"]:checked');

    if (botao.dataset.preco) {
        preco = parseFloat(botao.dataset.preco);
    }
    else {
        if (radioSelecionado) {
            const tipo = radioSelecionado.dataset.tipo

            if (radioSelecionado.dataset.preco) {
                preco = parseFloat(radioSelecionado.dataset.preco);
            }
            else if (tipo === 'unidade') {
                const precoCada = parseFloat(radioSelecionado.dataset.precoCada);
                const precoMax = parseFloat(radioSelecionado.dataset.precoMax);

                preco = precoCada * checkboxesMarcados.length;

                if (preco > precoMax) {
                    preco = precoMax;
                }
            }
        }

    }

    let descricaoFinal = {
        descricao: titulo,
        quantidade: 1,
        preco: preco
    }

    if (radioSelecionado) {
        const descricao = radioSelecionado.closest('.consulta-preco-tipo2');

        if (descricao) {
            const textoRadio = descricao.querySelector('h5').innerText;
            descricaoFinal.descricao += ' - ' + textoRadio + ' ';
        }
    }

    if (checkboxesMarcados.length > 0) {
        descricaoFinal.descricao += ' (';

        for (let i = 0; i < checkboxesMarcados.length; i++) {
            const textoCheckbox = checkboxesMarcados[i].value;
            descricaoFinal.descricao += textoCheckbox;

            if (i < checkboxesMarcados.length - 1) {
                descricaoFinal.descricao += ', ';
            }

        }
        descricaoFinal.descricao += ')';
    }

    function checarDescricao(item) {
        return item.descricao === descricaoFinal.descricao;
    }

    let checarDuplicado = carrinho.find(checarDescricao)

    if (checarDuplicado) {
        checarDuplicado.quantidade++;

        atualizarCarrinho();
    }
    else {
        carrinho.push(descricaoFinal);
        atualizarCarrinho();
    }

    /*carrinho.push(descricaoFinal);
    atualizarCarrinho();*/

}

function atualizarCarrinho() {

    lista_carrinho.innerHTML = '';

    for (let i = 0; i < carrinho.length; i++) {
        const botaoMenos = document.createElement('button');
        botaoMenos.innerText = '-';
        botaoMenos.style.color = 'white';

        const botaoMais = document.createElement('button');
        botaoMais.innerText = '+';
        botaoMais.style.color = 'white';

        const li = document.createElement('li');
        let texto = document.createElement('span');
        texto.innerText = carrinho[i].quantidade + 'x '
            + carrinho[i].descricao
            + ' - R$' + carrinho[i].preco;

        botaoMenos.onclick = function () {
            carrinho[i].quantidade--;

            if (carrinho[i].quantidade <= 0) {
                carrinho.splice(i, 1);
            }

            atualizarCarrinho();
        }

        botaoMais.onclick = function () {
            carrinho[i].quantidade++;
            atualizarCarrinho();
        }


        li.append(botaoMenos, ' ', texto, ' ', botaoMais);

        lista_carrinho.append(li);
    }

}

const botao_enviar_mensagem = document.querySelector('#botao-carrinho');
botao_enviar_mensagem.addEventListener('click', enviarMensagemWhatsApp)

function enviarMensagemWhatsApp() {
    const numero_celular = "5561981825914";

    let mensagem = [];

    for (let i = 0; i < carrinho.length; i++) {
        mensagem.push(carrinho[i].quantidade + "x " + carrinho[i].descricao + " - R$" + carrinho[i].preco);
    }
    let mensagemFormatada = mensagem.join("\n");

    if (mensagemFormatada === '') {
        alert("Por favor, coloque itens no carrinho antes de apertar o botão!");
    }
    else {
        console.log(mensagemFormatada)
        console.log('---')
        mensagemFormatada = `Olá! Vim do seu site, a seguir estão os itens que escolhi:
${mensagemFormatada}`;
        console.log(mensagemFormatada)

        const url = `https://wa.me/${numero_celular}?text=${encodeURIComponent(mensagemFormatada)}`;
        window.open(url, '_blank').focus();
    }
}