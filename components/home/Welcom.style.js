import { StyleSheet } from "react-native";
import { COLORS,SIZES } from "../../constants/index";

const styles= StyleSheet.create({
    container: {
        width:"100%"
    },

    welcomeTxt: {
        fontFamily:"bold",
        fontSize:39,
        marginTop:10,
        color: COLORS.black,
        marginHorizontal:12,
    },

    welcomeTxt1: {
        fontFamily:"bold",
        fontSize:34,
        marginTop:0,
        color: COLORS.primary,
        marginHorizontal:12,
    },

    searchContainer: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: COLORS.secondary,
        borderRadius:SIZES.medium,
        marginVertical: SIZES.medium,
        height:50,
        marginHorizontal:12,
    },

    searchIcon: {
        marginHorizontal:10,
        color: COLORS.gray,
        marginTop: SIZES.small,
    },

    searchWrapper: {
        flex:1,
        backgroundColor: COLORS.secondary,
        marginRight: SIZES.small,
        borderRadius: SIZES.small
    },

    searchInput:{
        fontFamily: "regular",
        width:"100%",
        height:"100%",
        paddingHorizontal: SIZES.small,
    },

    searchBtn:{
        width:50,
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius:SIZES.medium,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: COLORS.primary,

    }
})
export default styles