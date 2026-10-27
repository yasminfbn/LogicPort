
const porta = document.getElementById("porta");
const entradaA = document.getElementById("entradaA");
const entradaB = document.getElementById("entradaB");
const campoB = document.getElementById("campoB");
const btnCalcular = document.getElementById("btnCalcular");

const visualA = document.getElementById("visualA");
const visualB = document.getElementById("visualB");
const nomePorta = document.getElementById("nomePorta");
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

// Atualiza os botões visuais de cada entrada.
function atualizarEntrada(id, valor) {
    const campo = document.getElementById(id);

    campo.value = valor;

    document
        .querySelectorAll(`[data-entrada="${id}"]`)
        .forEach(botao => {
            botao.classList.toggle(
                "ativo",
                botao.dataset.valor === String(valor)
            );

            botao.setAttribute(
                "aria-pressed",
                botao.dataset.valor === String(valor) ? "true" : "false"
            );
        });

    if (id === "entradaA") {
        document.getElementById("estadoA").textContent =
            valor === 1 ? "Ligado" : "Desligado";

        visualA.textContent = valor;
    } else {
        document.getElementById("estadoB").textContent =
            valor === 1 ? "Ligado" : "Desligado";

        visualB.textContent = valor;
    }

    mensagem.textContent = "";
}

// Captura os cliques nos valores 0 e 1.
document.querySelectorAll(".valor").forEach(botao => {
    botao.addEventListener("click", () => {
        atualizarEntrada(
            botao.dataset.entrada,
            Number(botao.dataset.valor)
        );
    });
});

// Atualiza a aparência da lâmpada.
function atualizarLampada(valor) {
    lampada.classList.remove("acesa", "apagada");

    if (valor === 1) {
        lampada.classList.add("acesa");
        estadoLampada.textContent = "Lâmpada acesa";
        lampada.setAttribute("aria-label", "Lâmpada acesa");
    } else {
        lampada.classList.add("apagada");
        estadoLampada.textContent = "Lâmpada apagada";
        lampada.setAttribute("aria-label", "Lâmpada apagada");
    }
}

// Mostra ou oculta a entrada B conforme a porta escolhida.
function atualizarPorta() {
    const selecionada = porta.value;

    nomePorta.textContent = selecionada;

    campoB.style.display =
        selecionada === "NOT" ? "none" : "";

    // Também oculta a entrada B no desenho do circuito, se existir.
    const visualEntradaB = document.getElementById("visualEntradaB");

    if (visualEntradaB) {
        visualEntradaB.style.display =
            selecionada === "NOT" ? "none" : "";
    }

    explicacao.textContent = descricoes[selecionada];

    resultado.textContent = "?";
    resumoResultado.textContent = "Aguardando cálculo";

    atualizarLampada(0);
    estadoLampada.textContent = "Lâmpada aguardando cálculo";

    mensagem.textContent = "";
}

porta.addEventListener("change", atualizarPorta);

// Envia as entradas para o Flask e recebe o resultado.
async function calcularResultado() {
    btnCalcular.disabled = true;
    btnCalcular.textContent = "Calculando...";
    mensagem.textContent = "";

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

        // Atualiza o resultado numérico.
        resultado.textContent = valor;

        resumoResultado.textContent =
            `Saída lógica: ${valor}`;

        // Atualiza os valores mostrados no circuito.
        visualA.textContent = dadosResposta.a;

        if (dadosResposta.b !== null) {
            visualB.textContent = dadosResposta.b;
        }

        // Acende a lâmpada quando o resultado é 1.
        // Apaga a lâmpada quando o resultado é 0.
        atualizarLampada(valor);

        // Explica o resultado do cálculo.
        explicacao.textContent =
            `${descricoes[dadosResposta.porta]} ` +
            `Com A = ${dadosResposta.a}` +
            (dadosResposta.b !== null
                ? ` e B = ${dadosResposta.b}`
                : "") +
            `, o resultado é ${valor}.`;

        mensagem.textContent = "Cálculo realizado com sucesso!";

    } catch (erro) {
        mensagem.textContent =
            "Erro ao calcular. Verifique se o servidor Flask está funcionando.";

        console.error("Erro no cálculo:", erro);

    } finally {
        btnCalcular.disabled = false;
        btnCalcular.innerHTML = "<span>▷</span> Calcular resultado";
    }
}

btnCalcular.addEventListener("click", calcularResultado);

// Alterna entre os temas dark e light.
function atualizarBotaoTema() {
    if (!botaoTema) {
        return;
    }

    const temaClaro = document.body.classList.contains("light-mode");

    botaoTema.textContent = temaClaro
        ? "Tema claro"
        : "Tema escuro";
}

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        atualizarBotaoTema();
    });

    atualizarBotaoTema();
}

// Configuração inicial da interface.
atualizarEntrada("entradaA", 0);
atualizarEntrada("entradaB", 0);
atualizarPorta();
