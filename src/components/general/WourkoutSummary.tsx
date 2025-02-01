import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/general/Themed';

import React from 'react';
import Colors from '@/constants/Colors';
import { ExerciseWithSets } from '@/types/models';

export default function WourkoutSummary({
  exercises,
}: {
  exercises: ExerciseWithSets[];
}) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Exercise</Text>
        <Text style={styles.headerText}>Best set</Text>
      </View>

      <View>
        {exercises.map((exercise) => {
          return (
            <View style={styles.bodyRow} key={exercise.id}>
              <Text style={styles.bodyRowText}>
                {exercise.sets.length} x {exercise.name}
              </Text>
              <Text style={styles.bodyRowText}>7 x 75 kg</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  headerText: { fontWeight: 'bold', fontSize: 16 },
  bodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyRowText: { fontSize: 14, color: Colors.light.tabIconDefault },
});
