import React, {useState, useRef} from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() { //componente funcional

/*
Usamos o useState para criar estados para as variáveis base, altura e area, que serão usadas para armazenar os valores dos campos de entrada e o resultado do cáculo da área. 
Usamos useRef para criar a referência baseInputRef, que será usada para manipular o campo de entrada "Base". 
*/
  const [base, setBase] = useState('');
  const [altura, setAltura] = useState('');
  const [area, setArea] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const baseInputRef = useRef(); 

  /*
  A função CalcularArea é responsável por calcular a área do triângulo e manipular os estados das variáveis. Se os valores de base e altura forem maiores que zero, calculamos a área, atualizamos o estado de área, e então limpamos e focamos o campo de entrada "Base". Caso contrário, apenas limpamos o estado de área. E verificamos se ambos os campos estão preenchidos. Caso contrário, enviamos um alerta.
  */
  function CalcularArea() {
    if (base > 0 && altura > 0) {
      const areaCalculada = (parseFloat(base)*parseFloat(altura)) / 2;
      setArea(areaCalculada.toFixed(2).toString());
      setAltura('');
      setBase('');
      baseInputRef.current.clear();
      baseInputRef.current.focus();
      setMensagemErro('')
    } else {
      setMensagemErro("Insira todos os dados!");
      }
    }

 /* 
 Usamos componentes Text para exibir mensagens, TextInput para entrada de dados, e um botão para calcular a área. A referência baseInputRef é atribuida ao campo de entrada "Base". Também exibimos o resultado da área calculada ou uma string vazia, dependendo do estado de área. 
 */
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Insira os dados abaixo para o cálculo da área do triângulo.</Text>
      
      <TextInput
        placeholder="Base"
        style={styles.input}
        keyboardType={'numeric'}
        value={base}
        onChangeText={(base) => setBase(base)}
        ref={baseInputRef} />
      
      <TextInput
        placeholder="Altura"
        style={styles.input}
        keyboardType={'numeric'}
        value={altura}
        onChangeText={(altura) => setAltura(altura)} />

      {mensagemErro ? <Text style={styles.TextoErro}>{mensagemErro}</Text> : null}  
          
      <Button title=" Calcular Área" onPress={CalcularArea} />

      <Text>{area ? `Resultado: ${area}`: ''} </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // Adicionando padding superior para evitar que o conteúdo fique sob a StatusBar
        paddingTop: 30,
        justifyContente: 'center',
      },
      header: {
        marginBottom: 10, // Adicionando margem inferior para separar do TextInput
      },
      input: {
        height: 40,
        textAlign: 'center',
      },
      TextoErro: {
        color: 'red',
        marginTop: 10,
      }
});