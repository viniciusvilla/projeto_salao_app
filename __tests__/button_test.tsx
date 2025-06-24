//projeto_slao_app/_tests_/button_test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '../components/button';

describe('Componente Button', () => {
  it('renderiza o título corretamente', () => {
    const { getByText } = render(
      <Button title="Confirmar" onPress={() => {}} />
    );
    expect(getByText('Confirmar')).toBeTruthy();
  });
});

/*

 Este teste verifica se o componente Button renderiza corretamente o texto passado na prop `title`.
 Ou seja, ao usar <Button title="Confirmar" />, o teste confirma que o texto "Confirmar" aparece na tela.
 Isso garante que o título do botão seja exibido exatamente como foi passado, 
 ajudando a evitar erros de renderização ou textos incorretos.
 Pode ser facilmente adaptado para testar outros títulos, como "Cadastrar", "Sair", etc.

*/