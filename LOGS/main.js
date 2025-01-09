function parsearRegistro(registro) {
  const regex = /(\w+ \d+ \d+:\d+:\d+)/;
  const coincidencias = registro.match(regex);

  return coincidencias ? coincidencias[1] : null;
}

function calcularDiferenciaTiempo(inicio, fin, sumarUnaHora) {
  let fechaInicio = new Date(inicio);
  let fechaFin = new Date(fin);

   // Establecer el año actual
   const year = new Date().getFullYear();
   fechaInicio.setFullYear(year);
   fechaFin.setFullYear(year);

  if (sumarUnaHora) {
    fechaInicio.setHours(fechaInicio.getHours() + 2);
    fechaFin.setHours(fechaFin.getHours() + 2);
  }

  console.log(fechaInicio)
  console.log(fechaFin)

  if(fechaInicio.getTime() == fechaFin.getTime()){
    fechaFin.setSeconds(fechaFin.getSeconds() + 1);
  }

  const diferenciaEnMilisegundos = fechaFin - fechaInicio;

  let horas = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
  let minutos = Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
  let segundos = Math.floor((diferenciaEnMilisegundos % (1000 * 60)) / 1000);

  return { fechaInicio, fechaFin, horas, minutos, segundos };
}

function quitarDoblesEspacios(array) {
  return array.map((elemento) => elemento.replace(/\s+/g, ' ').trim());
}

function formatearFecha(fecha) {
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const year = fecha.getFullYear().toString(); 
  return `${dia}/${mes}/${year}`;
}

function corregirFormatoTiempo(indice, horas, minutos, segundos) {

  minutos += Math.floor(segundos / 60);
  segundos %= 60;

  horas += Math.floor(minutos / 60);
  minutos %= 60;

  if(indice > 2){
    let resultado = `<br>TIEMPO TOTAL: <br> <br> ${horas} horas, ${minutos} min, ${segundos} seg`;
    return resultado;
  }else{
    let resultado = "";
    return resultado;
  }
}

function corregirFormatoTiempoMin(indice, minutos, segundos) {

  minutos += Math.floor(segundos / 60);
  segundos %= 60;

    //let resultado = `<br>TIEMPO TOTAL: <br><br> ${minutos} min, ${segundos} seg`;
    let resultado = `${minutos},${segundos}`;
    return resultado;
  
}

function corregirFormatoTiempoSeg(indice, minutos, segundos) {

  segundos += Math.floor(minutos * 60);

    let resultado = `<br>${segundos}`;
    return resultado;
  
}

function obtenerHoraDesdeFecha(fecha) {
  const fechaObj = new Date(fecha);
  
  const horas = fechaObj.getHours();
  const minutos = fechaObj.getMinutes();
  const segundos = fechaObj.getSeconds();

  const horaFormateada = `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;

  return horaFormateada;
}


function pad(numero) {
  return numero < 10 ? '0' + numero : numero;
}


document.getElementById('botonProcesar').addEventListener('click', function () {

  const elementosTdConP = document.querySelectorAll('td > p');

  // Itera sobre cada elemento y borra su contenido
  elementosTdConP.forEach((elementoP) => {
    elementoP.innerHTML = '';
  });

  const textoEntrada = document.getElementById('inputTexto').value;
  const entradasRegistroF = textoEntrada.trim().split('\n');
  let entradasRegistro = quitarDoblesEspacios (entradasRegistroF);

  const checkboxSumarHora = document.getElementById('sumarHora');
  const sumarUnaHora = checkboxSumarHora.checked;
  
  let arrayFechasDown = [];
  let arrayFechasUp = [];
  let arrayFechas = [];

  const fechaDown = document.getElementById('fechaDown');
  const tiempoHoras = document.getElementById('tiempoHoras');
  const tiempoMinutos = document.getElementById('tiempoMinutos');
  const tiempoSegundos = document.getElementById('tiempoSegundos');
  const fechaUp = document.getElementById('fechaUp');
  const horaDown = document.getElementById('horaDown');
  const horaUp = document.getElementById('horaUp');

  let horas = 0; let min = 0; let seg = 0; let minTotal = 0;

  const indice = entradasRegistro.length;

  for (let i = 0; i < entradasRegistro.length; i += 2) {
    let timestampDown = parsearRegistro(entradasRegistro[i]);
    let timestampUp = i + 1 < entradasRegistro.length ? parsearRegistro(entradasRegistro[i + 1]) : null;
    console.log(timestampUp)
    if (timestampDown && timestampUp) {
      
      const diferenciaTiempo = calcularDiferenciaTiempo(timestampDown, timestampUp, sumarUnaHora);
      let fechaInicio = formatearFecha(diferenciaTiempo.fechaInicio)
      let fechaFin = formatearFecha(diferenciaTiempo.fechaFin)
      let fechaInicioFin = `${fechaInicio} - ${fechaFin}:`

      

      let horasInicio = obtenerHoraDesdeFecha(diferenciaTiempo.fechaInicio)
      let horasFin = obtenerHoraDesdeFecha(diferenciaTiempo.fechaFin)


      if (arrayFechasDown.includes(fechaInicio)) {
        horaDown.innerHTML += `${horasInicio} <br>`
        arrayFechasDown.push(fechaInicio);
      }else{
        arrayFechasDown.push(fechaInicio);
        if(i==0){
          //horaDown.innerHTML += fechaInicio + "<br><br>";
        }else{
          //horaDown.innerHTML += "<br><br>" + fechaInicio + "<br><br>";
          
        }
        horaDown.innerHTML += `${horasInicio} <br>`
      }
      
      if (arrayFechasUp.includes(fechaFin)) {
        horaUp.innerHTML += `${horasFin} <br>`
        arrayFechasUp.push(fechaFin);
      }else{
        arrayFechasUp.push(fechaFin);
        if(i==0){
          //horaUp.innerHTML += fechaFin + "<br><br>";
        }else{
          //horaUp.innerHTML += "<br><br>" + fechaFin + "<br><br>";
          
        }
        horaUp.innerHTML += `${horasFin} <br>`
      }

      let horasmin=diferenciaTiempo.horas*60;
      let mostrarMin = horasmin+diferenciaTiempo.minutos;

      horas += diferenciaTiempo.horas; min += diferenciaTiempo.minutos; seg += diferenciaTiempo.segundos; minTotal += mostrarMin;

      if(arrayFechas.includes(fechaInicioFin)){
        tiempoHoras.innerHTML += `${diferenciaTiempo.horas} horas, ${diferenciaTiempo.minutos} min, ${diferenciaTiempo.segundos} seg <br>`;
        //tiempoMinutos.innerHTML += `${mostrarMin} min, ${diferenciaTiempo.segundos} seg <br>`;
      }else{

        arrayFechas += fechaInicioFin;

        if(i==0){
          //tiempoHoras.innerHTML += fechaInicioFin + "<br><br>";
          //tiempoMinutos.innerHTML +=  fechaInicioFin + "<br><br>";
        }else{
          //tiempoHoras.innerHTML += "<br><br>" + fechaInicioFin + "<br><br>";
          //tiempoMinutos.innerHTML += "<br><br>" + fechaInicioFin + "<br><br>";
        }
   
        tiempoHoras.innerHTML += `${diferenciaTiempo.horas} horas, ${diferenciaTiempo.minutos} min, ${diferenciaTiempo.segundos} seg <br>`;
        //tiempoMinutos.innerHTML += `${mostrarMin},${diferenciaTiempo.segundos}<br>`;

      } 

    }
      
  }

  for(let i=0; i< arrayFechasDown.length; i++){
    fechaDown.innerHTML += arrayFechasDown[i] + "<br>";
  }
  for(let i=0; i< arrayFechasUp.length; i++){
    fechaUp.innerHTML += arrayFechasUp[i] + "<br>"
  }

  tiempoHoras.innerHTML += corregirFormatoTiempo(indice, horas,min,seg);
  tiempoMinutos.innerHTML += corregirFormatoTiempoMin(indice, minTotal,seg);
  //tiempoSegundos.innerHTML += corregirFormatoTiempoSeg(indice, minTotal,seg);


});
