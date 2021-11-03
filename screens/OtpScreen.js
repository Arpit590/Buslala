import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import axios from "axios";
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RalewayBold, RalewayLight, RalewayRegular } from '../assets/fonts/fonts'
import { primary, secondary, textColor } from '../components/Colors'

const OtpScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [error, setError] = useState(false);
    const [OTP, setOTP]= useState("");
    const phoneNumber = route.params.number;

    const inputHandler=()=>{
        if(OTP===""){
            setError(true)
        }else{
            setError(false);
        }
    }

    const verificatioHandler=()=>{
        axios.post("https://otp.apistack.run/v1/verifyOtp",{
            requestId: route.params.request,
            otp: OTP
        },{
            headers:{
                'x-as-apikey': '96d018bc-a7ab-4dc4-92b9-810921f1b0ce',
                'Content-Type': "application/json"
            }
        })
        .then((res)=>{
            return res.data.isOtpValid
        }).catch((err)=>{
            console.log(err.message)
        })
        navigation.navigate("OtpVerified", {number: phoneNumber})
    }

    return (
        <View style={styles.screen}>
            <View style={styles.view1}>
                <Image
                source={require("../assets/logo.png")}
                style={{height:250, width:250, resizeMode:"contain"}}
                />
                <Text style={{fontSize:30, fontFamily:RalewayRegular, color:textColor, maxWidth:200, textAlign:"center"}}>Let's Explore The World</Text>
            </View>
            <View style={styles.view2}>
                <KeyboardAvoidingView behavior="padding" style={styles.box}>
                    <Text style={{fontFamily:RalewayBold, fontSize:20, color:"#242424", marginBottom:10}}>OTP Verification</Text>
                    <Text style={{fontFamily:RalewayRegular, fontSize:18, color:"#242424"}}>Code Sent to {phoneNumber}</Text>
                    {error ? <Text style={{color:"red", fontSize:12, marginBottom:1}}>Please Enter a Valid OTP!</Text>:<Text></Text>}
                    <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    placeholderTextColor="gray"
                    textAlign="center"
                    value={OTP}
                    onChangeText={(text)=>setOTP(text)}
                    onBlur={inputHandler}
                    keyboardType="number-pad"
                    />
                    <TouchableOpacity activeOpacity={0.8} style={styles.button}
                    onPress={verificatioHandler}
                    >
                        <Text style={{color:"white",fontSize:18, fontFamily:RalewayRegular}}>Verify</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        backgroundColor: "white",
    },
    view1:{
        backgroundColor: primary,
        borderBottomRightRadius:100,
        borderBottomLeftRadius:100,
        width:"100%",
        height:"60%",
        alignItems:"center"
    },
    view2:{
        width:"100%",
        alignItems:"center",
    },
    box:{
        backgroundColor:"white",
        elevation:5,
        borderRadius:10,
        paddingVertical:20,
        paddingHorizontal:10,
        marginTop:-20,
        width:"80%",
        alignItems:"center"
    },
    input:{
        backgroundColor:"lightgray",
        borderRadius:10,
        width:"80%",
        marginVertical:20
    },
    button:{
        backgroundColor:secondary,
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        elevation:5,
        marginBottom:10,
        alignSelf:"center"
    }
})
