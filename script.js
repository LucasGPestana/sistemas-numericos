function acionar() {

  let conversor = window.document.querySelector('select#conversao-bases')
  let numero = window.document.querySelector('input#numero')
  let resposta = window.document.querySelector('input#resposta')

  if (numero.value != "") {

    converter(numero, conversor, resposta)

  } else {
    window.alert("Por favor, digite um valor no devido campo!")
  }

}

function converter(numero, conversor, resposta) {

  let alfabeto_binario = ["0", "1"]
  let alfabeto_decimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  let valido = false // Verifica se todos os caracteres do número estão inclusos no alfabeto

  console.log(conversor.value)

  if (conversor.value == "BIN para DEC") {
    for (let caractere of numero.value) {
      if (alfabeto_binario.includes(caractere)) valido = true
      else valido = false
    }
    if (valido) {
      resposta.value = converterBinDec(numero.value)
    } else {
      window.alert("Algum dos caracteres não faz parte do alfabeto binário")
    }
  } else {
    if (conversor.value == "DEC para BIN") {
      for (let caractere of numero.value) {
        if (alfabeto_decimal.includes(caractere)) valido = true
        else valido = false
      }
      if (valido) {
        resposta.value = converterDecBin(numero.value)
      } else {
        window.alert("Algum dos caracteres não faz parte do alfabeto decimal")
      }
    }
    else {
      if (conversor.value == "BIN para HEX") {
        for (let caractere of numero.value) {
          console.log(caractere)
          if (alfabeto_binario.includes(caractere)) valido = true
          else valido = false
        }
        console.log(valido)
        if (valido) {
          resposta.value = converterBinHex(numero.value)
        } else {
          window.alert("Algum dos caracteres não faz parte do alfabeto binário")
        }
      } else {
        window.alert("Opção inválida!")
      }
    }
  }
}

const converterBinDec = ((numero_bin) => {

  let acumulador = 0
  let bits = new Array()

  for (let bit of numero_bin) {
    bits.push(Number(bit))
  }

  bits.reverse()

  bits.forEach((bit, casa) => {
    acumulador += bit * Math.pow(2, casa)
  })

  const numero_dec = acumulador

  return numero_dec

})

const converterDecBin = ((numero_dec) => {

  bits = new Array()

  while (numero_dec != 0) {
    bits.push(numero_dec % 2)
    numero_dec /= 2
    numero_dec = Math.trunc(numero_dec)
  }

  bits.reverse()

  const numero_bin = Number(bits.join(""))

  return numero_bin

})

const converterBinHex = ((numero_bin) => {
  let bits = new Array()
  let four_bits = new Array() // Funciona similarmente a uma matriz, ou seja, um array com subarrays, onde cada um desses subarrays tem 4 elementos

  for (let bit of numero_bin) {
    bits.push(Number(bit))
  }

  bits.reverse()

  while (bits.length % 4 != 0) { // Adiciona zeros até que o tamanho do Array bits seja divisível por 4
    bits.push(0)
  }

  for (let i = 0; i < bits.length; i = i + 4) { // Como um caractere hexadecimal representa 4 bits, os incrementos são feitos de 4 em 4
    four_bits.push([bits[i], bits[i + 1], bits[i + 2], bits[i + 3]]) // Adiciona um subarray ao Array four_bits com elementos de um bit e seus 3 bits (elementos) seguintes
  }

  let acumulador = new Array(four_bits.length) // Cria um Array com o tamanho de four_bits para representar cada caractere hexadecimal
  acumulador.fill(0) // Adiciona zeros a todos os elementos do Array acumulador

  console.log(four_bits)
  console.log(acumulador)

  four_bits.forEach((bits4, conj) => { // Percorre o Array four_bits, onde cada elemento desse Array é bits4, e conj é a posição que a iteração está no Array

    let soma = 0 // Funciona como o acumulador

    for (let casa = 0; casa < bits4.length; casa++) {
      soma += bits4[casa] * Math.pow(2, casa)
    }

    acumulador[conj] = soma

  })

  // Converter números para o alfabeto hexadecimal
  for (let i = 0; i < acumulador.length; i++) {
    if (acumulador[i] == 10) {
      acumulador[i] = 'A'
    } else {
      if (acumulador[i] == 11) {
        acumulador[i] = 'B'
      } else {
        if (acumulador[i] == 12) {
          acumulador[i] = 'C'
        } else {
          if (acumulador[i] == 13) {
            acumulador[i] = 'D'
          } else {
            if (acumulador[i] == 14) {
              acumulador[i] = 'E'
            } else {
              if (acumulador[i] == 15) {
                acumulador[i] = 'F'
              } else {
                acumulador[i] = String(acumulador[i]) // Converte um número que não se inclui nos casos acima para string
              }
            }
          }
        }
      }
    }
  }

  acumulador.reverse() // Reverte a ordem de acumulador

  const numero_hex = acumulador.join("") // junta os elementos em uma string sem espaços entre eles

  return numero_hex
})