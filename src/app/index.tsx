import CustomButton from '@/components/general/CustomButton';
import { View } from '@/components/general/Themed';
import WorkoutListItem from '@/components/WorkoutListItem';
import dummyWorkouts from '@/data/dummyWorkouts';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

export default function HomeScreen() {
  return (
    <View
      style={{ flex: 1, gap: 10, padding: 10, backgroundColor: 'transparent' }}
    >
      <Link href="/workout/current" asChild>
        <CustomButton title="Resume Workout" type="primary" />
      </Link>
      <CustomButton title="Start new Workout" type="primary" />

      <FlatList
        data={dummyWorkouts}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
      />
    </View>
  );
}
