import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import { Animated, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStore } from 'utils/store'

export default function Cart() {
  const insets = useSafeAreaInsets()
  const cartItems = useStore((state) => state.cartItems)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const addToCart = useStore((state) => state.addToCart)
  const useTotalCost = useStore((state) => state.getTotalCost)
  const totalCost = useTotalCost()
  const animation = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
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
    <View
      style={{ paddingTop: insets.top + 16 }}
      className="flex-1 bg-background relative px-6 py-2 flex-col">
      <View className="flex-row items-center justify-between">
        <Pressable onPress={router.back}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-semibold">Cart</Text>
        <View />
      </View>

      <View className="mt-10">
        <Text className="text-xl font-bold text-gray-900">Your Cart</Text>
        <Text className="text-sm text-gray-500">{Object.keys(cartItems).length} items in cart</Text>
      </View>

      <View className="flex-col gap-6 mt-10">
        {Object.values(cartItems).map((item, index) => (
          <View key={index} className="flex-row items-center gap-4 h-20">
            <Image
              source={item.photo}
              style={{ width: 72, height: 72, borderRadius: 12 }}
              contentFit="cover"
            />
            <View className="flex-1 flex-col gap-2 h-full">
              <Text className="">{item.name}</Text>
              <Text className="font-semibold ">
                KSh {(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>

            <View className="flex-row w-24 justify-end">
              <Pressable
                onPress={() => removeFromCart(item.name)}
                className="rounded-full bg-gray-100 p-1 items-center justify-center">
                <Ionicons name="remove" size={16} color="#374151" />
              </Pressable>

              <Text className="mx-2 font-medium text-base min-w-6 text-center">
                {item.quantity}
              </Text>

              <Pressable
                onPress={() => addToCart(item)}
                className="rounded-full bg-green-200 p-1 items-center justify-center">
                <Ionicons name="add" size={16} color="#1a7c3a" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <Animated.View
        className="absolute inset-x-16 "
        style={{
          transform: [{ translateY }],
          bottom: 10,
          opacity: animation,
        }}>
        <Link href={{ pathname: '/cart' }} asChild>
          <Pressable
            className="bg-green-600 py-4 rounded-full flex-row justify-center items-center"
            onPress={() => {
              console.log('cartItems', cartItems)
            }}>
            <Text className="text-white font-semibold text-lg">
              Go to checkout KSh {totalCost.toLocaleString()}
            </Text>
          </Pressable>
        </Link>
      </Animated.View>
    </View>
  )
}
