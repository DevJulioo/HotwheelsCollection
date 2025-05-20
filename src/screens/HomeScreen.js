import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CollectionItem from '../components/CollectionItem';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const initialData = [
  {
    id: '1',
    name: 'Twin Mill',
    year: 1889,
    model: 'Modelo A',
    image: require('../../assets/images/image5.png'),
  },
  {
    id: '2',
    name: 'Twin Mill',
    year: 1889,
    model: 'Modelo B',
    image: require('../../assets/images/image-removebg-preview1.png'),
  },
  {
    id: '3',
    name: 'Twin Mill',
    year: 1889,
    model: 'Modelo C',
    image: require('../../assets/images/image6.png'),
  },
  {
    id: '4',
    name: 'Twin Mill',
    year: 1889,
    model: 'Modelo D',
    image: require('../../assets/images/image9.png'),
  },
];

const keyExtractor = (item) => item.id;

export default function HomeScreen() {
  const [items, setItems] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.newItem) {
        setItems(prevItems => [...prevItems, route.params.newItem]);
        Toast.show({
          type: 'success',
          text1: 'Novo item adicionado!',
          text2: `${route.params.newItem.name} foi adicionado.`,
          position: 'bottom',
        });
        navigation.setParams({ newItem: null });
      }
      if (route.params?.editedItem) {
        setItems(prevItems => {
          const index = prevItems.findIndex(i => i.id === route.params.editedItem.id);
          if (index !== -1) {
            const updated = [...prevItems];
            updated[index] = route.params.editedItem;
            return updated;
          } else {
            return [...prevItems, route.params.editedItem];
          }
        });
        Toast.show({
          type: 'success',
          text1: 'Item editado!',
          text2: `${route.params.editedItem.name} foi atualizado.`,
          position: 'bottom',
        });
        navigation.setParams({ editedItem: null });
      }
    }, [route.params?.newItem, route.params?.editedItem, navigation])
  );

  const handleEdit = useCallback(
    (item) => navigation.navigate('EditCar', { item }),
    [navigation]
  );

  const confirmDelete = useCallback((item) => {
    setItemToDelete(item);
    setModalVisible(true);
  }, []);

  const cancelDelete = useCallback(() => {
    setItemToDelete(null);
    setModalVisible(false);
  }, []);

  const handleDelete = useCallback(() => {
    setItems(prevItems => prevItems.filter(i => i.id !== itemToDelete.id));
    Toast.show({
      type: 'success',
      text1: 'Item excluído',
      text2: `${itemToDelete.name} foi removido.`,
      position: 'bottom',
    });
    setModalVisible(false);
    setItemToDelete(null);
  }, [itemToDelete]);

  const renderItem = useCallback(
    ({ item }) => (
      <CollectionItem
        item={item}
        onEdit={() => handleEdit(item)}
        onDelete={() => confirmDelete(item)}
        onPressImage={() => navigation.navigate('CarDetail', { item })}
      />
    ),
    [handleEdit, confirmDelete, navigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/image4.png')} style={styles.logo} />
        </View>

        <FlatList
          data={items}
          extraData={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ paddingBottom: 16 }}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={21}
        />

        <LinearGradient
          colors={['#FF2D00', '#FFB800']}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddItem')}
          >
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Deseja realmente excluir este item?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelDelete}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-start' },
  content: {
    flex: 1,
    marginTop: 12,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    justifyContent: 'flex-start',
  },
  headerContainer: { width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  logo: { width: 89, height: 100, resizeMode: 'contain' },
  buttonGradient: { width: '100%', borderRadius: 12, marginTop: 8, alignSelf: 'center', bottom: 40 },
  addButton: { paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: 280, alignItems: 'center' },
  modalText: { fontSize: 18, marginBottom: 24, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 8, marginHorizontal: 8, alignItems: 'center' },
  deleteButton: { backgroundColor: '#FF2D00' },
  cancelButton: { backgroundColor: '#888' },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});
