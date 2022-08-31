const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=> {

    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
   //Validar

   const pais = document.querySelector('#pais').value;
   const ciudad = document.querySelector('#ciudad').value;

   if(pais === '' || ciudad ===''){
    mostrarMensaje('Todos los campos son obligatorios' ,'error');
    return;
}


    consultarClima(pais, ciudad);
}


function mostrarMensaje(mensaje, tipo) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
          const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    mensajeDiv.innerHTML= `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;

    container.appendChild(mensajeDiv);

    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}
    }

  function consultarClima(pais, ciudad){

    

    const APIkey ='abbeb91ffc0eba81ce4d9da1dd1054cf';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIkey}`;

    Spinner();
    
    fetch(url)
    .then(resultado => resultado.json())
    .then(datos => {
        limpiarHTML();
        if(datos.cod == '404'){
            mostrarMensaje('Ciudad no encontrada');
            return;
        }
        console.log(datos.weather);
        mostrarClima(datos);
    })
  }

  function mostrarClima(datos) {
    
    const {weather: [{ icon }],name ,main:{ temp, temp_min, temp_max} } = datos;

    const centigrado = kelvinaGrados(temp);
    const tempMax = kelvinaGrados(temp_max);
    const tempMin = kelvinaGrados(temp_min);


    const icono = document.createElement("div");
    icono.innerHTML= `<img class="mx-auto" src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
    

    const ciudad = document.createElement('p');
    ciudad.classList.add('text-2xl');
    ciudad.innerHTML=`Temperatura en ${name}`;

    const maxima = document.createElement('p');
    maxima.classList.add('text-xl');
    maxima.innerHTML=`Maxima : ${tempMax} &#8451`;

    const minima = document.createElement('p');
    minima.classList.add('text-xl');
    minima.innerHTML=`Minima : ${tempMin} &#8451`;

    const actual = document.createElement('p');
    actual.classList.add('font-bold', 'text-6xl');
    actual.innerHTML=`${centigrado} &#8451`;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(icono);
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxima);
    resultadoDiv.appendChild(minima);

    resultado.appendChild(resultadoDiv);

  }

  const kelvinaGrados = grados => parseInt(grados- 273.15);

  function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
  }

  function Spinner(){
        limpiarHTML();

        const spinner = document.createElement('div');
        spinner.classList.add('sk-fading-circle');
        spinner.innerHTML= `
        <div class="sk-circle">
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
</div>
`;

resultado.appendChild(spinner);
  }