import React from 'react'
import { ScrollView, StatusBar, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Cart() {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 items-center bg-background">
      <Text className="text-xl font-semibold">Cart</Text>
      <ScrollView />
    </View>
  )
}
