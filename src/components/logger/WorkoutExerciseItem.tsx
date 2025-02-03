import Card from '@/components/general/Card';
import { Text, View } from '@/components/general/Themed';
import { useWorkoutStore } from '@/store';
import { ExerciseWithSets } from '@/types/models';
import { StyleSheet } from 'react-native';
import CustomButton from '../general/CustomButton';
import SetItem from './SetItem';

export default function WorkoutExerciseItem({
  exercise,
}: {
  exercise: ExerciseWithSets;
}) {
  const addSet = useWorkoutStore().addSet;

  return (
    <Card title={exercise.name}>
      <View style={styles.header}>
        <Text style={styles.setNumber}>Set</Text>
        <Text style={styles.setInfo}>kg</Text>
        <Text style={styles.setInfo}>Reps</Text>
      </View>
      <View style={{ gap: 5 }}>
        {exercise.sets.map((item, index) => (
          <SetItem key={item.id} index={index} set={item} />
        ))}
      </View>
      <CustomButton
        onPress={() => addSet(exercise.id)}
        type="link"
        title="+ Add set"
        style={{ padding: 10, marginTop: 10 }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 5,
  },
  setNumber: {
    marginRight: 'auto',
    fontWeight: 'bold',
  },
  setInfo: {
    width: 60,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
