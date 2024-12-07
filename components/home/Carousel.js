import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { COLORS } from '../../constants'

const Carousel = () => {
    return (
      <View style={styles.containerCarousel}>
        <Image
          source={require('../../assets/slider2.jpg')} // Thay đổi đường dẫn thành đường dẫn của ảnh bạn muốn hiển thị
          style={styles.image}
        />
      </View>
    );
  };

export default Carousel

const styles = StyleSheet.create({
    carouselContainer: {
        flex:1,
        alignItems:"center",
        justifyContent: "center",
    },

    image: {
        width: "95%", // Điều chỉnh kích thước ảnh theo nhu cầu của bạn// Điều chỉnh kích thước ảnh theo nhu cầu của bạn
        height: 200,
        borderRadius: 15,
        marginLeft:10,
        marginRight:10,
        resizeMode: 'contain', // Điều chỉnh kiểu hiển thị của ảnh
      },
})