const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Путь к файлу для отправки
const filePath = './example.txt'; // Укажите путь к вашему файлу
const serverUrl = 'http://<server-ip>:3000/upload'; // Укажите IP-адрес сервера

async function uploadFile() {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post(serverUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log('Ответ сервера:', response.data);
  } catch (error) {
    console.error('Ошибка при отправке файла:', error.message);
  }
}

uploadFile();
