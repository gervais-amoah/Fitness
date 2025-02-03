import CustomButton from '@/components/general/CustomButton';
import SelectExerciseModal from '@/components/logger/SelectExerciseModal';
import WorkoutExerciseItem from '@/components/logger/WorkoutExerciseItem';
import WorkoutHeader from '@/components/logger/WorkoutHeader';
import { useWorkoutStore } from '@/store';
import { useHeaderHeight } from '@react-navigation/elements';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';

export default function CurrentWorkoutScreen() {
  const headerHeight = useHeaderHeight();

  const currentWorkout = useWorkoutStore((state) => state.currentWorkout);
  const finishWorkout = useWorkoutStore((state) => state.finishWorkout);

  if (!currentWorkout) {
    return <Redirect href="/" />;
  }

  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={finishWorkout}
              title="Finish"
              style={{ padding: 7, paddingHorizontal: 15, width: 'auto' }}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={[1, 2, 3]}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          renderItem={() => <WorkoutExerciseItem />}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExerciseModal
              onSelectExercise={(name) =>
                console.warn('Exercise seleted: ', name)
              }
            />
          }
        />
      </KeyboardAvoidingView>
    </React.Fragment>
  );
}
