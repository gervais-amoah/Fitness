import { View } from '@/components/general/Themed';
import { exerciseImages } from '@/data/exercises';
import { Image } from 'expo-image';
import { StyleSheet, ViewStyle } from 'react-native';

type ExerciseImage = {
  imageKey: string;
  style?: ViewStyle;
};

export default function ExerciseImage({ imageKey, style }: ExerciseImage) {
  return (
    <View style={[styles.imageWrapper, style]}>
      <Image source={exerciseImages[imageKey]} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: 5,
    marginRight: 10,
    marginTop: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
