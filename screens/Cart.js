import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, SHADOWS } from '../constants';

const Cart = () => {
  const [userId, setUserId] = useState("655bb0c6ea27f694986a2cdd");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://192.168.8.109:3000/api/cart/view_cart/${userId}`
        );
        if (response.ok) {
          const cart = await response.json();
          setCartItems(cart.products);
        } else {
          console.error("Failed to fetch cart:", response.status);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userId]);

  useEffect(() => {
    // Calculate total amount only when cartItems is not empty
    if (cartItems.length > 0) {
      calculateTotalAmount();
    }
  }, [cartItems]);

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.cartItem.price * item.cartItem.quantity;
    });
    setTotalAmount(total);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        'http://192.168.8.109:3000/api/cart/remove_from_cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            productId: productId,
          }),
        }
      );

      if (response.ok) {
        setCartItems((prevCartItems) => {
          const updatedCart = [...prevCartItems.filter(item => item.cartItem._id !== productId)];
          return updatedCart;
        });
      } else {
        console.error('Failed to remove product from cart:', response.status);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    
    <View style={styles.container}>
      {cartItems && cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.cartItem._id}
          renderItem={({ item }) => (
            <View style={styles.cartItem} key={item.cartItem._id}>
              <View style={styles.image}>
                <Image
                  source={{ uri: item.cartItem.imageUrl }}
                  style={styles.productImg}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{item.cartItem.title}</Text>
                <Text style={styles.supplier}>{item.cartItem.supplier}</Text>
                <Text style={styles.supplier}>{item.cartItem.price}</Text>
                <Text style={styles.supplier}>{item.quantity}</Text>
              </View>

              <TouchableOpacity
                onPress={() => handleRemoveFromCart(item.cartItem._id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>Your cart is empty</Text>
      )}

      <Text style={styles.totalAmount}>Total: ${totalAmount.toFixed(2)}</Text>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    shadowColor: COLORS.lightwhite,
    
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.small,
    marginVertical: SIZES.small,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },

  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },

  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },

  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },

  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },

  supplier: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
  },

  emptyMessage: {
    fontSize: 18,
    color: COLORS.red,
    textAlign: "center",
    marginTop: SIZES.medium,
  },

  totalAmount: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
    marginTop: SIZES.medium,
  },
  
  payButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    marginTop: SIZES.medium,
  },
  
  payButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: "bold",
    textAlign: "center",
  },
});

