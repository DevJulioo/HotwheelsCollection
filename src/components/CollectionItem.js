import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function CollectionItem({ item, onEdit, onDelete, onPressImage }) {
  if (!item) return null;

  const displayYear =
    typeof item.year === 'string' || typeof item.year === 'number'
      ? String(item.year).substring(0, 4)
      : 'Ano desconhecido';

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={onPressImage}
        accessibilityRole="imagebutton"
        accessibilityLabel={`Imagem do carro ${item.name}`}
      >
        <Image source={item.image} style={styles.itemImage} />
      </TouchableOpacity>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemYear}>{displayYear}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onEdit}
          accessibilityRole="button"
          accessibilityLabel={`Editar ${item.name}`}
        >
          <Image
            source={require('../../assets/images/2.png')} // botão editar
            style={styles.iconImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { marginLeft: 4 }]}
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={`Excluir ${item.name}`}
        >
          <Image
            source={require('../../assets/images/1.png')} // botão excluir
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(CollectionItem);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 2,
    elevation: 1,
  },
  itemImage: {
    width: 97,
    height: 97,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemYear: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
  },
  iconImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
