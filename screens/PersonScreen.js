import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform, Dimensions,ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fallbackPersonImage, fetchPersonDetails, image342 } from "../api/movieData";

var {width, height} = Dimensions.get('window');

export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1,2,3,4]);
    const [person, setPerson] = useState({})
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(false);
        //console.log("person: ", item);
        getPersonDetails(item.id)
        getPersonMovies(item.id)

    },[item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        //console.log('got person details: ', data);
        if(data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async id=>{
        const data = await fetchPersonMovies(id);
        console.log('got person movies')
        if(data && data.cast){
            setPersonMovies(data.cast);
        }

    }

    return (
       <ScrollView style={styles.scroll}
       contentContainerStyle={styles.contentContainer}>
                <SafeAreaView style={styles.top}>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.backIcon}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color= {isFavourite?  'red' : 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? (
                        <Loading/>
                    ): (
                        <View>
                        <View style={styles.personDet}>
                    <View style={styles.imgContainer}>
                        <Image 
                        //source={require('../assets/images/castImage2.png')}
                        source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                        style={styles.image} />
                    </View>
                </View>
                <View style={styles.bilgiler}>
                    <Text style={styles.name}>
                        {
                            person?.name
                        }
                    </Text>
                    <Text style={styles.placeOfBirth}>
                        {
                            person?.place_of_birth
                        }
                    </Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Gender</Text>
                            <Text style={styles.infoValue}>
                                {
                                    person?.gender==1? 'Female': 'Male'
                                }
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Birthday</Text>
                            <Text style={styles.infoValue}>
                                {
                                    person?.birthday
                                }
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Known For</Text>
                            <Text style={styles.infoValue}>
                                {person?.known_for_department}
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Popularity</Text>
                            <Text style={styles.infoValue}>
                                {person?.popularity?.toFixed(2)}%
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bio}>
                    <Text style={styles.title}>Biography</Text>
                    <Text style={styles.bioText}>
                    {
                        person?.biography || 'N/A'
                    }
                    </Text>
                </View>

                <MovieList title={'Movies'} hideSeeAll={true} data={personMovies}/>
                </View>

                    )
                }

                


       </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'black',
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
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
    personDet: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: {width:0, height: 5},
        shadowOpacity: 1,
        marginTop: 130
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 999,
        height: 288,
        width: 288,
        borderWidth: 2,
        borderColor: '#A0AEC0'
    },
    image: {
        borderRadius: 12,
        height: height*0.43 ,
        width: width*0.74
    },
    bilgiler: {
        marginTop: 6,
        alignItems: 'center'
    },
    name: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    placeOfBirth: {
        fontSize: 16,
        color: '#A0aec0',
        textAlign: 'center'
    },
    container: {
        marginTop: 6,
        marginHorizontal: 3,
        padding: 16,
        backgroundColor: '#4a5568',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
    },
    infoContainer: {
        flexDirection: 'row'
    },
    infoItem: {
        borderRightWidth: 2,
        borderColor: '#cbd5e0',
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 14,
        color: '#A0aec0'
    },
    bio: {
        marginTop: 6,
        marginHorizontal: 4,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bioText: {
        color: '#a0aec0',
        letterSpacing: 0.5,
    }
})