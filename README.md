## IT's Tinkoff Frontend BBQ party

### Извлекаем максимум пользы из Unit тестирования (проект)

### Преза тут

```./tinkoff_front_meetup_trofimov.pdf```

### Телега для связи

[Телега пишите по любым вопросам](https://t.me/reatrof)

### Запуск проект
```
    npm i
    npm run start
```

сторибук
```
    npm run storybook
```

jest

```
    npm run test
```

После запуска в папке /allure-results будут сгенерированы xml файлы для алюра

Запуск отчета в алюре
```
    brew install allure
    allure serve
```

loki
```
    npx loki init
    npx loki update
    npx loki test
```

### Полезные материалы

1. [Трофей тестирования фронтенда](https://amorgunov.com/posts/2023-04-01-testing-trophy/)
2. [Про разделение архитектуры react приложений от мартина фаулера](https://martinfowler.com/articles/modularizing-react-apps.html)
3. [Про пирамиду тестирования](https://martinfowler.com/articles/practical-test-pyramid.html#ToolsAndLibrariesWellLookAt)
4. Хорошая книга [Принципы юнит тестирования](https://www.ozon.ru/product/printsipy-yunit-testirovaniya-horikov-vladimir-211424826/?asb=SUQL0brj02pZszt4UDWmxiBnhik2OWOtb4N1BvPHpfc%253D&asb2=nzCn1BsQarB8UZTz2CAhMF8xAFnAQWlM49hS0GIfkvkIxWNBGfdNd6yu0uXYCUQG&avtc=1&avte=2&avts=1689622991&keywords=%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B+unit+%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F&sh=wsjPKTH-yQ)

### Инструменты тестирования

1. [Testing library](https://testing-library.com/)
2. [Storybook](https://storybook.js.org/docs/react/writing-tests/introduction)
3. [Jest-allure генерация отчета в аюле](https://github.com/zaqqaz/jest-allure)


### Инструменты мокирования API

1. https://github.com/miragejs/miragejs
2. https://github.com/mswjs/msw
3. https://github.com/nock/nock
4. https://github.com/ctimmerm/axios-mock-adapter

### Инструменты для скриншот тестирования

1. https://github.com/creevey/creevey#how-to-start
2. https://loki.js.org/
3. https://storybook.js.org/addons/@storybook/addon-storyshots
4. https://www.chromatic.com/
5. https://percy.io/
6. https://garris.github.io/BackstopJS/

