# FoodLens - Indonesian Food Classification Model

FoodLens adalah model deep learning yang dirancang untuk mengklasifikasikan makanan Indonesia menggunakan arsitektur MobileNetV2. Model ini dapat mengenali berbagai jenis makanan Indonesia dari gambar yang diberikan.

## Dataset

Dataset yang digunakan dalam proyek ini merupakan kombinasi dari:
1. [Indonesian Food Dataset](https://universe.roboflow.com/a-gsuxa/indonesian-food-cd2d4/dataset/8) dari Roboflow Universe
2. [Pempek Computer Vision](https://universe.roboflow.com/ta-4ec3w/7.-pempek/dataset/2) dari Roboflow Universe
3. [image_detection Computer Vision](https://universe.roboflow.com/bangkitcapstone-joitq/image_detection-0zdmd/dataset/2/download) dari Roboflow Universe
4. [Padang Cuisine](https://www.kaggle.com/datasets/faldoae/padangfood) dari Kaggle
5. [Indonesian Food Dataset](https://www.kaggle.com/datasets/rizkyyk/dataset-food-classification) dari Kaggle
6. Dataset tambahan yang dikumpulkan secara mandiri oleh tim pengembang

Dataset ini berisi gambar makanan Indonesia yang diklasifikasikan ke dalam 50 kelas.

Dataset dari Roboflow Universe dilisensikan di bawah [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Tim Pengembang

Proyek ini dikembangkan oleh:
1. Ricky Saputra (ML) - [hirikyc](https://github.com/hirikyc)
2. Ch Angga Marcelio (ML) - [AnggaMarcelio](https://github.com/AnggaMarcelio)
3. Syavira Amalia (ML) - [SyaviraAmalia](https://github.com/SyaviraAmalia)
4. Ahmad Husein Assalam (FEBE) - [Husen28](https://github.com/Husen28)
5. Nadia Damayanti (FEBE) - [nadia29d](https://github.com/nadia29d)
6. Rihhadatul Aisy Al Fitri (FEBE) - [RihhadatulAisyAlFitri](https://github.com/RihhadatulAisyAlFitri)

## Fitur

- Klasifikasi makanan Indonesia menggunakan MobileNetV2
- Data augmentation untuk meningkatkan performa model
- Evaluasi model dengan confusion matrix dan classification report
- Visualisasi hasil prediksi
- Mendukung format model Keras (.keras) dan HDF5 (.h5)

## Persyaratan Sistem

- Python 3.8 atau lebih tinggi
- GPU (disarankan untuk training yang lebih cepat)
- RAM minimal 8GB

## Instalasi

1. Clone repository ini:
```bash
git clone https://github.com/hiirikyc/foodlens.git
cd foodlens
```

2. Buat virtual environment (opsional tapi disarankan):
```bash
python -m venv venv
source venv/bin/activate  # Untuk Linux/Mac
venv\Scripts\activate     # Untuk Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Struktur Dataset

Dataset harus disusun dalam format berikut:
```
dataset_indonesian_food/
├── makanan1/
│   ├── gambar1.jpg
│   ├── gambar2.jpg
│   └── ...
├── makanan2/
│   ├── gambar1.jpg
│   ├── gambar2.jpg
│   └── ...
└── ...
```

## Penggunaan

1. Siapkan dataset Anda sesuai dengan struktur yang disebutkan di atas
2. Jalankan script training:
```bash
python Scripts/foodlens.py
```

## Arsitektur Model

Model menggunakan arsitektur MobileNetV2 dengan beberapa modifikasi:
- Base model: MobileNetV2 (pretrained dengan ImageNet)
- Additional layers:
  - Conv2D (64 filters)
  - BatchNormalization
  - MaxPooling2D
  - Conv2D (128 filters)
  - BatchNormalization
  - MaxPooling2D
  - GlobalAveragePooling2D
  - Dense (64 units)
  - Dropout (0.3)
  - Output layer (50 kelas)

## Training

Model dilatih dengan parameter berikut:
- Optimizer: Adam (learning rate = 1e-4)
- Loss function: Categorical Crossentropy
- Batch size: 32
- Epochs: 100 (dengan early stopping)
- Data augmentation:
  - Rotation range: 20°
  - Width/Height shift: 0.2
  - Horizontal flip: True

## Evaluasi

Model dievaluasi menggunakan:
- Confusion Matrix
- Classification Report
- Training & Validation Accuracy Plot

## Output

Model akan menghasilkan beberapa file:
- `model_indonesian_food.keras`: Model dalam format Keras
- `model_indonesian_food.h5`: Model dalam format HDF5
- `food_annotations.csv`: File anotasi dataset

## Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau buka issue untuk diskusi.

## Kontak

Untuk pertanyaan atau kolaborasi, silakan hubungi salah satu anggota tim:
- Ricky Saputra: rickysptra24@gmail.com
- Ch Angga Marcelio: chmarcel0603@gmail.com
- Syavira Amalia: syaviraamalia53@gmail.com
- Ahmad Husein Assalam: reddevils28082005@gmail.com
- Nadia Damayanti: nadiadamayanti0929@gmail.com
- Rihhadatul Aisy Al Fitri: alfitriaisy@gmail.com 
