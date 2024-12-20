import { StyleSheet, Text, View} from 'react-native'
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons, Fontisto} from '@expo/vector-icons'
import styles from './home.style'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Welcome } from '../components'
import Carousel from '../components/home/Carousel'
import Headings from '../components/home/Headings'
import ProductCardView from '../components/products/productCardView'
import ProductRow from '../components/products/productRow'
import ProductDetail from './ProductDetail'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const navigation = useNavigation();
  const[userData, setUserData]= useState(null)
  const[userLogin, setUserLogin]= useState(false)
  useEffect(() => {
    checkExistingUser();
  },[])

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if(currentUser !== null)
      {
        const parseData = JSON.parse(currentUser)
        setUserData(parseData)
        setUserLogin(true)
      }
    } catch (error) {
      console.log("Error take the database:", Error)
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <Ionicons name='location-outline' size={24}/>
            
            <Text style={styles.location}>{userData ? userData.location : 'Ha Noi'}</Text>

            <View style={{alignItems:"flex-end"}}>
              <View style={styles.cartCount}>
                  <Text style={styles.cartNumber}> 8 </Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <Fontisto name='shopping-bag' size={24}/>
              </TouchableOpacity>
            </View>
          </View>
      </View>

      <ScrollView>
        <Welcome/>

        <Carousel/>

        <Headings/>

        <ProductRow/>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

