import { Text } from '@/components/general/Themed';
import WorkoutDetailsExerciseItem from '@/components/WorkoutDetailsExerciseItem';
import { useWorkoutStore } from '@/store';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  const workout = useWorkoutStore((state) =>
    state.workouts.find((w) => w.id === id)
  );

  if (!workout) {
    return <Text>Workout not found</Text>;
  }

  return (
    <FlatList
      data={workout.exercises}
      contentContainerStyle={{ gap: 8, padding: 8 }}
      renderItem={({ item }) => <WorkoutDetailsExerciseItem exercise={item} />}
      ListHeaderComponent={
        <React.Fragment>
          <Text style={styles.title}>Workout details</Text>
          <Text style={styles.date}>
            {dayjs(workout.createdAt).format('HH:mm dddd, D MMM')}
          </Text>
        </React.Fragment>
      }
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
});
