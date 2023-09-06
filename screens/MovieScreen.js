import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform, StyleSheet } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon} from 'react-native-heroicons/solid';
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from 'expo-linear-gradient';
import Cast from "../components/cast";
import Movielist from '../components/movieList'
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fetchMovieCredits, fetchMovieDetails } from "../api/movieData";
import { image500 } from "../api/movieData";
import { fallbackMoviePoster } from "../api/movieData";

var {width, height} = Dimensions.get('window')

export default function MovieScreen() {
    const {params: item} = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    useEffect(() => {
        //console.log('itemid: ', item.id);
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    },[item]);

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        //console.log('get movie details: ', data );
        if (data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async id=>{
        const data = await fetchMovieCredits(id);
        //console.log('got movie credits')
        if(data && data.cast){
            setCast(data.cast);
        }
    
      }
    
      const getSimilarMovies = async id=>{
        const data = await fetchSimilarMovies(id);
        //console.log('got similar movies');
        if(data && data.results){
            setSimilarMovies(data.results);
        }
    
      }

    return(
        <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={styles.scroll}
        >
            <View style={styles.container}>
                <SafeAreaView style={styles.top}>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.backIcon}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color= {isFavourite?  backgroundColor: 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading? (
                        <Loading />
                    ):(
                        <View>
                    <Image
                    //source={require('../assets/images/moviePoster2.png')}
                    source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
                    style={styles.image}
                    />
                    <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={styles.gradient}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                </View>

                    )
                }
                
            </View>

            <View style={styles.movieDet}>
                <Text style={styles.title}>
                    {movie?.title}
                </Text>

                {movie?.id?(
                    <Text style={styles.aciklama}>
                    {movie?.status} - {movie?.release_date?.split('-')[0]} - {movie?.runtime} min
                </Text>
                ):null
                }

                <View style={styles.genres}>
                    {
                        movie?.genres?.map((genre, index)=>{
                            let showDot = index+1 != movie.genres.length;
                            return (
                                <Text key={index} style={styles.aciklama}>
                                    {genre?.name} {showDot? "•":null}
                                </Text>
                            )

                        })
                    }
                    
                    
                </View>

                <Text style={styles.description}>
                {
                    movie?.overview
                }
                </Text>
            </View>

            <Cast navigation={navigation} cast={cast}/>

            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: 'black'
    },
    container: {
        width: '100%'
    },
    top: {
        position: 'absolute',
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backIcon: {
        backgroundColor: '#eab308',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width, height: height*0.55
    },
    gradient: {
        width, height: height*0.40,
        position: 'absolute',
        bottom: 0
    },
    movieDet: {
        marginTop: -(height*0.09),
        paddingTop: 12,

    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 0.7
    },
    aciklama: {
        color: '#A0AEC0',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center', 
        padding: 15
    },
    genres: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    description: {
        color: '#A0AEC0',
        marginHorizontal: 4,
        letterSpacing: 1,
    }


})