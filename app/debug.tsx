import { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { getDBConnection } from '../database/database';

export default function DebugBanco() {
  useEffect(() => {
    const debug = async () => {
      try {
        const db = await getDBConnection();

        const usuarios = await db.getAllAsync('SELECT * FROM usuarios;');
        const agendamentos = await db.getAllAsync('SELECT * FROM agendamentos;');

        console.log('📄 Usuários no banco:', usuarios);
        console.log('📅 Agendamentos no banco:', agendamentos);
      } catch (error) {
        console.error('❌ Erro ao consultar o banco:', error);
      }
    };

    debug();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        ✅ Tela de debug do banco. Verifique o console do Expo.
      </Text>
    </ScrollView>
  );
}
