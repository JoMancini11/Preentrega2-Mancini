// Historial de cálculos
let historial = [];

// Función para capturar datos del formulario
function capturarDatos() {
    ingresos = Number(document.getElementById('ingresos').value);
    let vivienda = Number(document.getElementById('vivienda').value);
    let alimentacion = Number(document.getElementById('alimentacion').value);
    let transporte = Number(document.getElementById('transporte').value);
    let entretenimiento = Number(document.getElementById('entretenimiento').value);
    let otros = Number(document.getElementById('otros').value);

    gastos = [
        { tipo: 'vivienda', monto: vivienda },
        { tipo: 'alimentacion', monto: alimentacion },
        { tipo: 'transporte', monto: transporte },
        { tipo: 'entretenimiento', monto: entretenimiento },
        { tipo: 'otros', monto: otros }
    ];
}

// Función para calcular el presupuesto
function calcularPresupuesto() {
    capturarDatos();
    let totalGastos = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    let presupuestoTotal = ingresos - totalGastos;
    mostrarResultado(presupuestoTotal, totalGastos);
    actualizarHistorial(presupuestoTotal, totalGastos);
    guardarHistorialEnStorage();
}

// Función para mostrar el resultado
function mostrarResultado(presupuestoTotal, totalGastos) {
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p><span class="ingreso">Ingresos: ${ingresos}</span></p>
        <p><span class="gasto">Total de Gastos: ${totalGastos}</span></p>
        <p>El presupuesto total es: <span class="${presupuestoTotal >= 0 ? 'positivo' : 'negativo'}">${presupuestoTotal}</span></p>
    `;
}

// Función para actualizar el historial
function actualizarHistorial(presupuestoTotal, totalGastos) {
    historial.push({ ingresos, gastos: [...gastos], totalGastos, presupuestoTotal });
    mostrarHistorial();
}

// Función para mostrar el historial
function mostrarHistorial() {
    let historialDiv = document.getElementById('historial');
    historialDiv.innerHTML = historial.map((item, index) => `
        <li>
            <span class="ingreso">Ingresos: ${item.ingresos}</span><br>
            <span class="gasto">Total de Gastos: <span class="gasto-rojo">${item.totalGastos}</span></span><br>
            <span class="${item.presupuestoTotal >= 0 ? 'positivo' : 'negativo'}">Presupuesto Total: ${item.presupuestoTotal}</span><br>
            <div class="historial-gastos">
                ${item.gastos.map(g => `<span>${g.tipo}: ${g.monto}</span>`).join('<br>')}
            </div>
            <button onclick="eliminarElementoHistorial(${index})">🗑️</button>
        </li>
    `).join('');
}

// Métodos de búsqueda y filtrado sobre el Array
function buscarPorIngresos(monto) {
    return historial.filter(item => item.ingresos === monto);
}

function buscarPorGastoTipo(tipo, monto) {
    return historial.filter(item => item.gastos.find(g => g.tipo === tipo && g.monto === monto));
}

// Manejadores de eventos para búsqueda
function buscarPorIngresosHandler() {
    let monto = Number(document.getElementById('buscarIngresos').value);
    let resultados = buscarPorIngresos(monto);
    mostrarResultadoBusqueda(resultados);
}

function buscarPorGastoTipoHandler() {
    let tipo = document.getElementById('buscarTipoGasto').value;
    let monto = Number(document.getElementById('buscarMontoGasto').value);
    let resultados = buscarPorGastoTipo(tipo, monto);
    mostrarResultadoBusqueda(resultados);
}

// Función para mostrar los resultados de la búsqueda
function mostrarResultadoBusqueda(resultados) {
    let resultadoBusquedaDiv = document.getElementById('resultadoBusqueda');
    resultadoBusquedaDiv.innerHTML = resultados.map(item => `
        <li>
            <span class="ingreso">Ingresos: ${item.ingresos}</span><br>
            <span class="gasto">Total de Gastos: <span class="gasto-rojo">${item.totalGastos}</span></span><br>
            <span class="${item.presupuestoTotal >= 0 ? 'positivo' : 'negativo'}">Presupuesto Total: ${item.presupuestoTotal}</span><br>
            <div class="historial-gastos">
                ${item.gastos.map(g => `<span>${g.tipo}: ${g.monto}</span>`).join('<br>')}
            </div>
        </li>
    `).join('');
}

// Función para eliminar el historial
function eliminarHistorial() {
    historial = [];
    mostrarHistorial();
    guardarHistorialEnStorage();
}

// Función para eliminar un elemento del historial
function eliminarElementoHistorial(index) {
    historial.splice(index, 1);
    mostrarHistorial();
    guardarHistorialEnStorage();
}

// Función para guardar el historial en el Storage
function guardarHistorialEnStorage() {
    localStorage.setItem('historial', JSON.stringify(historial));
}

// Función para cargar el historial desde el Storage
function cargarHistorialDesdeStorage() {
    let datos = localStorage.getItem('historial');
    if (datos) {
        historial = JSON.parse(datos);
        mostrarHistorial();
    }
}

// Cargar el historial cuando la página se carga
document.addEventListener('DOMContentLoaded', cargarHistorialDesdeStorage);
