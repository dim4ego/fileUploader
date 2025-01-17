const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Настройка хранилища для загружаемых файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Папка для сохранения файлов
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  }
});
const upload = multer({ storage });

// Создайте папку для хранения файлов
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Маршрут для загрузки файла
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(`Файл загружен: ${req.file.filename}`);
  res.send('Файл успешно загружен!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
