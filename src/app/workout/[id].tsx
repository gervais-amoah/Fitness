import Card from '@/components/general/Card';
import { Text, View } from '@/components/general/Themed';
import dummyWorkouts from '@/data/dummyWorkouts';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  const workout = dummyWorkouts.find((workout) => workout.id === id);

  if (!workout)
    return (
      <View>
        <Text>Workout not found</Text>
      </View>
    );

  return (
    <View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 20, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
          Workout Details
        </Text>
        <Text style={{ fontSize: 14 }}>9 minutes ago</Text>
      </View>
      <FlatList
        data={workout.exercises}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <Card title={item.name}>
            <View>
              {item.sets.map((set) => (
                <View key={set.id} style={{ gap: 5 }}>
                  <Text>{set.weight}</Text>
                  <Text>{set.reps} reps</Text>
                </View>
              ))}
            </View>
          </Card>
        )}
      />
    </View>
  );
}
