import { Text, View } from '@/components/general/Themed';
import Colors from '@/constants/Colors';
import { ExerciseWithSets } from '@/types/models';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ExerciseSummary({
  exercise,
}: {
  exercise: ExerciseWithSets;
}) {
  const { name, sets } = exercise;
  const numberOfSets = sets.length;

  const bestSet = sets.reduce((best, current) => {
    if (!best.oneRM) return current;
    if (!current.oneRM) return best;

    if (current.oneRM > best.oneRM) {
      return current;
    }
    return best;
  }, sets[0]);

  return (
    <View style={styles.row}>
      <Text style={styles.bodyRowText}>
        {numberOfSets} x {name}
      </Text>
      {bestSet && (
        <Text style={styles.bodyRowText}>
          {bestSet.reps} x {bestSet.weight} kg
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyRowText: { fontSize: 14, color: Colors.light.tabIconDefault },
});
