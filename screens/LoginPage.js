import { View, Text, ScrollView, TouchableOpacity,Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackBtn from '../components/products/BackBtn'
import styles from './LoginPage.style';
import Button from '../components/products/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import SignUp from './SignUp';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

 const validateYupSchema = Yup.object().shape({
  password:Yup.string()
  .min(8, 'Password must be at least 8 character')
  .required('Required'),
  email:Yup.string().email('Provide a value email address').required('Required'),
});

const LoginPage = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const inValidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [{
        text:"Cancel", onPress:()=>{}
      },
      {
        text:"Continue", onPress:()=>{}
      },
      {defaultIndex:1}
    ]
    )
  }

  const login = async(values) => {
    setLoader(true) 
    
    try {
      const endpoint = "http://192.168.8.109:3000/api/login"
      const data = values;

      const response = await axios.post(endpoint,data)
      if(response.status === 200)
      {
          setLoader(false);
          setResponseData(response.data)
          // console.log(`user${responseData._id}`)
          await AsyncStorage.setItem(
            `user${responseData._id}`, 
            JSON.stringify(responseData))
          await AsyncStorage.setItem('id', JSON.stringify(responseData._id))
          navigation.replace('Bottom Navigation')
          
      }
      else {
        Alert.alert(
          "Error logging in",
          "Please provide valid required fields",
          [{
            text:"Cancel", onPress:()=>{}
          },
          {
            text:"Continue", onPress:()=>{}
          },
          {defaultIndex:1}
        ]
        )
      }
    } catch (error) {
      Alert.alert(
        "Error", "Error logging in",
        [{
          text:"Cancel", onPress:()=>{}
        },
        {
          text:"Continue", onPress:()=>{}
        },
        {defaultIndex:1}
      ]
      )
    }finally {
      setLoader(false)
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal:20}}>
        <View>
          <BackBtn onPress={() => navigation.goBack()}/>
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.cover}
          />

          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{email:'', password:''}}
            validationSchema={validateYupSchema}
            onSubmit={(values) => login(values)}
           >

            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldError, setFieldTouched}) => (
              <View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary: COLORS.offwhite)}>
                    <MaterialCommunityIcons 
                      name='email-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder='Enter email'
                      onFocus={() => {setFieldTouched('email')}}
                      onBlur={()=> {setFieldTouched('email', '')}}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{flex:1}}
                    />

                  </View>

                  {touched.email && errors.email && (
                    <Text style={styles.errorsMesage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.secondary: COLORS.offwhite)}>
                    <MaterialCommunityIcons 
                      name='lock-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder='Password'
                      onFocus={() => {setFieldTouched('password')}}
                      onBlur={()=> {setFieldTouched('password', '')}}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{flex:1}}
                    />
                    <TouchableOpacity onPress={()=> {setObsecureText(!obsecureText)}}>
                      <MaterialCommunityIcons 
                        name={obsecureText? "eye-outline" : "eye-off-outline"} 
                        size={20}
                      />
                    </TouchableOpacity>


                  </View>

                  {touched.password && errors.password && (
                    <Text style={styles.errorsMesage}>{errors.password}</Text>
                  )}
                </View>

                <Button 
                loader={loader}
                title={"L O G I N"} 
                onPress={isValid ?handleSubmit : inValidForm} 
                isValid={isValid}/> 
                

                <Text style={styles.registration} onPress={() =>{navigation.navigate('SignUp')}}>Register</Text>

              </View>
            )}

          </Formik>
           
          
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginPage