import { View, Text } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import React from 'react'
import styles from './Welcom.style'
import { TextInput,TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.container}>
                
            </View>

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name="search" size={24} style={styles.searchIcon} />
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onPressIn={() => navigation.navigate("Search")}
                        placeholder="What are you looking for?"
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="camera-outline" size={24} color={COLORS.offwhite} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Welcome