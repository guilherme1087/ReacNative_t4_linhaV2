import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './Board';

const App = () => {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
