// Carne - 400 gr por pessoa + de 6 horas - 650
// Cerveja - 1200 ml por pessoa + 6horas - 2000 ml
// Refrigerante/agua - 1000 ml por pessoa + 6 horas 1500 ml

// crianças valem por 0,5

// Carne, linguiça, pao de alho

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const inputAdultos = document.getElementById("adultos");
    const inputCriancas = document.getElementById("criancas");
    const inputDuracao = document.getElementById("duracao");
    const btnCalcular = document.getElementById("btnCalcular");
    const btnResetar = document.getElementById("btnResetar");
    
    // Elementos de resultado
    const resultadoCarne = document.getElementById("carne").querySelector(".valor");
    const resultadoCerveja = document.getElementById("cerveja").querySelector(".valor");
    const resultadoBebidas = document.getElementById("bebidas").querySelector(".valor");
    
    // Configuração inicial
    inputAdultos.focus();
    
    // Event Listeners
    inputAdultos.addEventListener('keypress', handleEnter);
    inputCriancas.addEventListener('keypress', handleEnter);
    inputDuracao.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calcular();
        }
    });
    
    btnCalcular.addEventListener('click', calcular);
    btnResetar.addEventListener('click', resetar);
    
    // Função para navegação com Enter
    function handleEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextInput = this.nextElementSibling?.querySelector('input');
            if (nextInput) nextInput.focus();
        }
    }
    
    // Função para resetar o formulário
    function resetar() {
        inputAdultos.value = '';
        inputCriancas.value = '';
        inputDuracao.value = '';
        
        resultadoCarne.textContent = '0g';
        resultadoCerveja.textContent = '0L';
        resultadoBebidas.textContent = '0L';
        
        inputAdultos.focus();
        btnCalcular.disabled = false;
        btnCalcular.innerHTML = '<i class="fas fa-calculator"></i> Calcular';
    }
    
    // Função principal de cálculo
    function calcular() {
        // Validação dos inputs
        if (!validarInputs()) return;
        
        // Mostrar estado de carregamento
        btnCalcular.disabled = true;
        btnCalcular.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
        
        // Pegar valores
        const adultos = parseInt(inputAdultos.value) || 0;
        const criancas = parseInt(inputCriancas.value) || 0;
        const duracao = parseInt(inputDuracao.value) || 1;
        
        // Calcular quantidades
        const qdtTotalCarne = carnePP(duracao) * adultos + (carnePP(duracao) / 2 * criancas);
        const qdtTotalCerveja = cervejaPP(duracao) * adultos;
        const qdtTotalBebidas = bebidasPP(duracao) * adultos + (bebidasPP(duracao) / 2 * criancas);
        
        // Formatando os resultados
        const carneFormatada = formatarPeso(qdtTotalCarne);
        const cervejaFormatada = formatarLiquidos(qdtTotalCerveja);
        const bebidasFormatada = formatarLiquidos(qdtTotalBebidas);
        
        // Atualizar a interface
        setTimeout(() => {
            resultadoCarne.textContent = carneFormatada;
            resultadoCerveja.textContent = cervejaFormatada;
            resultadoBebidas.textContent = bebidasFormatada;
            
            btnCalcular.disabled = false;
            btnCalcular.innerHTML = '<i class="fas fa-calculator"></i> Calcular';
            
            // Rolagem suave para os resultados (se necessário)
            document.getElementById("resultado").scrollIntoView({ behavior: 'smooth' });
        }, 800);
    }
    
    // Funções auxiliares de cálculo
    function carnePP(duracao) {
        return duracao >= 6 ? 650 : 400;
    }
    
    function cervejaPP(duracao) {
        return duracao >= 6 ? 2000 : 1200;
    }
    
    function bebidasPP(duracao) {
        return duracao >= 6 ? 1500 : 1000;
    }
    
    // Função de validação
    function validarInputs() {
        if ((!inputAdultos.value || parseInt(inputAdultos.value) < 0) && 
            (!inputCriancas.value || parseInt(inputCriancas.value) < 0)) {
            alert("Por favor, informe pelo menos a quantidade de adultos ou crianças");
            inputAdultos.focus();
            return false;
        }
        
        if (inputDuracao.value && parseInt(inputDuracao.value) < 1) {
            alert("A duração deve ser de pelo menos 1 hora");
            inputDuracao.focus();
            return false;
        }
        
        return true;
    }
    
    // Funções de formatação
    function formatarPeso(gramas) {
        if (gramas >= 1000) {
            return (gramas / 1000).toFixed(2) + 'kg';
        }
        return gramas + 'g';
    }
    
    function formatarLiquidos(ml) {
        if (ml >= 1000) {
            return (ml / 1000).toFixed(1) + 'L';
        }
        return ml + 'ml';
    }
    
    // Carregar último cálculo salvo (opcional)
    function carregarUltimoCalculo() {
        const ultimoCalculo = localStorage.getItem('ultimoChurrasco');
        if (ultimoCalculo) {
            const { adultos, criancas, duracao } = JSON.parse(ultimoCalculo);
            inputAdultos.value = adultos;
            inputCriancas.value = criancas;
            inputDuracao.value = duracao;
        }
    }
    
    // Inicializar (opcional)
    carregarUltimoCalculo();
});