# FoodLens - Indonesian Food Classification & Recommendation

FoodLens adalah Aplikasi Website untuk deteksi makanan dan rekomendasi restoran menggunakan teknologi machine learning. Foodlens dapat mendeteksi berbagai jenis makanan Indonesia dan memberikan rekomendasi restoran yang menyajikan makanan tersebut.

## Deployment

- **Machine Learning Model**: [Hugging Face Spaces](https://huggingface.co/spaces/rickysptra24/FoodLens)
- **Website**: [Netlify](https://guileless-quokka-c0da21.netlify.app/)

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

Link Dataset dapat di akses disini: [Dataset](https://drive.google.com/drive/folders/1WOJlFzG9wgAUrcxC7kMQIiCF13MHea8d?usp=sharing)

Dataset dari Roboflow Universe dilisensikan di bawah [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Struktur Proyek

```
├── model/                  # Machine Learning Model
│   ├── app.py             # FastAPI untuk ML model
│   ├── requirements.txt   # Dependencies Python untuk ML
│   ├── models/           # Model ML
│   └── data/            # Data files
├── src/                  # Frontend dan Backend
│   ├── index.html       # Halaman utama
│   ├── backend/         # Backend API
│   │   ├── db.js       # Database configuration
│   │   ├── index.js    # Main backend server
│   │   └── vercel.json # Deployment config
│   ├── public/         # Static assets
│   ├── scripts/        # Frontend JavaScript
│   │   ├── data/      # API integrations
│   │   ├── pages/     # Frontend pages
│   │   ├── routes/    # Routing configuration
│   │   └── utils/     # Utility functions
│   └── styles/         # CSS styles
├── package.json        # Node.js dependencies
└── vite.config.js     # Vite configuration
```

## Persyaratan Sistem

### Machine Learning (Python)
- Python 3.11 atau lebih baru
- Dependencies (lihat model/requirements.txt):
  - gradio==3.50.2
  - tensorflow==2.18.0
  - keras==3.8.0
  - numpy==1.26.4
  - opencv-python-headless==4.8.0.76
  - scikit-learn==1.3.0
  - pandas==2.0.0
  - h5py>=3.11.0
  - protobuf>=3.20.3
  - markupsafe==2.1.5

### Backend & Frontend (Node.js)
- Node.js 16.x atau lebih baru
- Dependencies (lihat package.json):
  - @gradio/client
  - vite
  - jsonwebtoken
  - pg

## Instalasi

1. Clone repository:
```bash
git clone https://github.com/hirikyc/FoodLens
cd FoodLens
```

2. Setup Machine Learning Model:
```bash
cd model
# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Untuk Windows:
venv\Scripts\activate
# Untuk Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Pastikan model sudah ada di folder models/
# Jika belum, download model dari link dataset
```

3. Setup Backend & Frontend:
```bash
cd src
# Install dependencies Node.js
npm install

# Pastikan file .env sudah dikonfigurasi dengan benar
# Contoh isi .env:
# DATABASE_URL=your_database_url
# JWT_SECRET=your_jwt_secret
```

## Menjalankan Aplikasi

Untuk menjalankan aplikasi secara lokal, Anda perlu menjalankan ketiga komponen (ML Model, Backend, dan Frontend) secara terpisah:

1. Menjalankan Machine Learning Model:
```bash
cd model
# Pastikan virtual environment sudah aktif
python app.py
```
ML Model akan berjalan di `http://localhost:7860`

2. Menjalankan Backend:
```bash
cd src/backend
npm start
```
Backend API akan berjalan di `http://localhost:8000`

3. Menjalankan Frontend:
```bash
cd src
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`

### Catatan Penting:
- Pastikan semua port (7860, 8000, 5173) tidak digunakan oleh aplikasi lain
- Pastikan semua dependencies sudah terinstall dengan benar
- Pastikan file konfigurasi (.env) sudah diatur dengan benar
- Untuk pengembangan, Anda bisa menjalankan ketiga komponen di terminal terpisah
- Untuk production, gunakan deployment yang sudah disediakan di Hugging Face dan Netlify

## Deployment

### Machine Learning Model
Model machine learning di-deploy menggunakan Hugging Face Spaces:
1. Buat akun di [Hugging Face](https://huggingface.co)
2. Buat Space baru dengan tipe Gradio
3. Upload semua file dari folder `model/` ke Space
4. Space akan otomatis menjalankan model dan menyediakan API endpoint

### Website
Website di-deploy menggunakan Netlify:
1. Buat akun di [Netlify](https://netlify.com)
2. Hubungkan repository GitHub
3. Konfigurasi build settings:
   - Build command: `cd src && npm run build`
   - Publish directory: `src/dist`
4. Deploy website

## API Endpoints

### 1. Deteksi Makanan (ML Model)
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

### 2. Rekomendasi Restoran (Backend)
- **URL**: `/recommend/{food_name}`
- **Method**: `GET`
- **Response**: Daftar restoran yang direkomendasikan

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

## Kontak

Untuk pertanyaan atau kolaborasi, silakan hubungi salah satu anggota tim:
- Ricky Saputra: rickysptra24@gmail.com
- Ch Angga Marcelio: chmarcel0603@gmail.com
- Syavira Amalia: syaviraamalia53@gmail.com
- Ahmad Husein Assalam: reddevils28082005@gmail.com
- Nadia Damayanti: nadiadamayanti0929@gmail.com
- Rihhadatul Aisy Al Fitri: alfitriaisy@gmail.com 
