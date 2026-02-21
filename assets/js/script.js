//TODO: adicionar lógica para "despressionar" as opções de cada card.

const uni_esp = document.getElementById('uni_esp');
const combo_esp = document.getElementById('combo_esp');

const consulta_30 = document.getElementById('consulta_30');
const consulta_60 = document.getElementById('consulta_60');

const reiki_1d = document.getElementById('reiki_1d');
const reiki_10d = document.getElementById('reiki_10d');

const pendulo_sn = document.getElementById('pendulo_sn');
const pendulo_alinchakra = document.getElementById('pendulo_alinchakra');

const uni_oraculo = document.getElementById('uni_oraculo');
const combo_oraculo = document.getElementById('combo_oraculo');
const checkboxesOraculo = document.querySelectorAll('.opcao-oraculo');

//Loop onde constantemente verifica os checkboxes, decidindo qual opção deixar disponível dependendo dos checkboxes atualmente escolhidos.
for (let i = 0; i < checkboxesOraculo.length; i++) {
    checkboxesOraculo[i].addEventListener('change', function () {
        validaCheckbox(checkboxesOraculo, 'carrinho_oraculo');
        trocaOpcao(checkboxesOraculo, uni_oraculo, combo_oraculo);
    })
}

const uni_abcaminho = document.getElementById('uni_abcaminho');
const combo_abcaminho = document.getElementById('combo_abcaminho');
const checkboxesAbCaminho = document.querySelectorAll('.opcao-abcaminho');
for (let i = 0; i < checkboxesAbCaminho.length; i++) {
    checkboxesAbCaminho[i].addEventListener('change', function () {
        validaCheckbox(checkboxesAbCaminho, 'carrinho_abcaminho');
        trocaOpcao(checkboxesAbCaminho, uni_abcaminho, combo_abcaminho);
    })
}

const carrinho_pergobj = document.getElementById('carrinho_pergobj')

const carrinho_pergesp = document.getElementById('carrinho_pergesp');

const carrinho_consulta_part = document.getElementById('carrinho_consulta_part');
const carrinho_reiki = document.getElementById('carrinho_reiki');
const carrinho_pendulo = document.getElementById('carrinho_pendulo');
const carrinho_oraculo = document.getElementById('carrinho_oraculo');
const carrinho_abcaminho = document.getElementById('carrinho_abcaminho');
const carrinho_vela = document.getElementById('carrinho_vela');
const carrinho_caldeirao = document.getElementById('carrinho_caldeirao');

//Variável essencial para a lógica de desmarcar as checkboxes quando trocar da opção "Combo" para "Unidade".
let controle_troca = 0;

uni_esp.addEventListener('click', () => liberarBotaoCarrinho('carrinho_pergesp'));
combo_esp.addEventListener('click', () => liberarBotaoCarrinho('carrinho_pergesp'));

consulta_30.addEventListener('click', () => liberarBotaoCarrinho('carrinho_consulta_part'));
consulta_60.addEventListener('click', () => liberarBotaoCarrinho('carrinho_consulta_part'));

reiki_1d.addEventListener('click', () => liberarBotaoCarrinho('carrinho_reiki'));
reiki_10d.addEventListener('click', () => liberarBotaoCarrinho('carrinho_reiki'));

pendulo_sn.addEventListener('click', () => liberarBotaoCarrinho('carrinho_pendulo'));
pendulo_alinchakra.addEventListener('click', () => liberarBotaoCarrinho('carrinho_pendulo'));

uni_oraculo.addEventListener('click', () => liberarOpcoes('uni_oraculo', 'extensao_oraculo', 'carrinho_oraculo', checkboxesOraculo));
combo_oraculo.addEventListener('click', () => liberarOpcoes('combo_oraculo', 'extensao_oraculo', 'carrinho_oraculo', checkboxesOraculo));

uni_abcaminho.addEventListener('click', () => liberarOpcoes('uni_abcaminho', 'extensao_abcaminho', 'carrinho_abcaminho', checkboxesAbCaminho));
combo_abcaminho.addEventListener('click', () => liberarOpcoes('combo_abcaminho', 'extensao_abcaminho', 'carrinho_abcaminho', checkboxesAbCaminho));

/*
Função que libera as opções dos cards que possuem múltiplas escolhas.
Tem como parâmetros a variável escolha, podendo ser "Unidade" ou "Combo"
Lista_opções se refere às diversas opções disponíveis
Tipo_carrinho é o carrinho específico de cada card
E tipo_checkbox gera as checkboxes específicas a um card.
*/
function liberarOpcoes(escolha, lista_opcoes, tipo_carrinho, tipo_checkbox) {
    document.getElementById(lista_opcoes).classList.add('ativo');

    //Se a opção escolhida for algum combo
    if (escolha.includes('combo')) {

        //Marque todas as checkboxes
        for (let i = 0; i < tipo_checkbox.length; i++) {
            tipo_checkbox[i].checked = true;
            controle_troca++;
        }

        //E libere o carrinho na opção Combo
        liberarBotaoCarrinho(tipo_carrinho);
    }
    else {

        //Se combo ter sido escolhido antes, depois ter trocado para Unidade
        if (controle_troca > 0) {

            //Desmarque todas as checkboxes e trave o carrinho
            for (let i = 0; i < tipo_checkbox.length; i++) {
                tipo_checkbox[i].checked = false;
                travaCarrinho(tipo_carrinho);
            }
            controle_troca = 0;
        }
    }

}

//Função que libera o botão de carrinho a ser clicado. Recebe como parâmetro o tipo do carrinho de cada card a ser liberado.
function liberarBotaoCarrinho(tipo_carrinho) {
    document.getElementById(tipo_carrinho).disabled = false;
    document.getElementById(tipo_carrinho).classList.add('botao-ativo');
}

//Função que deixa o carrinho indisponível para ser clicado. 
function travaCarrinho(tipo_carrinho) {
    document.getElementById(tipo_carrinho).disabled = true;
    document.getElementById(tipo_carrinho).classList.remove('botao-ativo');
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

    const radioSelecionado = opcao.querySelector('input[type="radio"]:checked');

    let descricaoFinal = {
        descricao: titulo,
        quantidade: 1
    }

    if (radioSelecionado) {
        const descricao = radioSelecionado.closest('.consulta-preco-tipo2');

        if (descricao) {
            const textoRadio = descricao.querySelector('h5').innerText;
            descricaoFinal.descricao += ' - ' + textoRadio + ' ';
        }
    }

    const checkboxesMarcados = opcao.querySelectorAll('input[type="checkbox"]:checked');

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
        texto.innerText = carrinho[i].quantidade + 'x ' + carrinho[i].descricao;

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
