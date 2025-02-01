import Card from '@/components/general/Card';
import CustomButton from '@/components/general/CustomButton';
import { Text, View } from '@/components/general/Themed';
import dummyWorkouts from '@/data/dummyWorkouts';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import dayjs from 'dayjs';
import WourkoutSummary from '@/components/general/WourkoutSummary';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, gap: 10 }}>
      <CustomButton title="Start Workout" type="primary" />

      <FlatList
        data={dummyWorkouts}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <Card
            title={dayjs(item.createdAt)
              .format('HH:mm, DD MMM YYYY')
              .toString()}
            href={`/workout/${item.id}`}
          >
            <WourkoutSummary exercises={item.exercises} />
          </Card>
        )}
      />
    </View>
  );
}
