function obtenerValorInput(id) {
    let valor = parseFloat(document.getElementById(id).value);
    if (isNaN(valor) || valor < 0) {
        alert("Por favor, ingresa un valor válido y positivo para " + id);
        throw "Entrada inválida";
    }
    return valor;
}

function calcularGastosTotales() {
    let vivienda = obtenerValorInput('vivienda');
    let alimentacion = obtenerValorInput('alimentacion');
    let transporte = obtenerValorInput('transporte');
    let entretenimiento = obtenerValorInput('entretenimiento');
    let otros = obtenerValorInput('otros');
    return vivienda + alimentacion + transporte + entretenimiento + otros;
}

function calcularPresupuesto() {
    try {
        let ingresos = obtenerValorInput('ingresos');
        let totalGastos = calcularGastosTotales();
        let balance = ingresos - totalGastos;
        mostrarResultado(balance, totalGastos);
    } catch (error) {
        console.error(error);
    }
}

function mostrarResultado(balance, totalGastos) {
    let mensaje;
    if (balance > 0) {
        mensaje = `Te queda un presupuesto positivo de: ${balance.toFixed(2)} pesos uruguayos.`;
    } else if (balance < 0) {
        mensaje = `Tienes un déficit de: ${balance.toFixed(2)} pesos uruguayos.`;
    } else {
        mensaje = "Tus ingresos y gastos están balanceados perfectamente.";
    }

    mensaje += `<br>Total de Gastos: ${totalGastos.toFixed(2)} pesos uruguayos..`;
    document.getElementById('resultado').innerHTML = mensaje;
}
