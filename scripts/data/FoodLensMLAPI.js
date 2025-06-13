import { Client } from "@gradio/client";

const FoodLensMLAPI = {
  async predictFood(imageFile) {
    try {
      // Connect to the Hugging Face Space
      const client = await Client.connect("rickysptra24/FoodLens");
      
      // Make prediction
      const result = await client.predict("/predict", [
        imageFile, // Pass the image file directly
      ]);

      console.log('Raw API Response:', result); // Debug log
      return result;
    } catch (error) {
      console.error('Error in FoodLensMLAPI:', error);
      throw new Error('Terjadi kesalahan saat memproses gambar: ' + error.message);
    }
  }
};

export default FoodLensMLAPI;