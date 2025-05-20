import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

export default function AddItemScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const handleAddItem = () => {
    if (!name || !year || !model || !imageUri) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }

    const novoItem = {
      id: uuid.v4().toString(),
      name,
      year,
      model,
      image: { uri: imageUri },
    };

    Toast.show({
      type: 'success',
      text1: 'Item adicionado',
      text2: `${name} foi adicionado com sucesso!`,
      position: 'bottom',
    });

    // Navega para Home e envia o novo item
    navigation.navigate('Home', { newItem: novoItem });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inner}>
          <View>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/image4.png')} style={styles.logo} />
            </View>

            <LinearGradient
              colors={['#FF2D00', '#FFB800']}
              style={styles.imageCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                ) : (
                  <Text style={styles.imageButtonText}>Toque e escolha imagem</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome aqui"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Ano</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o ano aqui"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Modelo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o modelo aqui"
                value={model}
                onChangeText={setModel}
              />
            </View>
          </View>

          <LinearGradient
            colors={['#FF2D00', '#FFB800']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: '100%' },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
  },
  logoContainer: { alignItems: 'center', marginVertical: 24, width: '100%' },
  logo: { width: 100, height: 100, resizeMode: 'contain' },
  imageCard: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  imageButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  inputBlock: { width: '100%', marginBottom: 18 },
  label: { fontWeight: 'bold', marginBottom: 4, marginTop: 8 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  buttonGradient: {
    width: '100%',
    borderRadius: 12,
    marginTop: 8,
    bottom: 40,
  },
  addButton: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
