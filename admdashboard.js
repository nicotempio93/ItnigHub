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

async function addDefinicion(titulo, descripcion) {
    try {
        const definicion = { titulo, descripcion };
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
