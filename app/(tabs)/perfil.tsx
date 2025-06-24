//perfil.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
<<<<<<< Updated upstream
import * as ImagePicker from 'expo-image-picker';
import { buscarUsuario, atualizarImagemUsuario } from '../../database/database';
=======
import * as ImagePicker from 'expo-image-picker'; 
import { buscarUsuario } from '../../database/database'; 
>>>>>>> Stashed changes

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuario = await buscarUsuario();
        if (usuario) {
          setNome(usuario.nome);
          setTelefone(usuario.telefone);
          if (usuario.imagem) {
            setImageUri(usuario.imagem); // carrega imagem salva
          }
        }
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
      }
    };

    carregarUsuario();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await atualizarImagemUsuario(uri); // salva no banco
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{nome}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{telefone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});
