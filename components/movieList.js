import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import { image185 } from "../api/movieData";

var {width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.moviesInfo}>
                <Text style={styles.titleText}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                    <Text style={styles.text}>See All</Text>
                </TouchableOpacity>

                    )
                }
                
            </View>

            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data && data.map((item, index) => {
                        return(
                            <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item)}
                            >
                                <View style={styles.imageContainer}>
                                    <Image
                                    //source={require('../assets/images/moviePoster2.png')}
                                    source={{uri: image185(item.poster_path)}}
                                    style= {styles.image}/>
                                    <Text style={styles.imgtxt}>
                                    {
                                        item?.title?.length>14? item?.title.slice(0,14)+'...': item?.title
                                    }
                                </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    moviesInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,

    },
    titleText: {
        color: 'white',
        fontWeight: 'bold'

    },
    text: {
        color: '#eab308'

    },
    imageContainer: {

    },
    image: {
        width: width*0.33,
        height: height*0.22,
        borderRadius: 15,

    },
    imgtxt: {
        paddingHorizontal: 15
    }
    
})