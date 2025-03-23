import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import { Animated, Pressable, SectionList, StatusBar, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { products } from 'data/products'

function NavBar({ scrollY }: { scrollY: Animated.Value }) {
  const insets = useSafeAreaInsets()

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-124, 0],
    extrapolate: 'clamp',
  })
  return (
    <Animated.View
      className="absolute top-0 left-0 right-0 z-50 bg-white px-4 py-3 border-b border-gray-200 flex-row justify-between items-center"
      style={{
        paddingTop: insets.top + 16,
        transform: [{ translateY: headerTranslateY }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}>
      <Pressable className="p-2.5 z-20 bg-gray-100 rounded-full">
        <Ionicons name="arrow-back" size={20} color="black" />
      </Pressable>
      <Text className="text-lg font-medium">Okoth's Joint</Text>
      <Pressable
        onPress={() => router.push('/search')}
        className="p-2.5 z-20 bg-gray-100 rounded-full">
        <Ionicons name="search" size={20} color="black" />
      </Pressable>
    </Animated.View>
  )
}

function ListItem({
  item,
  cartItems,
  setCartItems,
}: {
  item: (typeof products)[number]['items'][number]
  cartItems: Record<string, { quantity: number; price: number }>
  setCartItems: React.Dispatch<
    React.SetStateAction<Record<string, { quantity: number; price: number }>>
  >
}) {
  const itemId = item.name
  const cartItem = cartItems[itemId]
  const quantity = cartItem?.quantity || 0
  return (
    <View className="flex-row py-4 relative bg-white px-6 border-b border-gray-200">
      <Image
        source={item.image}
        style={{ width: 108, height: 108, borderRadius: 12 }}
        contentFit="cover"
      />
      <View className="flex-1 ml-4 flex-row gap-4">
        <View className="flex-col flex-1">
          <Text className="text-lg">{item.name}</Text>
          <Text className="text-gray-500" numberOfLines={4} ellipsizeMode="tail">
            {item.description}
          </Text>
        </View>

        <View className="flex-col items-end justify-between">
          <Text className="text-lg text-gray-700">KSh {item.price}</Text>
          <View className="flex-row items-center w-24 justify-end">
            {quantity > 0 && (
              <Pressable
                onPress={() => {
                  setCartItems((prev) => {
                    const newQuantity = cartItem.quantity - 1
                    if (newQuantity === 0) {
                      const newItems = { ...prev }
                      delete newItems[itemId]
                      return newItems
                    } else {
                      return {
                        ...prev,
                        [itemId]: {
                          ...cartItem,
                          quantity: newQuantity,
                        },
                      }
                    }
                  })
                }}
                className="rounded-full bg-gray-100 p-1 items-center justify-center">
                <Ionicons name="remove" size={18} color="#374151" />
              </Pressable>
            )}

            {quantity > 0 && (
              <Text className="mx-2 font-medium text-base min-w-6 text-center">{quantity}</Text>
            )}

            <Pressable
              onPress={() => {
                setCartItems((prev) => {
                  if (cartItem) {
                    return {
                      ...prev,
                      [itemId]: {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                      },
                    }
                  } else {
                    return {
                      ...prev,
                      [itemId]: {
                        quantity: 1,
                        price: item.price || 0,
                      },
                    }
                  }
                })
              }}
              className="rounded-full bg-green-200 p-1 items-center justify-center">
              <Ionicons name="add" size={18} color="#1a7c3a" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

function ButtonSheet({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheet> }) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      backgroundStyle={{ backgroundColor: '#fff' }}
      handleIndicatorStyle={{ backgroundColor: '#999', width: 40 }}
      enablePanDownToClose>
      <BottomSheetView className="flex-1 px-6 py-4">
        <Text className="text-xl font-bold mb-6">Options</Text>

        <Pressable className="flex-row items-center py-3 border-b border-gray-100">
          <Ionicons name="information-circle-outline" size={24} color="#333" />
          <Text className="text-lg ml-4">About Restaurant</Text>
        </Pressable>

        <Pressable className="flex-row items-center py-3 border-b border-gray-100">
          <Ionicons name="star-outline" size={24} color="#333" />
          <Text className="text-lg ml-4">Rate Us</Text>
        </Pressable>

        <Pressable className="flex-row items-center py-3 border-b border-gray-100">
          <Ionicons name="share-social-outline" size={24} color="#333" />
          <Text className="text-lg ml-4">Share</Text>
        </Pressable>

        <Pressable className="flex-row items-center py-3">
          <Ionicons name="call-outline" size={24} color="#333" />
          <Text className="text-lg ml-4">Contact</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  )
}

export default function Home() {
  const bottomSheetRef = React.useRef<BottomSheet>(null)
  const [cartItems, setCartItems] = useState<Record<string, { quantity: number; price: number }>>(
    {}
  )
  const scrollY = useRef(new Animated.Value(0)).current
  const totalCost = Object.values(cartItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const animation = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(animation, {
      toValue: totalCost > 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [totalCost])

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  })

  return (
    <View className="flex-1 bg-background relative">
      <StatusBar translucent backgroundColor="transparent" barStyle="default" />
      <NavBar scrollY={scrollY} />

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
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <>
            <View className="pt-12 px-6 flex-row justify-between">
              <View className="p-2 z-10 bg-white rounded-full">
                <Ionicons name="arrow-back" size={20} color="black" />
              </View>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => router.push('/search')}
                  className="p-2 z-10 bg-white rounded-full">
                  <Ionicons name="search" size={20} color="black" />
                </Pressable>
                <Pressable
                  onPress={() => bottomSheetRef.current?.expand()}
                  className="p-2 z-10 bg-white rounded-full">
                  <Ionicons name="ellipsis-vertical-outline" size={20} color="black" />
                </Pressable>
              </View>
            </View>

            <View className="bg-background rounded-tr-[64px] px-6 mt-12 pt-10">
              <Text className="text-3xl text-gray-900 font-semibold tracking-tight">
                Okoth's Joint
              </Text>
            </View>
          </>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="px-6 bg-white pt-6 pb-2">
            <Text className="font-semibold text-gray-900 text-xl">{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <ListItem item={item} cartItems={cartItems} setCartItems={setCartItems} />
        )}
      />

      <Animated.View
        className="absolute inset-x-16 "
        style={{
          transform: [{ translateY }],
          bottom: 10,
          opacity: animation,
        }}>
        <Link href="/cart" asChild>
          <Pressable
            className="bg-green-600 py-4 rounded-full flex-row justify-center items-center"
            onPress={() => {
              console.log('cartItems', cartItems)
            }}>
            <Text className="text-white font-semibold text-lg">
              View cart • KSh {totalCost.toFixed(0)}
            </Text>
          </Pressable>
        </Link>
      </Animated.View>
      <ButtonSheet bottomSheetRef={bottomSheetRef} />
    </View>
  )
}
