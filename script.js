function compressIPv6Array(ipv6Array) {
    let compressedIPv6 = ipv6Array
    .map(part => (part.replace(/^0+/, '') || '0')) 
    .join(':'); 

    // Busca y reemplaza bloques consecutivos de ceros solo si hay más de un bloque
    const consecutiveZerosRegex = /((:|^)0(:|$)){2,}/g;
    compressedIPv6 = compressedIPv6.replace(consecutiveZerosRegex, '::');

    return compressedIPv6;
}

function dividirArrayEnDos(array) {
    return array.map(elemento => [elemento.slice(0, 2), elemento.slice(2)]);
}

function resultadoFinal(texto){
    let textoFinal = "";
    let array = texto.split(":");
    console.log(array)
    for(let i = 1; i <= array.length; i++){
        let contadorCeros = 0;
        
        if(array[i-1] == "0"){

            for(let j=i; j <= array.length; j++){
                if(array[j-1] == 0){
                    contadorCeros++;
                }else{
                    break;
                }
            }

            if(contadorCeros > 1){

                textoFinal += ":";
                i = i+contadorCeros;
                i--;

            }else{
                textoFinal += array[i-1];
                textoFinal += ":";
            }

        }else{
            textoFinal += array[i-1];
            textoFinal += ":";
        }
    }
    textoFinal = textoFinal.replace(/:$/, "");
    return textoFinal;

}


document.getElementById('botonProcesar').addEventListener('click', function() {
    const cadena = document.getElementById('inputTexto').value;
    const resultadoElemento = document.getElementById('resultado');
    
    var elementos = cadena.split(".");

    var ultimos16 = elementos.slice(-16);

    var resultado = ultimos16.join(":");
     
     let hexArray = resultado.split(':').map(partes => {
        // Convertir el segmento a decimal y luego a hexadecimal
        const decimalValue = parseInt(partes, 10);
        const hexadecimalValue = decimalValue.toString(16);
        return hexadecimalValue;
      });
      console.log(hexArray);

      for (let i = 1; i <= hexArray.length; i++) {

        if (i%2==0 && hexArray[i-1].length === 1 || i%2==1 && hexArray[i-1] == "0") {
            hexArray[i-1] = "0" + hexArray[i-1];
        }
      }


      let texto = ""
      for(let i = 1; i <= hexArray.length; i++){
        if(i%2==0){
            
            if(i == hexArray.length){
                texto += hexArray[i-1]
            }else{
                texto += hexArray[i-1]
                texto += ":"
            }

        }else{
            texto += hexArray[i-1]
        }
      }
      console.log(texto);
      let arrayTexto = texto.split(":");
      console.log(arrayTexto);

      let arrayDividio = dividirArrayEnDos(arrayTexto);
      console.log(arrayDividio);
      
      const compressedIPv6 = compressIPv6Array(arrayTexto);
      const Ipv6Final = resultadoFinal(compressedIPv6);
      console.log(compressedIPv6)


    resultadoElemento.textContent = 'IPV6: ' + Ipv6Final;
});
  

