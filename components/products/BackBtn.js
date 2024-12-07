import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import styles from './productCardView.style'

const BackBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backBtn}>
        <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
        />
    </TouchableOpacity>
  )
}

export default BackBtn