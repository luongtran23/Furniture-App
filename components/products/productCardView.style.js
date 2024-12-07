import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container:{
        width: 182,
        height: 240,
        marginEnd: 10,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
        // backgroundColor:'red'
    },
    container1:{
        width: 182,
        height: 240,
        // marginEnd: 6,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
        // backgroundColor:'red'
    },
    imageContainer:{
        flex: 1,
        width: 170,
        marginLeft: SIZES.small/2,
        marginTop: SIZES.small/2,
        borderRadius: SIZES.small,
        overflow:"hidden",
    },
    image:{
        // aspectRatio:1,
        resizeMode: 'cover',
        width:'100%',
        height:'100%'
    },
    details:{
        padding:SIZES.small
    },
    title:{
        fontFamily:"bold",
        fontSize:SIZES.large,
        marginBottom:2
    },
    supplier:{
        fontFamily:"regular",
        fontSize:SIZES.small,
        color:COLORS.gray
    },
    price:{
        fontFamily:"regular",
        fontSize:SIZES.medium,
    },
    addBtn:{
        position:"absolute",
        bottom: SIZES.xSmall,
        right:SIZES.xSmall
    }

})

export default styles;

