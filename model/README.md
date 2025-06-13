---
license: mit
title: FoodLens
sdk: gradio
emoji: 💻
colorFrom: blue
colorTo: indigo
pinned: false
short_description: Mendeteksi makanan dan merekomendasikan tempat restoran
---
# FoodLens - Indonesian Food Detection and Restaurant Recommendation System

FoodLens adalah aplikasi AI yang dapat mendeteksi makanan Indonesia dari gambar dan memberikan rekomendasi restoran berdasarkan makanan yang terdeteksi.

## Fitur Utama

- Deteksi makanan Indonesia dari gambar
- Rekomendasi restoran berdasarkan makanan yang terdeteksi
- Informasi asal daerah makanan
- Interface web yang mudah digunakan

## Cara Penggunaan

1. Upload gambar makanan Indonesia
2. Sistem akan mendeteksi makanan dalam gambar
3. Dapatkan rekomendasi restoran yang menyajikan makanan tersebut
4. Lihat informasi asal daerah makanan

## Teknologi yang Digunakan

- TensorFlow 2.18.0 untuk model deteksi makanan
- Gradio 3.50.2 untuk interface web
- OpenCV untuk preprocessing gambar
- Scikit-learn untuk sistem rekomendasi
- Pandas untuk pengolahan data
- Keras 3.8.0 untuk model deep learning

## Model yang Digunakan

- Model deteksi makanan: CNN yang dilatih khusus untuk makanan Indonesia
- Sistem rekomendasi: Berbasis data restoran dari restaurant_db.csv

## Struktur Proyek

```
├── app.py              # Aplikasi utama
├── requirements.txt    # Dependensi
├── models/            # Folder model
│   └── model_indonesian_food.h5
└── data/             # Folder data
    ├── restaurant_db.csv
    ├── food_labels.pkl
    └── food_origins.pkl
```

## Cara Menjalankan Lokal

1. Clone repository
2. Buat virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```
3. Install dependensi:
   ```bash
   pip install -r requirements.txt
   ```
4. Jalankan aplikasi:
   ```bash
   python app.py
   ```

## Deployment

Aplikasi ini di-deploy menggunakan Hugging Face Spaces. Anda dapat mengakses versi online di: [https://huggingface.co/spaces/rickysptra24/FoodLens](https://huggingface.co/spaces/rickysptra24/FoodLens)

## Kontribusi

Silakan buat issue atau pull request jika Anda ingin berkontribusi pada proyek ini.

## Lisensi

MIT License
