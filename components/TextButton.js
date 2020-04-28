import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton ({ children, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.delete, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  delete: {
    textAlign: 'center',
    color: purple,
  }
})