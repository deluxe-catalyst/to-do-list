import axios from 'axios';

// Создание экземпляра axios
const instance = axios.create({
  baseURL: 'https://todo-list.edu-playground.ru/api/v1', // URL по умолчанию
  timeout: 1500,
});

// Добавление запроса наблюдателя
instance.interceptors.request.use(function (config) {
 // Делаем что-то перед отправкой запроса
 const token = localStorage.getItem('token'); // Получите токен откуда-нибудь. Пример localstorage
 config.headers['X-Base-Auth'] = token;
 return config;
}, function (error) {
 // Обработка ошибки запроса
 return Promise.reject(error);
});

//// Добавление наблюдателя ответа
instance.interceptors.response.use(function (response) {
 return response;
}, function (error) {
 console.log(error);

 //// Обработка ошибок ответа
 if (error.response.status === 401) {
  // Можно, например, обработать ошибку аутентификации
 }    
 return Promise.reject(error);
});

// Экспорт готового экземпляра для переиспользования
export default instance;
