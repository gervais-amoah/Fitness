import { Text, View } from '@/components/general/Themed';
import Colors from '@/constants/Colors';
import { WorkoutWithExercises } from '@/types/models';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet } from 'react-native';
import ExerciseSummary from './ExerciseSummary';
import Card from './general/Card';

export default function WorkoutListItem({
  workout,
}: {
  workout: WorkoutWithExercises;
}) {
  const time = dayjs(workout.createdAt).format('HH:mm, DD MMM YYYY');

  const durationInSeconds = dayjs(workout.finishedAt).diff(
    dayjs(workout.createdAt),
    'seconds'
  );
  const formattedDuration = dayjs(durationInSeconds * 1000).format('mm:ss');

  const totalWeight = workout.exercises.reduce((total, exercise) => {
    return (
      total +
      exercise.sets.reduce((totalSet, set) => {
        return totalSet + (set.weight ?? 0);
      }, 0)
    );
  }, 0);

  return (
    <Card title={time} href={`/workout/${workout.id}`}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Exercise</Text>
          <Text style={styles.headerText}>Best set</Text>
        </View>
        {workout.exercises.map((exercise) => {
          return <ExerciseSummary key={exercise.id} exercise={exercise} />;
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <MaterialCommunityIcons
            name="timer"
            size={18}
            color={Colors.light.tabIconDefault}
          />
          <Text style={styles.footerText}>{formattedDuration}</Text>
        </View>
        <View style={styles.footerRow}>
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={18}
            color={Colors.light.tabIconDefault}
          />
          <Text style={styles.footerText}>{totalWeight}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 5,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  headerText: { fontWeight: 'bold', fontSize: 16 },
  footer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    paddingTop: 5,
    borderTopColor: Colors.light.tabIconDefault,
    borderTopWidth: 1,
  },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  footerText: { fontSize: 14 },
});
