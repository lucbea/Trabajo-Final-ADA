//Llamados de HTML
let $total = document.getElementById('total'); //Llamo quien va a contener los datos
let $mujeresB = document.getElementById('mujeres'); //boton mujeres
let $hombresB = document.getElementById('hombres'); //boton hombres
let $genderlessB = document.getElementById('genderless'); //boton genderless
let $unknownB = document.getElementById('unknown'); //boton unknown
let $todosB = document.getElementById('todos'); //boton todos
let $iniB = document.getElementById('ini'); //boton primera página
let $antB = document.getElementById('ant'); //boton  página anterior
let $sigB = document.getElementById('sig'); //boton página siguiente
let $finB = document.getElementById('fin'); //boton última página
let $cantPer = document.getElementById('cantPer'); //cantidad de personajes
let $otraInfoPag = document.getElementById('otraInfoPag'); //otra información de paginado
let $pageInput = document.getElementById('pageInput'); //ingresar una página a elección
let $resultSpan = document.getElementById('result'); 

//Variables
let todosPersonajes = [];
let numeroPagina = 1;

// extracción de datos de sitio web ->
function usarFetch(numeroPagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${numeroPagina}`)
        .then(function (data) {
            return (data.json());
        })  //function flecha
        .then((data) => {
            todosPersonajes = data.results;
            mostrar(todosPersonajes);
        })
        .catch(function (error) { console.log(error) })
};
usarFetch(numeroPagina);

//area de funciones
//funcion que muestra los personajes que recibe a través del array personajes
function mostrar(personajes) {
    deshabilitarB(numeroPagina);
    let cantidadPersonajes = personajes.length;
    $cantPer.innerHTML = `<p >Cantidad de personajes: ${cantidadPersonajes}</p>`;
    $total.innerHTML = '';
    //   <div id="total"> </div>
    for (let i = 0; i <personajes.length; i++) {
        $total.innerHTML += `<div id="contenidoPersonaje">
                                <div id="imagen">
                                     <img src="${personajes[i].image}" alt="imagen">
                                </div>
                                <div id= "datos">
                                    <p id="nomb">Nombre: ${personajes[i].name}</p>
                                    <p>Género: ${personajes[i].gender}</p>
                                    <p>Especie: ${personajes[i].species}</p>
                                    <p>Estado: ${personajes[i].status}</p>
                                    <p>Origen: ${personajes[i].origin.name}</p>
                                    <p>Locación: ${personajes[i].location.name}</p>
                                    <div id="otrosDatos${i+1}"  class="oculto">
                                        <p>Creación: ${personajes[i].created}</p>
                                        <p>Primer episodio: ${personajes[i].episode[0]}</p>
                                    </div>                          
                                </div>
                                    <div id="mas">
                                        <button id="botonMas${i+1}" onclick="mostrarMas(${i+1})" >Más info</button>
                                    </div>                                    
                                </div>`
    };
    $otraInfoPag.innerHTML = `<p>Total de páginas: 42</p>
                              <p>Página actual: ${numeroPagina} </p>` ;
};

//funcion boton más info de cada personaje
function mostrarMas(id){
    let divAMostrar = document.getElementById(`otrosDatos${id}`);
        if (divAMostrar.classList.contains('oculto')) {
        divAMostrar.classList.add('visible');
        divAMostrar.classList.remove ('oculto');
    }
    else{
        divAMostrar.classList.add('oculto');
        divAMostrar.classList.remove ('visible');
    }
};

//funciones paginado
function deshabilitarB(numeroPagina) {
    if (numeroPagina === 1) {
        console.log('estoy en página 1 deshabilito los dos primeros botones y habilito los dos últimos');
        $antB.disabled = true;
        $iniB.disabled = true;
        $sigB.disabled = false;
        $finB.disabled = false;
    } else {
        if (numeroPagina === 42) {
            console.log('estoy en página 42, deshabilito los dos últimos botones y habilito los anteriores');
            $antB.disabled = false;
            $iniB.disabled = false;
            $sigB.disabled = true;
            $finB.disabled = true;
        } else {
            console.log('habilito todos los botones')
            $antB.disabled = false;
            $iniB.disabled = false;
            $sigB.disabled = false;
            $finB.disabled = false;
        }
    }
}

function inicioPagina() {
    numeroPagina = 1;
    console.log(numeroPagina, 'func inicioPag, queres ir a primera página');
    deshabilitarB(numeroPagina);
    usarFetch(numeroPagina);
}
function anteriorPagina() {
    numeroPagina--;
    console.log(numeroPagina, 'queres ir a pagina anterior');
    deshabilitarB(numeroPagina);
    usarFetch(numeroPagina);
};
function siguientePagina() {
    numeroPagina++;
    console.log(numeroPagina, 'queres ir a página siguiente');
    deshabilitarB(numeroPagina);
    usarFetch(numeroPagina);
};
function finalPagina() {
    numeroPagina = 42;
    console.log(numeroPagina, 'func finalPag,queres ir a la última página');
    deshabilitarB(numeroPagina);
    usarFetch(numeroPagina);
}

//funciones botones de género
function mostrarMujeres() {
    let resultado = todosPersonajes.filter((personaje) => {
        return personaje.gender === 'Female';
    })
    mostrar(resultado);
};
function mostrarHombres() {
    let resultado = todosPersonajes.filter((personaje) => {
        return personaje.gender === 'Male';
    })
    mostrar(resultado);
};
function mostrarTodos() {
    let resultado = todosPersonajes;
    mostrar(resultado);
};
function mostrarGenderless() {
    let resultado = todosPersonajes.filter((personaje) => {
        return personaje.gender === 'Genderless';
    })
    mostrar(resultado);
};
function mostrarUnknown() {
    let resultado = todosPersonajes.filter((personaje) => {
        return personaje.gender === 'unknown';
    })
    mostrar(resultado);
};

// eventos botones de género
$todosB.addEventListener('click', mostrarTodos)
$mujeresB.addEventListener('click', mostrarMujeres);
$hombresB.addEventListener('click', mostrarHombres);
$genderlessB.addEventListener('click', mostrarGenderless);
$unknownB.addEventListener('click', mostrarUnknown);

//eventos paginado
$iniB.addEventListener('click', inicioPagina);
$antB.addEventListener('click', anteriorPagina);
$sigB.addEventListener('click', siguientePagina);
$finB.addEventListener('click', finalPagina);

//Para ingresar un número de página a elección
// Agrega evento input al campo de entrada
$pageInput.addEventListener('keydown', (event) => {
    // Obtiene el número ingresado  
    if (event.key === 'Enter') {
        event.preventDefault();
        const irAPage = parseFloat($pageInput.value);
        const irAPageTrunc = Math.trunc(irAPage);
        //Verifica si es un número de página válido
        if (irAPage>0 && irAPage<43 && irAPage === irAPageTrunc) {
            numeroPagina = irAPage;
            usarFetch(numeroPagina);
            $resultSpan.textContent = ''; 
            $pageInput.value = "";
        } else { if (irAPage) {
                                $pageInput.value = "";
                              };
                $pageInput.value = "";  
        };
    }
});

  