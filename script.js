/* ... (todo el CSS anterior se mantiene) ... */

.main-content {
    flex-grow: 1;
    padding: 20px;
    box-sizing: border-box;
    display: flex; /* Añadir flexbox para centrar y manejar el contenido */
    flex-direction: column;
}

.network-container {
    flex-grow: 1; /* Permitir que ocupe el espacio restante */
    width: 100%;
    min-height: 400px; /* Altura mínima para la red */
    border: 1px solid #ccc;
    background-color: #fcfcfc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    margin-top: 20px; /* Separación del título */
    position: relative; /* Necesario para que vis.js funcione bien */
}

/* Ocultar la nube de personas antigua */
.person-cloud {
    display: none;
}

.no-results {
    text-align: center;
    color: #666;
    font-size: 1.1em;
    margin-top: 20px; /* Ajuste para el nuevo contenedor */
    flex-shrink: 0; /* Evitar que se encoja */
}

/* Ajustes para dispositivos móviles si es necesario */
@media (max-width: 768px) {
    /* ... (tus estilos responsive anteriores) ... */
    .network-container {
        min-height: 300px; /* Ajuste de altura para móviles */
    }
}