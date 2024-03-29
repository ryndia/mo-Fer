import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SectionList, SafeAreaView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, onChangeText] = useState('');
  const [data, setData] = useState([
    {
      title: 'To-do',
      data: [],
    },
    {
      title: 'Done',
      data: []
    },
  ]);

  const handleSave = () => {
    const newData = [...data];
      newData[0].data.push(text);
      setData(newData);
      onChangeText('');
  };

  const handleDelete = (section, key) => {
    const newData = [...data];
    newData[section].data.splice(key, 1);
    setData(newData);
  };


  const handleDone = (item, key) => {
    console.log(key);
    const newData = [...data];
    newData[0].data.splice(key, 1);
    newData[1].data.push(item);
    setData(newData);
  }

  const handleUndo = (item,index) => {
    const newData = [...data];
    newData[1].data.splice(index,1);
    newData[0].data.push(item);
    setData(newData);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Enter the to-do</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder='Enter the to-do'
        />
        <Button
          title="Save"
          onPress={handleSave}
        />

        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section, index }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              {section.title === 'To-do' && (
                <>
                  <Button
                    title="Done"
                    onPress={() => handleDone(item, index)}
                  />
                  <Button
                    title="Delete"
                    onPress={() => handleDelete(0, index)}
                  />
                </>
              )}
              {section.title == 'Done' && (
                <>
                  <Button
                    title="Undo"
                    onPress={() => handleUndo(item, index)}
                  />
                  <Button
                    title="Delete"
                    onPress={() => handleDelete(1, index)}
                  />
                </>
                )
              }
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />


        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
