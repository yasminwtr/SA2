import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, Image, View, StatusBar } from 'react-native'
import api from '../../../api'
import styles from './styles'
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const Categories = (props) => {
  const [services, setServices] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getWorkersByServiceId = async (service) => {
    const response = await api.get(`/getWorkersByServiceId?idService=${service.idservice}`);
    props.navigation.navigate('Workers',
      { serviceCategory: service.titleservice, filteredWorkers: response.data, idService: service })
  }

  const fetchData = async () => {
    setServices(null)
    const response = await api.get('/services');
    setServices([...response.data])
    if (refresh) {
      setRefresh(null)
      setRefresh(false)
    } else {
      setRefresh(null)
      setRefresh(true)
    }
  }

  useEffect(() => {
    fetchData().catch(console.error);
  }, [])

  useEffect(() => {
  }, [services])

  useEffect(() => {
    const copyServices = [...services];
    setServices(null)
    setServices(undefined)
    setServices(copyServices);
  }, [refresh])

  const Item = ({ item, onPress }) => (
    <SafeAreaView style={styles.box}>
      <TouchableOpacity onPress={onPress} >
        <Image
          style={styles.icon}
          source={{
            uri: `${item.icon}`,
          }}
        />
        <Text style={styles.titleservice}>
          {item.titleservice}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#F85C70"
      />
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Serviços Residencias</Text>
      </View>
      <View style={styles.container}>
        <Title style={styles.titleContainer}> Categorias </Title>
      </View>
      <View style={styles.containerBox}>
        {
          services?.map(service => {
            return (
              <Item
                item={service}
                onPress={() => { getWorkersByServiceId(service) }}
                key={service.titleservice}
              />
            );
          })
        }
      </View>
    </View>
  )
}

export default Categories