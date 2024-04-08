import React, { useState, useEffect } from 'react';
import Action_Button from '../component/action_button';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTodoStore } from '../store/store';
import EmptyTodo from './empty_todo';


const ListDone = ({ navigation }) => {

  const { done, handleDeleteDone, handleUndone, db } = useTodoStore();


  function navigateToNewTodo() {
    navigation.navigate("NewTodo");
  }

  if(done.length){
  return (
    <SafeAreaView style={{ backgroundColor: '#ff2f2', flex: 1, }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Done List</Text>

        {done.map(
          (
            { id, title, description },
            index,
          ) => {
            return (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <TouchableOpacity
                        onPress={() => {
                          handleUndone({id, title, description}, index, db);
                        }}>
                        <View
                          style={[styles.cardLogo, { backgroundColor: '#389c24' }]}>
                          <FeatherIcon color="#fff" name="smile" size={24} />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.cardBody}>
                        <View>
                          <Text style={styles.cardTitle}>{title}</Text>
                          <Text style={styles.cardCompany}>{description}</Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            handleDeleteDone({id, title, description}, index, db)
                          }}>
                          <View style={styles.btnXS}>

                            <FeatherIcon
                              color="#fff"
                              name="trash"
                              size={14}
                            //style={{ marginLeft: 12 }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          },
        )}
      </ScrollView>
      <View>
        <Action_Button navigate={navigateToNewTodo}/>
      </View>
    </SafeAreaView>
  );        }
  else{
    return(
    <EmptyTodo navigation={navigation} calling='done'/>);
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    paddingVertical: 14,
  },
  cardWrapper: {
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    marginTop: 8,
    marginHorizontal: -8,
  },
  cardFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  cardFooterItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#464646',
    marginLeft: 4,
  },
  cardLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#272727',
    marginBottom: 4,
  },
  cardCompany: {
    fontSize: 14,
    fontWeight: '500',
    color: '#818181',
  },
  cardSalary: {
    fontSize: 15,
    fontWeight: '700',
    color: '#959796',
  },
  btnXS: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: '#8f0621',
    borderColor: '#8f0621',
  },
});


export default ListDone