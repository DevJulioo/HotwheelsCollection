import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditCarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item;

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setYear(item.year ? String(item.year) : '');
      setModel(item.model || '');

      if (item.image) {
        if (typeof item.image === 'number') {
          setImageSource(item.image); // imagem local via require
        } else if (typeof item.image === 'object' && item.image.uri) {
          setImageSource({ uri: item.image.uri });
        }
      }
    }
  }, [item]);

  const handleSave = () => {
    if (!name || !year || !model) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const updatedItem = {
      ...item,
      name,
      year,
      model,
      image: imageSource,
    };

    Toast.show({
      type: 'success',
      text1: 'Item editado',
      text2: `${name} foi atualizado com sucesso!`,
      position: 'bottom',
    });

    navigation.navigate('Home', { editedItem: updatedItem });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          {/* Logo centralizada */}
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/image4.png')} style={styles.logo} />
          </View>

          {/* Imagem do carro */}
          {imageSource && (
            <View style={styles.imagePreviewContainer}>
              <Image source={imageSource} style={styles.imagePreview} resizeMode="contain" />
            </View>
          )}

          {/* Inputs */}
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nome"
            />

            <Text style={styles.label}>Ano</Text>
            <TextInput
              style={styles.input}
              value={year}
              onChangeText={setYear}
              placeholder="Ano"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Modelo</Text>
            <TextInput
              style={styles.input}
              value={model}
              onChangeText={setModel}
              placeholder="Modelo"
            />
          </View>
        </ScrollView>

        {/* Botão fixo no rodapé */}
        <View style={styles.footer}>
          <LinearGradient
            colors={['#FF2D00', '#FFB800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  keyboardAvoiding: { flex: 1 },
  scrollContent: {
    padding: 16,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imagePreviewContainer: {
    width: '100%',
    height: 180,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  inputBlock: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#fff',
  },
  buttonGradient: {
    width: '100%',
    borderRadius: 12,
    marginTop: 8,
    bottom: 40,
  },
  saveButton: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
