import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePostScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    // Validate form
    if (!image) {
      Alert.alert('Error', 'Please add an image of your meal');
      return;
    }

    if (!mealName) {
      Alert.alert('Error', 'Please enter a meal name');
      return;
    }

    if (!calories) {
      Alert.alert('Error', 'Please enter calories');
      return;
    }

    // For demo purposes, just show success and go back
    Alert.alert(
      'Success',
      'Your meal has been posted!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Post</Text>
          <TouchableOpacity onPress={handlePost}>
            <Text style={[styles.postButton, (!image || !mealName || !calories) && styles.postButtonDisabled]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TouchableOpacity 
            style={[styles.imageContainer, !image && styles.imagePlaceholder]}
            onPress={pickImage}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholderContent}>
                <Ionicons name="camera-outline" size={32} color="#fff" />
                <Text style={styles.imagePlaceholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Meal Name</Text>
            <TextInput
              style={styles.input}
              placeholder="What did you eat?"
              placeholderTextColor="#6b7280"
              value={mealName}
              onChangeText={setMealName}
            />
          </View>

          <View style={styles.macrosContainer}>
            <View style={styles.macroInput}>
              <Text style={styles.label}>Calories</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
              />
            </View>

            <View style={styles.macroInput}>
              <Text style={styles.label}>Protein (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={protein}
                onChangeText={setProtein}
              />
            </View>

            <View style={styles.macroInput}>
              <Text style={styles.label}>Carbs (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={carbs}
                onChangeText={setCarbs}
              />
            </View>

            <View style={styles.macroInput}>
              <Text style={styles.label}>Fat (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={fat}
                onChangeText={setFat}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Caption</Text>
            <TextInput
              style={[styles.input, styles.captionInput]}
              placeholder="Write a caption..."
              placeholderTextColor="#6b7280"
              multiline
              value={caption}
              onChangeText={setCaption}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  postButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  form: {
    padding: 16,
    gap: 24,
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    backgroundColor: '#1f1f1f',
    borderWidth: 1,
    borderColor: '#2f2f2f',
    borderStyle: 'dashed',
  },
  imagePlaceholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  imagePlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2f2f2f',
  },
  captionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  macrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  macroInput: {
    flex: 1,
    minWidth: '45%',
    gap: 8,
  },
}); 