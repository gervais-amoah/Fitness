import CustomButton from '@/components/general/CustomButton';
import { View } from '@/components/general/Themed';
import WorkoutListItem from '@/components/WorkoutListItem';
import { useWorkoutStore } from '@/store';
import { Link, router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const currentWorkout = useWorkoutStore((state) => state.currentWorkout);
  const startWorkout = useWorkoutStore((state) => state.startWorkout);
  const workouts = useWorkoutStore((state) => state.workouts);

  const onStartWorkout = () => {
    startWorkout();
    router.push('/workout/current');
  };

  return (
    <View style={styles.container}>
      {currentWorkout ? (
        <Link href="/workout/current" asChild>
          <CustomButton title="Resume Workout" type="primary" />
        </Link>
      ) : (
        <CustomButton
          title="Start new Workout"
          type="primary"
          onPress={onStartWorkout}
        />
      )}

      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
});
