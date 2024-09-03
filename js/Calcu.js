// Inicializar variables globales
let ingresos = 0;
let gastos = [];
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
    mostrarGraficoGastos();
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

// Función para mostrar el gráfico de gastos
function mostrarGraficoGastos() {
    const ctx = document.getElementById('gastosChart').getContext('2d');
    const labels = gastos.map(gasto => gasto.tipo);
    const data = gastos.map(gasto => gasto.monto);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gastos',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para guardar el historial en localStorage
function guardarHistorialEnStorage() {
    localStorage.setItem('historial', JSON.stringify(historial));
}

// Función para cargar el historial desde localStorage
function cargarHistorialDeStorage() {
    const historialGuardado = localStorage.getItem('historial');
    if (historialGuardado) {
        historial = JSON.parse(historialGuardado);
        mostrarHistorial();
    }
}

// Función para eliminar un elemento del historial
function eliminarElementoHistorial(index) {
    historial.splice(index, 1);
    mostrarHistorial();
    guardarHistorialEnStorage();
}

// Función para eliminar todo el historial
function eliminarHistorial() {
    historial = [];
    mostrarHistorial();
    guardarHistorialEnStorage();
}

// Función para buscar en el historial por ingresos
function buscarPorIngresosHandler() {
    const ingresosBuscados = Number(document.getElementById('buscarIngresos').value);
    const resultado = historial.filter(item => item.ingresos === ingresosBuscados);
    mostrarResultadosBusqueda(resultado);
}

// Función para buscar en el historial por tipo de gasto y monto
function buscarPorGastoTipoHandler() {
    const tipoGastoBuscado = document.getElementById('buscarTipoGasto').value;
    const montoBuscado = Number(document.getElementById('buscarMontoGasto').value);
    const resultado = historial.filter(item =>
        item.gastos.some(gasto => gasto.tipo === tipoGastoBuscado && gasto.monto === montoBuscado)
    );
    mostrarResultadosBusqueda(resultado);
}

// Función para mostrar los resultados de búsqueda
function mostrarResultadosBusqueda(resultado) {
    let resultadoBusquedaDiv = document.getElementById('resultadoBusqueda');
    resultadoBusquedaDiv.innerHTML = resultado.map(item => `
        <li>
            <span class="ingreso">Ingresos: ${item.ingresos}</span><br>
            <span class="gasto">Total de Gastos: ${item.totalGastos}</span><br>
            <span class="${item.presupuestoTotal >= 0 ? 'positivo' : 'negativo'}">Presupuesto Total: ${item.presupuestoTotal}</span><br>
            <div class="historial-gastos">
                ${item.gastos.map(g => `<span>${g.tipo}: ${g.monto}</span>`).join('<br>')}
            </div>
        </li>
    `).join('');
}

// Cargar historial desde localStorage al inicio
window.onload = cargarHistorialDeStorage;
