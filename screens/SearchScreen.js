import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions, StyleSheet} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/loading";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import { debounce } from 'lodash';
import { fallbackMoviePoster, image185, searchMovies } from "../api/movieData";

const {width, height} = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([1,2,3,4]);
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man and the Wasp:';
    const handleSearch = value => {
        if(value && value.length>2){
            setLoading(true);
            searchMovies({
                query: value, include_adult: false, language: 'en-US', page: '1'
            }).then(data => {
                console.log('got search results');
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }else {
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
    return(
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.inputContainer}>
                <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search Movie"
                placeholderTextColor={'lightgray'}
                style={styles.textInput}
                />
                <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.button} >
                    <XMarkIcon size={25} color={'white'} />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <Loading/>
                ) : 
                
                    results.length > 0 ? (
                        <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 15}}
                        style={styles.scroll}>
                            <Text style={styles.resultsText}>Results ({results.length})</Text>
                            <View style={styles.resultsContainer}>
                                {
                                    results.map((item, index) => {
                                        return(
                                            <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => navigation.push('Movie', item)}
                                            style={styles.movieContainer}
                                            >
                                                <View style={styles.movieContent}>
                                                    <Image
                                                    //source={require('../assets/images/moviePoster2.png')}
                                                    source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                                    style={styles.image}
                                                    />
                                                    <Text style={styles.movieTitle}>
                                                        {
                                                            item?.title?.length>22? item?.title.slice(0,22)+'...': item?.title                                                     }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
    
                    ):(
                        <View style={styles.resultsImgContainer}>
                            <Image
                            source={require('../assets/images/movieTime.png')}
                            style={styles.resultsImage} />
                        </View>
    
                    )
                }
            
            

           



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex:1,
        backgroundColor: '#4a5568'
    },
    inputContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#a0aec0',
        borderRadius: 999,
    },
    textInput: {
        flex: 1,
        paddingBottom: 3,
        paddingLeft: 24,
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 1
    },
    button: {
        borderRadius: 999,
        padding: 12,
        margin: 4,
        backgroundColor: '#a0aec0'
    }, 
    resultsText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 4,
    }, 
    resultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    movieContainer: {
        width: '48%',
        marginBottom: 16
    },
    movieContent: {
        marginBottom: 8,
        justifyContent: 'space-between'
        },
    image: {
        width: width * 0.44,
        height: height * 0.33,
        borderRadius: 12,
    },
    movieTitle: {
        color: 'gray',
        marginLeft: 4,
    },
    resultsImgContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resultsImage: {
        height: 288,
        width: 288
    }
    


})