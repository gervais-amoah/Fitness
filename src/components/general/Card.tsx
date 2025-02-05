import { Text, useThemeColor, View } from '@/components/general/Themed';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import ExerciseImage from './ExerciseImage';

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
      {image ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <ExerciseImage imageKey={image} style={{ width: 65, height: 65 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            {children}
          </View>
        </View>
      ) : (
        <React.Fragment>
          <Text style={styles.title}>{title}</Text>
          {children}
        </React.Fragment>
      )}
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
