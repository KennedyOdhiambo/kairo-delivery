import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Pressable, SectionList, StatusBar, Text, View } from 'react-native'
import { products } from 'data/products'

export default function Home() {
  const [cartItems, setCartItems] = useState<Record<string, number>>({})

  return (
    <View className="flex-1 bg-background">
      <StatusBar translucent backgroundColor="transparent" barStyle="default" />

      <View className="absolute top-0 left-0 right-0 h-52">
        <Image
          source={require('../../assets/top.jpg')}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
        />
      </View>

      <SectionList
        showsVerticalScrollIndicator={false}
        sections={products.map((category) => ({
          title: category.category,
          data: category.items,
        }))}
        keyExtractor={(item, index) => item.name + index}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={() => (
          <>
            <View className="pt-12 px-6 flex-row justify-between">
              <View className="p-2 z-10 bg-white rounded-full">
                <Ionicons name="arrow-back" size={24} color="black" />
              </View>
              <View className="flex-row gap-2">
                <View className="p-2 z-10 bg-white rounded-full">
                  <Ionicons name="search" size={24} color="black" />
                </View>
                <View className="p-2 z-10 bg-white rounded-full">
                  <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
                </View>
              </View>
            </View>

            <View className="bg-background rounded-tr-[64px] px-6 mt-6 pt-10">
              <Text className="text-4xl text-gray-900 font-semibold tracking-tight">
                Okoth's Joint
              </Text>
            </View>
          </>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="px-6 bg-white pt-6 pb-2">
            <Text className="font-semibold text-gray-900 text-2xl">{title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const itemId = item.name
          const quantity = cartItems[itemId] || 0

          return (
            <View className="flex-row py-4 relative bg-white px-6 border-b border-gray-200">
              <Image
                source={item.image}
                style={{ width: 120, height: 120, borderRadius: 12 }}
                contentFit="cover"
              />
              <View className="ml-4 flex-1">
                <Text className="text-lg">{item.name}</Text>
                <Text className="text-gray-500" numberOfLines={3} ellipsizeMode="tail">
                  {item.description}
                </Text>
              </View>

              {quantity === 0 ? (
                <Pressable
                  onPress={() =>
                    setCartItems((prev) => ({
                      ...prev,
                      [itemId]: (prev[itemId] || 0) + 1,
                    }))
                  }
                  className="absolute bottom-4 right-6 rounded-full items-center justify-center bg-green-200 p-1">
                  <Ionicons name="add" size={22} color="#14532d" />
                </Pressable>
              ) : (
                <View className="absolute bottom-4 right-6 flex-row items-center">
                  <Pressable
                    onPress={() =>
                      setCartItems((prev) => ({
                        ...prev,
                        [itemId]: (prev[itemId] || 0) - 1,
                      }))
                    }
                    className="rounded-full bg-gray-100 p-1 items-center justify-center">
                    <Ionicons name="remove" size={22} color="#374151" />
                  </Pressable>

                  <Text className="mx-2 font-medium text-base min-w-6 text-center">{quantity}</Text>

                  <Pressable
                    onPress={() =>
                      setCartItems((prev) => ({
                        ...prev,
                        [itemId]: (prev[itemId] || 0) + 1,
                      }))
                    }
                    className="rounded-full bg-green-200 p-1 items-center justify-center">
                    <Ionicons name="add" size={22} color="#14532d" />
                  </Pressable>
                </View>
              )}
            </View>
          )
        }}
      />
    </View>
  )
}
