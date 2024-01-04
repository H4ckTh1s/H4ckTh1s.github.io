

// Mostrar el resultado
//console.log(resultado);

function convertirIpv6(cadena) {
    
     // Dividir la cadena por puntos y convertir cada fragmento a hexadecimal
  let hexArray = cadena.split(':').map(partes => {
    // Convertir el segmento a decimal y luego a hexadecimal
    const decimalValue = parseInt(partes, 10);
    const hexadecimalValue = decimalValue.toString(16);
    return hexadecimalValue;
  });
  //console.log(hexArray);
  let arrayFinal = [];

  for(let i = 1; i <= hexArray.length;i++){
    if(i%2 == 1){
        if(hexArray[i-1] == 0){
            let contadorCeros = 0;
            for(let j=i; j <= hexArray.length; j++){
                if(hexArray[j-1] == 0){
                    contadorCeros++;
                }else{
                    break;
                }
            }

            if (contadorCeros >= 4){

                if(contadorCeros %2 == 0){
                    i=i+contadorCeros;
                    i--;
                }else{
                    let calc = contadorCeros - 1;
                    i=i+calc;
                    i--;
                }
            
                arrayFinal.push(":");

            }else if(contadorCeros == 1){

            }else{
                arrayFinal.push("0");
                i=i+2;
                i--;
            } 

        }else{
            arrayFinal.push(hexArray[i-1]);
        }


    }else{
        if(hexArray[i-1] == 0){
            arrayFinal.push("00");
        }else{
            arrayFinal.push(hexArray[i-1]);
        }
    }

  }

  let cadenaFinal = "";

  for(i=1; i <= arrayFinal.length; i++){

    if(i%2 == 0){

        cadenaFinal += arrayFinal[i-1];
        cadenaFinal += ":";

    }else{
        cadenaFinal += arrayFinal[i-1];
    }

    if(arrayFinal[i-1] == "0"){
        cadenaFinal += ":";
    }
    

  }

  const result = cadenaFinal;

  return result;

}
  

document.getElementById('botonProcesar').addEventListener('click', function() {
    const cadena = document.getElementById('inputTexto').value;
    const resultadoElemento = document.getElementById('resultado');
    
    // Dividir la cadena en un array usando el punto como separador
    var elementos = cadena.split(".");

    // Seleccionar los últimos 16 elementos
    var ultimos16 = elementos.slice(-16);

    // Unir los elementos con el separador punto
    var resultado = ultimos16.join(":");
    var resultadoHexadecimal = convertirIpv6(resultado);

    resultadoElemento.textContent = 'IPV6: ' + resultadoHexadecimal;
});
  