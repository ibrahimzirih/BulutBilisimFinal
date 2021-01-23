import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
import News from '../../components/News';
import CheckBox from '../../components/CheckBox';
import auth from '@react-native-firebase/auth';

import * as services from '../../services';

export default function Home({ route, navigation }) {

    const { user } = route.params;

    const [filterShown, setFilterShown] = useState(false);
    const [laterReadFilter, setLaterReadFilter] = useState(false);
    const [saveNewsFilter, setSaveNewsFilter] = useState(false);
    const [theNews, setTheNews] = useState([]);
    const [storageItems, setStorageItems] = useState([]);
    const [dbItems, setDbItems] = useState([]);

    function onPressLogout() {
        auth().signOut().then(() => {
            navigation.navigate('login');
        }).catch((error) => {
            // An error happened.
        });
    }

    function onPressFilterButton() {
        setFilterShown(!filterShown);
    }

    function onPressFilterLaterRead() {
        setLaterReadFilter(!laterReadFilter);
        setSaveNewsFilter(false);
    }

    function onPressFilterSaveNews() {
        setSaveNewsFilter(!saveNewsFilter);
        setLaterReadFilter(false);
    }

    async function onPressAddStorage(item) {
        const _laterItems = await AsyncStorage.getItem('laterReadList');
        const laterItems = JSON.parse(_laterItems);
        if (laterItems) {
            laterItems.push(item);
            AsyncStorage.setItem('laterReadList', JSON.stringify(laterItems));
            setStorageItems(laterItems);
        } else {
            const newLaterItems = [];
            newLaterItems.push(item);
            AsyncStorage.setItem('laterReadList', JSON.stringify(newLaterItems));
            setStorageItems(newLaterItems);
        }
    }

    async function onPressDeleteStorage(item) {
        const _laterItems = await AsyncStorage.getItem('laterReadList');
        const laterItems = JSON.parse(_laterItems);
        let deletedIndex = 0;
        laterItems.map((laterItem, laterIndex) => {
            if (laterItem.title === item.title) {
                deletedIndex = laterIndex;
            }
        });
        laterItems.splice(deletedIndex, 1);
        AsyncStorage.setItem('laterReadList', JSON.stringify(laterItems));
        setStorageItems(laterItems);
    }

    function onPressSave(item) {
        database().ref(`${item.source.id}`).once('value').then(snapshot => {
            if (snapshot.val()) {
                console.log(snapshot.val())
                Alert.alert('Uyarı', 'Bu haberi daha önce kaydettiniz. Silmek ister misiniz ?', [
                    { text: 'Vazgeç' },
                    {
                        text: 'Sil', onPress: () => {
                            database().ref(`${item.source.id}`).remove()
                                .then(() => {
                                    Alert.alert('Başarılı', 'Kayıt veritabanından silinmiştir');
                                })
                                .catch(() => {
                                    Alert.alert('Hata', 'Kayıt veritabanından silinemedi');
                                })
                        }
                    }
                ])
            } else {
                database().ref(`${item.source.id}`).push(item);
            }
        });
    }

    function getNews() {
        services.getNews()
            .then(res => {
                const storageItems = AsyncStorage.getItem('laterReadList');
                setTheNews(res.articles);
                setStorageItems(JSON.parse(storageItems))
            })
            .catch(err => {
                // Alert.alert('Bir hata oluştu')
                console.log(err);
            })
    }

    const renderItem = ({ item, index }) => {
        const temp = storageItems.filter(x => x.title === item.title);
        return (
            <News
                title={item.title}
                onPressLater={() => temp.length > 0 ? onPressDeleteStorage(item) : onPressAddStorage(item)}
                laterText={temp.length > 0 ? 'Listeden Kaldır' : 'Daha Sonra Oku'}
                onPressSave={() => onPressSave(item)}
                saveText='Kaydet'
            />
        )
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerUser}>
                <Text style={{ left: 24, fontWeight: 'bold' }}>{user}</Text>
                <AntDesign style={[styles.filterIcon, { right: 24 }]} name='logout' onPress={onPressLogout} />
            </View>
            <View style={styles.header}>
                <Text style={styles.label}>Haberler</Text>
                <AntDesign style={styles.filterIcon} name={filterShown ? "close" : "filter"} onPress={onPressFilterButton} />
            </View>
            { filterShown &&
                <View style={styles.filterContainer}>
                    <CheckBox
                        checked={laterReadFilter}
                        label='Sonra Okunacakları Göster'
                        onPress={onPressFilterLaterRead}
                    />
                    <CheckBox
                        checked={saveNewsFilter}
                        label='Sadece Kaydedilenleri Göster'
                        onPress={onPressFilterSaveNews}
                    />
                </View>
            }
            <FlatList
                data={laterReadFilter ? storageItems : theNews}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: '15%',
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 28
    },
    filterIcon: {
        fontSize: 36
    },
    filterContainer: {
        height: '12%',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        marginBottom: 24,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    headerUser: {
        height: '10%',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5
    }
});

