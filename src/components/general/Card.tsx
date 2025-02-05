import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { View, Text, useThemeColor } from '@/components/general/Themed';
import { Image } from 'expo-image';
import { exerciseImages } from '@/data/exercises';

type CardProps = {
  title: string;
  children: React.ReactNode;
  image?: string;
  href?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Card({
  title,
  children,
  image,
  href,
  style,
}: CardProps) {
  const tint = useThemeColor({}, 'tint');
  const cardContent = (
    <View style={[styles.card, { borderLeftColor: tint }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {image && (
          <View
            style={{
              width: 65,
              height: 65,
              borderRadius: 5,
              marginRight: 10,
              marginTop: 5,
            }}
          >
            <Image
              source={exerciseImages[image]}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 5,
              }}
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {children}
        </View>
      </View>
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable>{cardContent}</Pressable>
      </Link>
    );
  }
  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderLeftWidth: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
