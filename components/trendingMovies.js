import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image,TouchableWithoutFeedback, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { image500 } from "../api/movieData";

var {width, height} = Dimensions.get('window')

export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item);

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                TrendingMovies
            </Text>
            <Carousel
            data={data}
            renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
            firstItem={1}
            inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.62}
            slideStyle={{display: 'flex', alignItems: 'center'}}
            />
        </View>
    )
}

const MovieCard = ({item, handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <Image
            //source={require('../assets/images/moviePoster1.png')}
            source={{uri: image500(item.poster_path)}}
            style={styles.moviePoster}/>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    moviePoster: {
        width: width*0.6,
        height: height*0.4,
        borderRadius: 20,
    }

})