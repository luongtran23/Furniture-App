import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import styles from './productCardView.style';
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

// Trong ProductCardView
const ProductCardView = ({ item, addToCart }) => {
    // Nhận hàm addToCart như một prop
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { item })}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.supplier} numberOfLines={1}>
              {item.supplier}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(item)} // Gọi hàm addToCart khi bấm vào add-circle
          >
            <Ionicons name="add-circle" size={35} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  

export default ProductCardView

