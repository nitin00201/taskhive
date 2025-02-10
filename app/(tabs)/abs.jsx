import React, { useState } from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../config/cloudinaryConfig"; 

const ImageUploader = () => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (imageUri) {
      const cloudinaryUrl = await uploadImageToCloudinary(imageUri);
      if (cloudinaryUrl) {
        alert("Image uploaded successfully: " + cloudinaryUrl);
      }
    } else {
      alert("Please select an image first.");
    }
  };

  return (
    <View>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload to Cloudinary" onPress={handleUpload} />
    </View>
  );
};

export default ImageUploader;
