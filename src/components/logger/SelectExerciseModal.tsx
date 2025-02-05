import Card from '@/components/general/Card';
import CustomButton from '@/components/general/CustomButton';
import { Text, TextInput, View } from '@/components/general/Themed';
import exercises from '@/data/exercises';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet } from 'react-native';
import ExerciseImage from '../general/ExerciseImage';

type SelectExerciseModal = {
  onSelectExercise: (name: string) => void;
};

export default function SelectExerciseModal({
  onSelectExercise,
}: SelectExerciseModal) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <React.Fragment>
      <CustomButton
        title="Select exercise"
        onPress={() => setIsOpen(true)}
        style={{ marginBottom: 15 }}
      />

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Card title="Select exercise" style={styles.modalContent}>
            <AntDesign
              name="close"
              onPress={() => setIsOpen(false)}
              size={20}
              color="gray"
              style={styles.closeButton}
            />

            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />

            <FlatList
              data={filteredExercises}
              style={{ flexGrow: 1 }}
              contentContainerStyle={{
                gap: 20,
              }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelectExercise(item.name);
                    setIsOpen(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <ExerciseImage
                    imageKey={item.id}
                    style={{ width: 50, height: 50 }}
                  />
                  <View style={{ gap: 3 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: 'gray' }}>{item.muscle}</Text>
                  </View>
                </Pressable>
              )}
            />
          </Card>
        </View>
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    paddingBottom: 20,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  input: {
    padding: 10,
    marginVertical: 10,
  },
});
