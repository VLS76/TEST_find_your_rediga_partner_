const personas = [
    {
        id: "persona1",
        nombre: "Ana García",
        especie: ["Ovina", "Vacuna"],
        dispositivo: ["Drones", "RFID", "Cámaras de visión"],
        estudio: ["Comportamiento alimenticio", "Manejo"],
        proyecto: ["Project1", "Project3"]
    },
    {
        id: "persona2",
        nombre: "Luis Fernández",
        especie: ["Porcina", "Avícola"],
        dispositivo: ["Alimentadores automáticos", "IA", "Sensores acústicos"],
        estudio: ["Nutrición", "Salud"],
        proyecto: ["Project2", "Project4"]
    },
    {
        id: "persona3",
        nombre: "Marta López",
        especie: ["Caprina", "Cunícula"],
        dispositivo: ["Collares", "Básculas", "Sensores de movimiento"],
        estudio: ["Comportamiento social", "Manejo"],
        proyecto: ["Project1", "Project2"]
    },
    {
        id: "persona4",
        nombre: "Carlos Ruiz",
        especie: ["Vacuna", "Porcina"],
        dispositivo: ["RFID", "Vallados virtuales", "IA"],
        estudio: ["Salud", "Comportamiento alimenticio"],
        proyecto: ["Project3", "Project4"]
    },
    {
        id: "persona5",
        nombre: "Elena Díaz",
        especie: ["Avícola", "Ovina"],
        dispositivo: ["Drones", "Cámaras de visión", "Collares"],
        estudio: ["Nutrición", "Comportamiento social"],
        proyecto: ["Project1", "Project4"]
    }
];

const selectedFilters = {
    especie: [],
    dispositivo: [],
    estudio: [],
    proyecto: []
};

function updatePersonCloud() {
    const personCloud = document.getElementById('person-cloud');
    personCloud.innerHTML = ''; // Limpiar la nube de personas
    const noResultsMessage = document.getElementById('no-results');
    let foundPersons = [];

    // Filtrar personas
    personas.forEach(person => {
        let matchesAllFilters = true;

        for (const category in selectedFilters) {
            const selectedIndicators = selectedFilters[category];
            if (selectedIndicators.length > 0) { // Solo si hay filtros seleccionados en esta categoría
                // Comprobar si la persona tiene al menos UNO de los indicadores seleccionados en esta categoría
                const personIndicators = person[category];
                const hasMatchingIndicator = selectedIndicators.some(indicator =>
                    personIndicators.includes(indicator)
                );
                if (!hasMatchingIndicator) {
                    matchesAllFilters = false;
                    break; // No es necesario revisar más categorías para esta persona
                }
            }
        }

        if (matchesAllFilters) {
            foundPersons.push(person);
        }
    });

    if (foundPersons.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
        foundPersons.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';
            card.textContent = person.nombre;

            // Opcional: Mostrar algunos de los indicadores seleccionados en la tarjeta
            const indicatorsList = document.createElement('span');
            let displayedIndicators = [];

            if (selectedFilters.especie.length > 0) displayedIndicators.push(`Especie: ${selectedFilters.especie.join(', ')}`);
            if (selectedFilters.dispositivo.length > 0) displayedIndicators.push(`Dispositivos: ${selectedFilters.dispositivo.join(', ')}`);
            if (selectedFilters.estudio.length > 0) displayedIndicators.push(`Estudio: ${selectedFilters.estudio.join(', ')}`);
            if (selectedFilters.proyecto.length > 0) displayedIndicators.push(`Proyectos: ${selectedFilters.proyecto.join(', ')}`);
            
            if (displayedIndicators.length > 0) {
                 indicatorsList.textContent = displayedIndicators.join(' | ');
                 card.appendChild(indicatorsList);
            }
           
            personCloud.appendChild(card);
        });
    }
}


// Event Listeners para los checkboxes
document.querySelectorAll('.panel input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const category = event.target.name;
        const value = event.target.value;

        if (event.target.checked) {
            selectedFilters[category].push(value);
        } else {
            selectedFilters[category] = selectedFilters[category].filter(item => item !== value);
        }
        updatePersonCloud();
    });
});

// Lógica para los desplegables (acordeón)
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    accordion.addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// Inicializar la nube de personas al cargar la página
document.addEventListener('DOMContentLoaded', updatePersonCloud);