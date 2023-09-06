import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity,View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcominggMovies } from '../api/movieData';

export default function HomeScreen() {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])

    const getTrendingMovies = async ()=> {
        const data = await fetchTrendingMovies();
        console.log('got trending movies ', data);
        if(data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getUpcomingMovies = async ()=> {
        const data = await fetchUpcominggMovies();
        console.log('got upcoming movies ', data);
        if(data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async ()=> {
        const data = await fetchTopRatedMovies();
        console.log('got toprated movies ', data);
        if(data && data.results) setTopRated(data.results);
    }
    return(
        <View style={styles.container} >
            <SafeAreaView style={styles.platform}>
                <StatusBar style='light'/>
                <View style={styles.ust}>
                    <Bars3CenterLeftIcon size={35} strokeWidth={3} color="white"/>
                    <Text style={styles.header}>
                        <Text style={styles.text}>M</Text>
                        ovies
                        </Text>
                    <TouchableOpacity style={styles.searchicon} onPress={()=> navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={3} color="white"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading? (
                    <Loading />
                ):(
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:10}}>

                { trending.length>0 && <TrendingMovies data={trending}/>}

                { upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} /> }

                { topRated.length>0 && <MovieList title="Top Rated" data={topRated} /> }

                </ScrollView>
                )
            }



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    platform: {
        flex: 1
    },
    ust: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    header: {
        color: 'white',
        fontWeight: '800',
        fontSize: 25,
    },
    text: {
        color: '#eab308'
    }

})