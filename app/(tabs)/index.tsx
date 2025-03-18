import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { SectionList, StatusBar, Text, View } from 'react-native'
import { products } from 'data/products'

export default function Home() {
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
        renderItem={({ item }) => (
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

            <View className="absolute bottom-4 right-6 rounded-full items-center justify-center bg-green-200 p-1">
              <Ionicons name="add" size={18} color="#14532d" />
            </View>
          </View>
        )}
      />
    </View>
  )
}
