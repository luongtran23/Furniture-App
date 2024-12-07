import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import ProductCardView from "./productCardView";
import styles from "./productCardView.style";
import useFetch from "../../hook/useFetch";

// Trong ProductRow
const ProductRow = () => {
  const { data, isLoading, error } = useFetch();
  const [userId, setUserId] = useState("655bb0c6ea27f694986a2cdd"); // Bạn có thể lấy userId từ đăng nhập hoặc đăng ký

  const addToCart = async (product) => {
    try {
      const productId = product._id;
      const quantity = 1;
      const response = await fetch(
        "http://192.168.8.109:3000/api/cart/add_to_cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId, quantity }),
        }
      );
      if (response.ok) {
        const updatedCart = await response.json();
        console.log("Product added to cart:", product);
        console.log("Updated Cart Items:", updatedCart.products);
      } else {
        console.error("Failed to add to cart:", response.status);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductCardView item={item} addToCart={addToCart} /> // Truyền hàm addToCart như một prop
          )}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};


export default ProductRow;
