import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export default function CarDetailScreen({ route, navigation }) {
  const item = route.params?.item;

  // Extrai o ano do item, que pode ser string ISO ou número simples
  const getYear = () => {
    if (!item?.year) return '';
    if (typeof item.year === 'string' && item.year.includes('-')) {
      return new Date(item.year).getFullYear();
    }
    return item.year; // se for número ou string simples
  };
  const displayYear = getYear();

  // Define fonte da imagem: pode ser URI ou local (require)
  const imageSource = (() => {
    if (!item?.imgUrl && !item?.image) return null;
    // Prioriza imgUrl como string
    if (item.imgUrl && typeof item.imgUrl === 'string') return { uri: item.imgUrl };
    // Usa image que pode ser local (número) ou objeto {uri}
    if (item.image) {
      if (typeof item.image === 'number') return item.image;
      if (typeof item.image === 'object' && item.image.uri) return { uri: item.image.uri };
    }
    return null;
  })();

  return (
    <View style={styles.container}>
      {/* Logo centralizada no topo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/image4.png')}
          style={styles.logo}
        />
      </View>

      {/* Bloco central: imagem do carro + textos, centralizado verticalmente */}
      <View style={styles.centerBlock}>
        {imageSource ? (
          <Image source={imageSource} style={styles.carImage} resizeMode="contain" />
        ) : (
          <View style={[styles.carImage, styles.imagePlaceholder]}>
            <Text style={{ color: '#999' }}>Sem imagem</Text>
          </View>
        )}
        <View style={styles.infoBox}>
          <Text style={styles.carName}>{item?.name || 'Sem nome'}</Text>
          <Text style={styles.carYear}>{displayYear}</Text>
          <Text style={styles.carBrand}>Hot Wheels</Text>
        </View>
      </View>

      {/* Botão para fechar */}
      <LinearGradient
        colors={['#FF2D00', '#FFB800']}
        style={styles.buttonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>Fechar Detalhes</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  centerBlock: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImage: {
    width: '80%',
    height: height * 0.22,
    marginBottom: 10,
    borderRadius: 12,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  infoBox: {
    alignItems: 'flex-start',
    width: '90%',
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  carYear: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  carBrand: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  buttonGradient: {
    width: '100%',
    borderRadius: 12,
    marginTop: 8,
    bottom: 40,
  },
  closeButton: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
