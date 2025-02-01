import { View, Text } from '@/components/general/Themed';
import React from 'react';

export default function WorkoutListItem() {
  return (
    <View>
      <Text>15:08 Monday, 23 Sep 2025</Text>
      <View>
        <Text>Exercise</Text>
        <Text>Best set</Text>
      </View>

      <View>
        <View>
          <Text>3 x Barbell Row</Text>
          <Text>7 x 75 kg</Text>
        </View>
        <View>
          <Text>3 x Romanian Deadlift</Text>
          <Text>5 x 150 kg</Text>
        </View>
        <View>
          <Text>3 x Les Press</Text>
          <Text>3 x 150 kg</Text>
        </View>
        <View>
          <Text>3 x Pull-up</Text>
          <Text></Text>
        </View>
      </View>

      <View>
        <View>
          <Text>⌚</Text>
          <Text>07:05</Text>
        </View>
        <View>
          <Text>🏋🏾</Text>
          <Text>7002 kg</Text>
        </View>
      </View>
    </View>
  );
}
