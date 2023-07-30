import React from 'react';
import { View, StyleSheet } from 'react-native';

const Piece = ({ color }) => {
  return <View style={[styles.piece, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  piece: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
});

export default Piece;
