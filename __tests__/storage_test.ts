//__tests__/storage_test.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

describe('AsyncStorage', () => {
  it('deve salvar e recuperar um valor', async () => {
    await AsyncStorage.setItem('usuario', 'jojo');
    const valor = await AsyncStorage.getItem('usuario');
    expect(valor).toBe('jojo');
  });
});


/*
  Este teste verifica o funcionamento básico do AsyncStorage no app.

  Passos do teste:
  1. Salva o valor 'jojo' na chave 'usuario' usando AsyncStorage.setItem.
  2. Recupera o valor salvo da chave 'usuario' com AsyncStorage.getItem.
  3. Verifica se o valor recuperado é exatamente 'jojo'.

  Isso garante que o AsyncStorage está funcionando corretamente para salvar e ler dados,
  fundamental para persistência local de informações no app.

  Caso esse teste passe, indica que o armazenamento local está operando como esperado.
*/
