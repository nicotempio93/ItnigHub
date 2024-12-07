// Importa la base de datos desde el archivo de configuración
import { db } from '/config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Elementos del DOM
const preguntasInput = document.querySelector("#preguntas");
const conceptoContainer = document.querySelector("#conceptoContainer");
const temaSelect = document.querySelector("#tema");
const peticionInput = document.querySelector("#conceptosNuevos");
const preguntaContainer = document.querySelector("#preguntasContainer");
const preguntasList = document.querySelector("#preguntasList");
const tituloInput = document.querySelector("#nuevoConceptoTitulo");
const definicionInput = document.querySelector("#nuevoConceptoDefinicion");

// Función para cargar los conceptos y definiciones desde la base de datos
async function cargarConceptos() {
    try {
        const snapshot = await getDocs(collection(db, "Conceptos"));
        conceptoContainer.innerHTML = "";

        snapshot.forEach(doc => {
            const concepto = doc.data();
            const conceptoHTML = `
                <div class="definicion">
                    <h3>${concepto.titulo}</h3>
                    <p>${concepto.descripcion}</p>
                </div>
            `;
            conceptoContainer.innerHTML += conceptoHTML;
        });
    } catch (error) {
        console.error("Error al cargar conceptos:", error);
    }
}


// Funcion para cargar preguntas

async function cargarPreguntas() {
    try {
        const snapshot = await getDocs(collection(db, "Preguntas")); // Obtenemos la colección "Preguntas"
        preguntasList.innerHTML = ""; // Limpiamos el contenedor antes de agregar las preguntas

        snapshot.forEach(doc => {
            const pregunta = doc.data(); // Obtenemos los datos de cada documento
            const preguntaHTML = `
                <div class="pregunta">
                    <p>${pregunta.text}</p> <!-- Muestra el texto de la pregunta -->
                    <span class="tag">${pregunta.tema}</span> <!-- Muestra el tema de la pregunta -->
                </div>
            `;
            preguntasList.insertAdjacentHTML("beforeend", preguntaHTML); // Añadimos el HTML al contenedor
        });
    } catch (error) {
        console.error("Error al cargar preguntas:", error);
    }
}


// Llamamos a la funcion para cargar conceptos y preguntas
window.onload = () => {
    cargarConceptos();
    cargarPreguntas();
};
 

// Función para insertar un elemento en la base de datos
async function insert(nombreColeccion, item) {
    try {
        const response = await addDoc(collection(db, nombreColeccion), item);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

// Escucha el evento submit/click y ejecuta la función addPregunta
formPreguntas.addEventListener("submit", e => {
    e.preventDefault();
    const text = preguntasInput.value;
    const tema = temaSelect.value;

    if (text !== '') {
        addPregunta(text, tema);
    }
});

// Función que toma el texto del input y llama a la función insert para guardar pregunta en la db
async function addPregunta(text, tema) {
    try {
        const pregunta = { text, tema };
        const response = await insert("Preguntas", pregunta);
        alert("Tu pregunta se envió correctamente!");
        preguntasInput.value = '';
        temaSelect.value = 0;
    } catch (error) {
        console.error("Error al guardar la pregunta:", error);
        alert("Hubo un error al enviar la pregunta. Por favor, intenta de nuevo.");
    }
}

// Función para añadir una petición de concepto
async function addPeticion(concepto) {
    try {
        const peticion = { concepto };
        const response = await insert("Peticion conceptos", peticion);
        alert("Tu petición se envió correctamente!");
        peticionInput.value = '';
    } catch (error) {
        console.error("Error al guardar la petición:", error);
        alert("Hubo un error al enviar la petición. Por favor, intenta de nuevo.");
    }
}

// Evento submit para la nueva petición de concepto

// Evento submit del nuevo concepto para agregar
const formAgregarDefinicion = document.querySelector("#formAgregarDefinicion");

formAgregarDefinicion.addEventListener("submit", e => {
    e.preventDefault();
    console.log("Formulario de definición enviado");

    const titulo = tituloInput.value;
    const definicion = definicionInput.value;

    if (titulo && definicion) {
        addDefinicion(titulo, definicion);
    } else {
        console.log("Faltan datos");
    }
});

async function addDefinicion(titulo, definicionText) {
    try {
        const definicion = { titulo, definicionText };
        const response = await insert("Conceptos", definicion); // Asumiendo que insert es una función definida en otro lado
        console.log("Definición agregada: ", response);
        alert("Definición agregada con éxito");
        definicionInput.value = '';
        tituloInput.value = '';
    } catch (error) {
        console.error("Error al guardar la nueva definición", error);
        alert("Hubo un error al enviar la definición.");
    }
}
