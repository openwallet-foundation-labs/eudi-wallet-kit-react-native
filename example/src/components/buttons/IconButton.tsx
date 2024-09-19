/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import { type Insets, StyleSheet, Text, type TextStyle, TouchableOpacity, type ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DEFAULT_ICON_SIZE = 24

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '300',
    color: 'black',
  },
})

interface Props {
  onPress: () => void
  iconName: string
  label?: string
  iconColor?: string
  iconSize?: number
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  accessibilityLabel?: string
  testId?: string
  hitSlop?: Insets
}

export const IconButton: React.FC<Props> = ({
  onPress,
  iconName,
  label,
  iconColor,
  iconSize,
  containerStyle,
  textStyle,
  accessibilityLabel,
  testId,
  hitSlop,
}) => {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      testID={testId}
      style={{ ...styles.container, ...containerStyle }}
      onPress={onPress}
      hitSlop={hitSlop}
    >
      <Icon name={iconName} size={iconSize ?? DEFAULT_ICON_SIZE} color={iconColor ?? 'black'} />
      {!!label && <Text style={{ ...styles.labelText, marginLeft: 16, ...textStyle }}>{label}</Text>}
    </TouchableOpacity>
  )
}
