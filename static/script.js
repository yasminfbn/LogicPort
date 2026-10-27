
const porta = document.getElementById("porta");
const entradaA = document.getElementById("entradaA");
const entradaB = document.getElementById("entradaB");
const campoB = document.getElementById("campoB");
const btnCalcular = document.getElementById("btnCalcular");

const visualA = document.getElementById("visualA");
const visualB = document.getElementById("visualB");
const resultado = document.getElementById("resultado");
const lampada = document.getElementById("lampada");
const estadoLampada = document.getElementById("estadoLampada");
const resumoResultado = document.getElementById("resumoResultado");
const explicacao = document.getElementById("explicacao");
const mensagem = document.getElementById("mensagem");
const botaoTema = document.getElementById("botaoTema");

const descricoes = {
    AND: "A porta AND só retorna 1 quando todas as entradas são 1.",
    OR: "A porta OR retorna 1 quando pelo menos uma entrada é 1.",
    NOT: "A porta NOT inverte a entrada: 0 vira 1 e 1 vira 0.",
    NAND: "A porta NAND inverte o resultado da AND.",
    NOR: "A porta NOR só retorna 1 quando todas as entradas são 0.",
    XOR: "A porta XOR retorna 1 quando as entradas são diferentes.",
    XNOR: "A porta XNOR retorna 1 quando as entradas são iguais."
};

/* Aplicações práticas das portas lógicas. */
const aplicacoes = {
    AND: {
        titulo: "Sistema de controle de acesso",
        texto: "A porta AND só libera a saída quando todas as condições necessárias são verdadeiras.",
        detalhe: "Exemplo: o usuário precisa estar autenticado e autorizado para entrar."
    },
    OR: {
        titulo: "Sistema de alarme",
        texto: "A porta OR ativa a saída quando pelo menos uma das entradas é 1.",
        detalhe: "Exemplo: um alarme dispara se o sensor da porta ou o sensor da janela detectar uma invasão."
    },
    NOT: {
        titulo: "Inversão de sinal",
        texto: "A porta NOT inverte o valor recebido: 0 se torna 1 e 1 se torna 0.",
        detalhe: "Exemplo: um circuito pode utilizar um sinal invertido para indicar que uma condição não está ativa."
    },
    NAND: {
        titulo: "Circuitos digitais",
        texto: "A porta NAND realiza a operação AND e inverte o resultado.",
        detalhe: "Exemplo: portas NAND podem ser combinadas para construir outras funções lógicas."
    },
    NOR: {
        titulo: "Monitoramento de sensores",
        texto: "A porta NOR retorna 1 somente quando todas as entradas são 0.",
        detalhe: "Exemplo: um circuito pode gerar um sinal quando nenhum dos sensores está ativo."
    },
    XOR: {
        titulo: "Comparação de bits",
        texto: "A porta XOR retorna 1 quando as entradas possuem valores diferentes.",
        detalhe: "Exemplo: é utilizada em circuitos somadores e em operações de comparação de bits."
    },
    XNOR: {
        titulo: "Verificação de igualdade",
        texto: "A porta XNOR retorna 1 quando as entradas possuem o mesmo valor.",
        detalhe: "Exemplo: pode ser utilizada para comparar bits e verificar se são iguais."
    }
};

/* Calcula o resultado lógico. */
function calcularLogica(tipo, a, b = 0) {
    switch (tipo) {
        case "AND":
            return a && b ? 1 : 0;

        case "OR":
            return a || b ? 1 : 0;

        case "NOT":
            return a === 0 ? 1 : 0;

        case "NAND":
            return a && b ? 0 : 1;

        case "NOR":
            return a || b ? 0 : 1;

        case "XOR":
            return a !== b ? 1 : 0;

        case "XNOR":
            return a === b ? 1 : 0;

        default:
            return 0;
    }
}

/* Atualiza a aplicação prática exibida. */
function atualizarAplicacao(tipo) {
    const aplicacao = aplicacoes[tipo];

    if (!aplicacao) return;

    const titulo = document.getElementById("tituloAplicacao");
    const texto = document.getElementById("textoAplicacao");
    const detalhe = document.getElementById("detalheAplicacao");

    if (titulo) titulo.textContent = aplicacao.titulo;
    if (texto) texto.textContent = aplicacao.texto;
    if (detalhe) detalhe.textContent = aplicacao.detalhe;
}

/* Desenha a porta lógica selecionada. */
function atualizarDesenhoPorta(tipo) {
    const desenho = document.getElementById("desenhoPorta");
    const textoPorta = document.getElementById("textoPorta");

    if (!desenho || !textoPorta) return;

    const yA = 38;
    const yB = 82;
    const yMid = 60;

    const desenhos = {
            AND: `
        <line class="linha-porta"
            x1="0" y1="${yA}" x2="40" y2="${yA}"/>

        <line class="linha-porta"
            x1="0" y1="${yB}" x2="40" y2="${yB}"/>

        <path class="corpo-porta"
            d="M42 ${yA - 22}
            H80
            A22 22 0 0 1 80 ${yB + 22}
            H42 Z"/>

        <line class="linha-porta"
            x1="118" y1="${yMid}" x2="160" y2="${yMid}"/>

        <text class="rotulo-porta"
            x="4" y="${yA - 6}">A</text>

        <text class="rotulo-porta"
            x="4" y="${yB - 6}">B</text>
    `,

        OR: `
            <line class="linha-porta" x1="0" y1="${yA}" x2="44" y2="${yA}"/>
            <line class="linha-porta" x1="0" y1="${yB}" x2="44" y2="${yB}"/>
            <path class="corpo-porta"
                d="M38 ${yA - 22}
                   Q55 ${yMid} 38 ${yB + 22}
                   Q70 ${yB + 22} 118 ${yMid}
                   Q70 ${yA - 22} 38 ${yA - 22} Z"/>
            <line class="linha-porta" x1="118" y1="${yMid}" x2="160" y2="${yMid}"/>
            <text class="rotulo-porta" x="4" y="${yA - 6}">A</text>
            <text class="rotulo-porta" x="4" y="${yB - 6}">B</text>
        `,

        NOT: `
            <line class="linha-porta" x1="0" y1="${yMid}" x2="40" y2="${yMid}"/>
            <path class="corpo-porta"
                d="M40 ${yMid - 32}
                   L40 ${yMid + 32}
                   L108 ${yMid} Z"/>
            <circle class="circulo-negacao" cx="116" cy="${yMid}" r="8"/>
            <line class="linha-porta" x1="124" y1="${yMid}" x2="160" y2="${yMid}"/>
            <text class="rotulo-porta" x="4" y="${yMid - 8}">A</text>
        `,

        NAND: `
            <line class="linha-porta" x1="0" y1="${yA}" x2="42" y2="${yA}"/>
            <line class="linha-porta" x1="0" y1="${yB}" x2="42" y2="${yB}"/>
            <path class="corpo-porta"
                d="M42 ${yA - 22}
                   H76
                   A22 22 0 0 1 76 ${yB + 22}
                   H42 Z"/>
            <circle class="circulo-negacao" cx="84" cy="${yMid}" r="8"/>
            <line class="linha-porta" x1="92" y1="${yMid}" x2="160" y2="${yMid}"/>
            <text class="rotulo-porta" x="4" y="${yA - 6}">A</text>
            <text class="rotulo-porta" x="4" y="${yB - 6}">B</text>
        `,

        NOR: `
            <line class="linha-porta" x1="0" y1="${yA}" x2="44" y2="${yA}"/>
            <line class="linha-porta" x1="0" y1="${yB}" x2="44" y2="${yB}"/>
            <path class="corpo-porta"
                d="M38 ${yA - 22}
                   Q55 ${yMid} 38 ${yB + 22}
                   Q68 ${yB + 22} 106 ${yMid}
                   Q68 ${yA - 22} 38 ${yA - 22} Z"/>
            <circle class="circulo-negacao" cx="114" cy="${yMid}" r="8"/>
            <line class="linha-porta" x1="122" y1="${yMid}" x2="160" y2="${yMid}"/>
            <text class="rotulo-porta" x="4" y="${yA - 6}">A</text>
            <text class="rotulo-porta" x="4" y="${yB - 6}">B</text>
        `,

        XOR: `
            <line class="linha-porta" x1="0" y1="${yA}" x2="48" y2="${yA}"/>
            <line class="linha-porta" x1="0" y1="${yB}" x2="48" y2="${yB}"/>
            <path class="linha-porta"
                d="M28 ${yA - 22} Q45 ${yMid} 28 ${yB + 22}"/>
            <path class="corpo-porta"
                d="M42 ${yA - 22}
                   Q59 ${yMid} 42 ${yB + 22}
                   Q74 ${yB + 22} 118 ${yMid}
                   Q74 ${yA - 22} 42 ${yA - 22} Z"/>
            <line class="linha-porta" x1="118" y1="${yMid}" x2="160" y2="${yMid}"/>
            <text class="rotulo-porta" x="4" y="${yA - 6}">A</text>
            <text class="rotulo-porta" x="4" y="${yB - 6}">B</text>
        `,

        XNOR: `
            <line class="linha-porta" x1="0" y1="${yA}" x2="48" y2="${yA}"/>
            <line class="linha-porta" x1="0" y1="${yB}" x2="48" y2="${yB}"/>
            <path class="linha-porta"
                d="M28 ${yA - 22} Q45 ${yMid} 28 ${yB + 22}"/>
            <path class="corpo-porta"
                d="M42 ${yA - 22}
                   Q59 ${yMid} 42 ${yB + 22}
                   Q72 ${yB + 22} 106 ${yMid}
                   Q72 ${yA - 22} 42 ${yA - 22} Z"/>
            <circle class="circulo-negacao" cx="114" cy="${yMid}" r="8"/>
            <line class="linha-porta" x1="122" y1="${yMid}" x2="160" y2="${yMid}"/>
            <text class="rotulo-porta" x="4" y="${yA - 6}">A</text>
            <text class="rotulo-porta" x="4" y="${yB - 6}">B</text>
        `
    };

    desenho.innerHTML = desenhos[tipo] || desenhos.AND;
    desenho.setAttribute("aria-label", `Porta lógica ${tipo}`);
    textoPorta.textContent = tipo;

    const portaVisual = desenho.closest(".porta-visual");

    if (portaVisual) {
        portaVisual.dataset.porta = tipo;
    }
}

/* Atualiza os botões visuais das entradas. */
function atualizarEntrada(id, valor) {
    const campo = document.getElementById(id);

    if (!campo) return;

    campo.value = valor;

    document.querySelectorAll(`[data-entrada="${id}"]`).forEach(botao => {
        const selecionado = botao.dataset.valor === String(valor);

        botao.classList.toggle("ativo", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
    });

    if (id === "entradaA") {
        const estadoA = document.getElementById("estadoA");

        if (estadoA) {
            estadoA.textContent = valor === 1 ? "Ligado" : "Desligado";
        }

        if (visualA) visualA.textContent = valor;
    } else {
        const estadoB = document.getElementById("estadoB");

        if (estadoB) {
            estadoB.textContent = valor === 1 ? "Ligado" : "Desligado";
        }

        if (visualB) visualB.textContent = valor;
    }

    if (mensagem) mensagem.textContent = "";

    atualizarTabelaVerdade();
}

/* Captura os cliques nos valores 0 e 1. */
document.querySelectorAll(".valor").forEach(botao => {
    botao.addEventListener("click", () => {
        atualizarEntrada(
            botao.dataset.entrada,
            Number(botao.dataset.valor)
        );
    });
});

/* Atualiza a aparência da lâmpada. */
function atualizarLampada(valor) {
    if (!lampada) return;

    lampada.classList.remove("acesa", "apagada");

    if (valor === 1) {
        lampada.classList.add("acesa");

        if (estadoLampada) {
            estadoLampada.textContent = "Lâmpada acesa";
        }

        lampada.setAttribute("aria-label", "Lâmpada acesa");
    } else {
        lampada.classList.add("apagada");

        if (estadoLampada) {
            estadoLampada.textContent = "Lâmpada apagada";
        }

        lampada.setAttribute("aria-label", "Lâmpada apagada");
    }
}

/* Gera a tabela-verdade da porta selecionada. */
function atualizarTabelaVerdade() {
    const corpoTabela =
        document.getElementById("corpoTabelaVerdade") ||
        document.getElementById("corpoTabela");

    const cabecalhoB = document.getElementById("cabecalhoB");
    const portaSelecionada = porta ? porta.value : "AND";
    const ehNOT = portaSelecionada === "NOT";

    if (!corpoTabela) return;

    if (cabecalhoB) {
        cabecalhoB.style.display = ehNOT ? "none" : "";
    }

    const valorA = entradaA ? Number(entradaA.value) : 0;
    const valorB = entradaB ? Number(entradaB.value) : 0;

    const combinacoes = ehNOT
        ? [{ a: 0, b: null }, { a: 1, b: null }]
        : [
            { a: 0, b: 0 },
            { a: 0, b: 1 },
            { a: 1, b: 0 },
            { a: 1, b: 1 }
        ];

    corpoTabela.innerHTML = "";

    combinacoes.forEach(combinacao => {
        const saida = calcularLogica(
            portaSelecionada,
            combinacao.a,
            combinacao.b ?? 0
        );

        const linha = document.createElement("tr");

        if (
            combinacao.a === valorA &&
            (ehNOT || combinacao.b === valorB)
        ) {
            linha.classList.add("linha-ativa");
        }

        const celulaA = document.createElement("td");
        celulaA.textContent = combinacao.a;
        linha.appendChild(celulaA);

        if (!ehNOT) {
            const celulaB = document.createElement("td");
            celulaB.textContent = combinacao.b;
            linha.appendChild(celulaB);
        }

        const celulaSaida = document.createElement("td");
        celulaSaida.textContent = saida;
        linha.appendChild(celulaSaida);

        corpoTabela.appendChild(linha);
    });
}

/* Atualiza o circuito e a aplicação prática quando a porta muda. */
function atualizarPorta() {
    if (!porta) return;

    const selecionada = porta.value;
    const ehNOT = selecionada === "NOT";

    atualizarDesenhoPorta(selecionada);
    atualizarAplicacao(selecionada);

    const circuito = document.querySelector(".circuito");

    if (circuito) {
        circuito.classList.toggle("porta-not-ativa", ehNOT);
    }

    if (campoB) {
        campoB.style.display = ehNOT ? "none" : "";
    }

    const visualEntradaB = document.getElementById("visualEntradaB");

    if (visualEntradaB) {
        visualEntradaB.style.display = ehNOT ? "none" : "";
    }

    const fioB = document.querySelector(".fio-b");

    if (fioB) {
        fioB.style.visibility = ehNOT ? "hidden" : "visible";
    }

    if (explicacao) {
        explicacao.textContent = descricoes[selecionada];
    }

    if (resultado) resultado.textContent = "?";

    if (resumoResultado) {
        resumoResultado.textContent = "Aguardando cálculo";
    }

    atualizarLampada(0);

    if (estadoLampada) {
        estadoLampada.textContent = "Lâmpada aguardando cálculo";
    }

    if (mensagem) mensagem.textContent = "";

    atualizarTabelaVerdade();
}

if (porta) {
    porta.addEventListener("change", atualizarPorta);
}

/* Calcula o resultado usando o Flask. */
async function calcularResultado() {
    if (!porta || !entradaA || !entradaB || !btnCalcular) return;

    btnCalcular.disabled = true;
    btnCalcular.textContent = "Calculando...";

    if (mensagem) mensagem.textContent = "";

    const dados = {
        porta: porta.value,
        a: Number(entradaA.value),
        b: Number(entradaB.value)
    };

    try {
        const resposta = await fetch("/calcular", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const dadosResposta = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dadosResposta.erro || "Não foi possível calcular."
            );
        }

        const valor = Number(dadosResposta.resultado);
        const portaCalculada = dadosResposta.porta || dados.porta;
        const aCalculado = Number(dadosResposta.a);
        const bCalculado = dadosResposta.b === null
            ? null
            : Number(dadosResposta.b);

        if (resultado) resultado.textContent = valor;

        if (resumoResultado) {
            resumoResultado.textContent = `Saída lógica: ${valor}`;
        }

        if (visualA) visualA.textContent = aCalculado;

        if (visualB && bCalculado !== null) {
            visualB.textContent = bCalculado;
        }

        atualizarLampada(valor);

        if (explicacao) {
            explicacao.textContent =
                `${descricoes[portaCalculada]} ` +
                `Com A = ${aCalculado}` +
                (bCalculado !== null ? ` e B = ${bCalculado}` : "") +
                `, o resultado é ${valor}.`;
        }

        if (mensagem) {
            mensagem.textContent = "Cálculo realizado com sucesso!";
        }

        atualizarTabelaVerdade();
    } catch (erro) {
        if (mensagem) {
            mensagem.textContent =
                "Erro ao calcular. Verifique se o servidor Flask está funcionando.";
        }

        console.error("Erro no cálculo:", erro);
    } finally {
        btnCalcular.disabled = false;
        btnCalcular.innerHTML = "<span>▷</span> Calcular resultado";
    }
}

if (btnCalcular) {
    btnCalcular.addEventListener("click", calcularResultado);
}

/* Alterna entre os temas dark e light. */
function atualizarBotaoTema() {
    if (!botaoTema) return;

    const temaClaro = document.body.classList.contains("light-mode");

    botaoTema.textContent = temaClaro ? "Tema claro" : "Tema escuro";
}

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        atualizarBotaoTema();
    });

    atualizarBotaoTema();
}

/* Inicialização da interface. */
atualizarEntrada("entradaA", 0);
atualizarEntrada("entradaB", 0);
atualizarPorta();
