import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Tabs, router } from 'expo-router'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Search() {
  const insets = useSafeAreaInsets()
  const [searchText, setSearchText] = useState('')

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-white">
      <Tabs.Screen options={{ headerShown: false }} />
      <View className="px-6 pt-2 pb-3 border-b border-gray-200">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={router.back} className="p-2 bg-gray-100 rounded-full">
            <Ionicons name="arrow-back" size={20} color="black" />
          </Pressable>
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-2">
            <Ionicons name="search" size={18} color="#666" />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              className="flex-1 ml-2 text-base items-center"
              autoFocus
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={18} color="#666" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View className="flex-1 justify-center items-center">
        <Ionicons name="search" size={100} color="#666" />
        <Text className="text-gray-900 font-semibold text-lg">Looking for something?</Text>
        <Text className="text-gray-500 mt-2">Search for it and we'll help you find it</Text>
      </View>
    </View>
  )
}
