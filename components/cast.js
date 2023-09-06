import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { fallbackPersonImage, image185 } from "../api/movieData";

export default function Cast({navigation, cast}){
    let personName = 'Keanu Reevs';
    let characterName = 'John Wick'
    return(
        <View style={styles.container}>
            <Text style={styles.topcast}>Top Cast</Text>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    cast && cast.map((person, index) => {
                        return(
                            <TouchableOpacity
                            key={index}
                            style={styles.castButton}
                            onPress={()=> navigation.navigate('Person', person)}
                            >
                                <View style= {styles.imgView}>
                                <Image
                                style={styles.image}
                                //source={require('../assets/images/castImage1.png')}
                                source={{uri: image185(person?.profile_path) || fallbackPersonImage}}
                                />
                                </View>
                                <Text style={styles.text}>
                                    {
                                        person?.character.length>10? person?.character.slice(0,10)+'...': person?.character
                                    }
                                </Text>
                                <Text style={styles.textPerson}>
                                    {
                                        person?.original_name.length>10? person?.original_name.slice(0,10)+'...': person?.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 6
    },
    topcast: {
        color: 'white',
        fontSize: 18,
        marginHorizontal: 4,
        marginBottom: 5,
    },
    castButton: {
        marginRight: 4,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 12,
        marginTop: 3
    },
    textPerson: {
        color: '#A0AEC0',
        fontSize: 12,
        marginTop: 3
    },
    imgView: {
        overflow: 'hidden',
        borderRadius: 999,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#A0AEC0'

    },
    image: {
        height: 96,
        width: 80,
        borderRadius: 12,
    }
})