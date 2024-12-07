import { FlatList, StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './search.style';
import { TextInput,TouchableOpacity } from 'react-native';
import {Feather,Ionicons} from '@expo/vector-icons'
import { COLORS , SIZES } from '../constants';
import axios from 'axios';
import SearchTile from '../components/products/SearchTile';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults)
  // http://192.168.1.9:3000/api/products/search/${searchText}
  const handleSearch = async() => {
    try {
      const response = await axios.get(`http://192.168.8.109:3000/api/products/search/${searchText}`)
      setSearchResults(response.data)
    } catch (error) {
      console.log("Fail to get product",error)
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
        <Ionicons 
        name="camera-outline" 
        size={24} 
        style={styles.searchIcon}
        />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
             style={styles.searchInput}
             value={searchText} 
             onChangeText={setSearchText}
             placeholder="What are you looking for?"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={()=> handleSearch()}>
            <Feather name="search" size={24}
            color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
  <View style={{flex: 1}}>
    <Image
      source={require('../assets/images/Pose23.png')}
      style={styles.searchImage}
    />
  </View>
) : (
  <FlatList
    data={searchResults} // Dời dòng này lên để nó thuộc về FlatList
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
      <SearchTile item = {item} />
    )}
    style={{marginHorizontal:12}}
  />
)}

    </SafeAreaView>
  );
};

export default Search

