# FoodLens - Indonesian Food Classification & Recommendation API

FoodLens adalah API untuk deteksi makanan dan rekomendasi restoran menggunakan teknologi machine learning. API ini dapat mendeteksi berbagai jenis makanan Indonesia dan memberikan rekomendasi restoran yang menyajikan makanan tersebut.

## Tim Pengembang

Proyek ini dikembangkan oleh:
1. Ricky Saputra (ML) - [hirikyc](https://github.com/hirikyc)
2. Ch Angga Marcelio (ML) - [AnggaMarcelio](https://github.com/AnggaMarcelio)
3. Syavira Amalia (ML) - [SyaviraAmalia](https://github.com/SyaviraAmalia)
4. Ahmad Husein Assalam (FEBE) - [Husen28](https://github.com/Husen28)
5. Nadia Damayanti (FEBE) - [nadia29d](https://github.com/nadia29d)
6. Rihhadatul Aisy Al Fitri (FEBE) - [RihhadatulAisyAlFitri](https://github.com/RihhadatulAisyAlFitri)

## Fitur

- **Deteksi Makanan**: Mengidentifikasi makanan dari gambar yang diunggah
- **Informasi Asal**: Menampilkan asal daerah dari makanan yang terdeteksi
- **Rekomendasi Restoran**: Memberikan rekomendasi restoran berdasarkan makanan yang terdeteksi

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

## Struktur Proyek

```
model/
├── app.py                 # File utama FastAPI
├── requirements.txt       # Library Model
├── README.md              # Wajib digunakan ketika menggunakan huggingface
├── models/
    ├── model_indonesian_food.h5    # Model deteksi makanan
└── data/
    ├── food_labels.pkl     # Label makanan
    ├── food_origins.pkl    # Data asal makanan
    └── restaurant_db.csv   # Database restoran
src/
├── index.html
├── backend
    ├── db.js
    ├── index.js
    ├── package-lock.json
    ├── vercel.json
├── public
    ├── images
    ├── _redirects
    ├── manifest.json
    ├── service-worket.js
├── scripts
    ├── config.js
    ├── index.js
    ├── data
        ├── FoodLensLoginAPI.js
        ├── FoodLensMLAPI.js
    ├── pages
    ├── routes
        ├── config.js
        ├── index.js
    ├── utils
        ├── auth.js
        ├── index.js
└── styles
    ├── responsive.css
    └── styles.css
```

## Persyaratan Sistem

- Python 3.11 atau lebih baru
- FastAPI
- TensorFlow
- OpenCV
- scikit-learn
- uvicorn
- python-multipart
- RAM minimal 8GB
- GPU (disarankan untuk training yang lebih cepat)

## Instalasi

1. Clone repository:
```bash
git clone https://github.com/hirikyc/FoodLens
cd FoodLens
```

2. Buat virtual environment (opsional tapi disarankan):
```bash
python -m venv venv
source venv/bin/activate  # Untuk Linux/Mac
venv\Scripts\activate     # Untuk Windows
```

3. Instal dependensi:
```bash
pip install fastapi uvicorn python-multipart tensorflow opencv-python scikit-learn
```

## Menjalankan Aplikasi

1. Masuk ke direktori aplikasi:
```bash
cd app
```

2. Jalankan server:
```bash
python3 main.py
```

Server akan berjalan di `http://localhost:8000`

## API Endpoints

### 1. Deteksi Makanan
- **URL**: `/detect`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**: 
  - `file`: File gambar (jpg, jpeg, png)
- **Response**:
```json
{
    "detection": {
        "food_name": "nama_makanan",
        "origin": "asal_daerah",
        "confidence": 0.95,
        "top_predictions": [
            {
                "food_name": "nama_makanan",
                "confidence": 0.95,
                "origin": "asal_daerah"
            }
        ]
    },
    "recommendations": [
        {
            "name": "nama_restoran",
            "cuisine": "jenis_masakan",
            "rating": 4.5,
            "similarity_score": 0.85
        }
    ]
}
```

### 2. Rekomendasi Restoran
- **URL**: `/recommend/{food_name}`
- **Method**: `GET`
- **Response**: Daftar restoran yang direkomendasikan

### 3. Halaman Upload
- **URL**: `/detect`
- **Method**: `GET`
- **Response**: Halaman HTML untuk upload gambar

## Dokumentasi API

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Contoh Integrasi

### Menggunakan JavaScript/Fetch
```javascript
// Upload gambar untuk deteksi
async function detectFood(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('http://localhost:8000/detect', {
        method: 'POST',
        body: formData
    });
    return await response.json();
}

// Mendapatkan rekomendasi restoran
async function getRecommendations(foodName) {
    const response = await fetch(`http://localhost:8000/recommend/${foodName}`);
    return await response.json();
}
```

### Menggunakan Python/Requests
```python
import requests

# Upload gambar untuk deteksi
def detect_food(image_path):
    with open(image_path, 'rb') as f:
        files = {'file': f}
        response = requests.post('http://localhost:8000/detect', files=files)
    return response.json()

# Mendapatkan rekomendasi restoran
def get_recommendations(food_name):
    response = requests.get(f'http://localhost:8000/recommend/{food_name}')
    return response.json()
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

## File yang Diberikan ke Tim Backend

Berikut adalah file-file yang perlu diberikan ke tim backend untuk diintegrasikan dengan website:

1. **File Utama API**:
   - `app/main.py` - File utama FastAPI yang berisi semua endpoint dan logika aplikasi

2. **File Model**:
   - `app/models/food_detection.keras` - Model untuk deteksi makanan
   - `app/models/recommendation_system.pkl` - Model untuk sistem rekomendasi restoran

3. **File Data**:
   - `app/data/food_labels.pkl` - Berisi label-label makanan
   - `app/data/food_origins.pkl` - Berisi informasi asal daerah makanan
   - `app/data/restaurant_db.csv` - Database restoran

4. **File Dokumentasi**:
   - `README.md` - Dokumentasi lengkap tentang cara menggunakan API

Tim backend perlu memastikan:
1. Semua dependensi terinstal sesuai yang tercantum di README.md
2. Struktur folder tetap sama seperti di atas
3. Menggunakan Python 3.11 atau lebih baru
4. Menjalankan aplikasi dengan perintah `python3 main.py` di dalam folder `app`

## Kontak

Untuk pertanyaan atau kolaborasi, silakan hubungi salah satu anggota tim:
- Ricky Saputra: rickysptra24@gmail.com
- Ch Angga Marcelio: chmarcel0603@gmail.com
- Syavira Amalia: syaviraamalia53@gmail.com
- Ahmad Husein Assalam: reddevils28082005@gmail.com
- Nadia Damayanti: nadiadamayanti0929@gmail.com
- Rihhadatul Aisy Al Fitri: alfitriaisy@gmail.com 
