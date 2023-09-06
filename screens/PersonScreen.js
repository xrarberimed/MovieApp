import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform, Dimensions,ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from "../components/movieList";
import Loading from "../components/loading";

var {width, height} = Dimensions.get('window');

export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1,2,3,4]);
    const [loading, setLoading] = useState(false);

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
                        <Image source={require('../assets/images/castImage2.png')}
                        style={styles.image} />
                    </View>
                </View>
                <View style={styles.bilgiler}>
                    <Text style={styles.name}>
                        Keanu Reeves
                    </Text>
                    <Text style={styles.placeOfBirth}>
                        Beirut, Lebanon
                    </Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Gender</Text>
                            <Text style={styles.infoValue}>
                                Male
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Birthday</Text>
                            <Text style={styles.infoValue}>
                                02-09-1964
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Known For</Text>
                            <Text style={styles.infoValue}>
                                Acting
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Popularity</Text>
                            <Text style={styles.infoValue}>
                                %84
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bio}>
                    <Text style={styles.title}>Biography</Text>
                    <Text style={styles.bioText}>
                    Keanu Charles Reeves (d. 2 Eylül 1964, Lübnan), Kanadalı aktör, yapımcı, yönetmen ve müzisyen. Adının anlamı "Dağlardan esen rüzgâr"dır. Annesi ile babası Beyrut'ta bir gece kulübünde tanışmışlardır. Annesi İngiliz, babası Çin asıllı bir Hawaiilidir. Ancak kendisini Kanada'da büyüdüğü için Kanadalı saymaktadır. 3 ülkenin vatandaşlığına sahiptir. Ayrıca yapımcılığını CD Projekt Red'in üstlendiği Cyberpunk 2077 isimli oyunda Johnny Silverhand karakterini canlandırmıştır.
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