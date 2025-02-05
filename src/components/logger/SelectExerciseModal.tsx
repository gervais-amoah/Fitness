import Card from '@/components/general/Card';
import CustomButton from '@/components/general/CustomButton';
import { Text, TextInput, View } from '@/components/general/Themed';
import exercises, { exerciseImages } from '@/data/exercises';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet } from 'react-native';

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
              contentContainerStyle={{ gap: 20 }}
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
                  <View style={{ width: 50, height: 50 }}>
                    <Image
                      source={exerciseImages[item.id]}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 5,
                      }}
                    />
                  </View>
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
