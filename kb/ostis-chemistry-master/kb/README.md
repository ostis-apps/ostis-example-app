# Inorganic Chemistry Knowledge Base
База знаний проекта по химии 0-zone

### Содержание

1. [Инструкция по созданию своей копии базы](#instruction)
2. [Установка системы](#installing)
3. [Запуск системы](#start)
4. [Клонирование базы](#emptycloning)
6. [Отправка изменений](#pushing)
7. [Получение изменений](#pulling)
11. [Краткая информация о содержимом](#content)

### <a name="instruction"></a> Инструкция по созданию своей копии базы
- Форкнуть себе репозиторий

### <a name="installing"></a> Установка системы
Для установки нужен Ubuntu-like линукс. В терминале:
```bash
$ git clone https://github.com/ShunkevichDV/ostis
$ cd ostis/scripts
$ ./prepare.sh
```
Везде, где просит, соглашаемся, вводим пароль и т.д.

### <a name="start"></a> Запуск системы
Открываем терминал
```bash
$ cd [название папки]/scripts
$ ./restart_sctp.sh
```
Открываем новую вкладку (CTRL + SHIFT + T)
```bash
$ ./run_scweb.sh
```
Открываем браузер и вводим адрес
```bash
localhost:8000
```

### <a name="emptycloning"></a> Клонирование базы
Открываем терминал
```sh
$ cd [название папки]
```
ВНИМАНИЕ!!! Следующая команда удалит папку kb со всем её содержимым
```sh
$ rm -rf  kb
$ git clone [ссылка на ваш форк] kb
$ cd kb
$ git remote add base https://github.com/ARtoriouSs/chemistry-kb
```

### <a name="pushing"></a> Отправка изменений
Тру химчата умеют пушить на ремоут -_-

- Создать пуллреквест c комментарием в формате:
> [Имя Фамилия] Комментарий.

### <a name="pulling"></a> Получение изменений
- Изменения на ветке master должны быть закомичены и, желательно, приняты мной
```sh
$ git checkout master
$ git pull origin master
$ git checkout [ваша ветка]
$ git rebase master
```
Если есть конфликты, аккуратно решаем так чтобы ничего не сломать.

### <a name="content"></a> Краткая информация о содержимом
- Agents - папка с агентами
    - Proc - процедуры, используемые в агентах
    - Test - тестовые примеры для запуска агентов (вещества и др.)
- Concepts - папка с понятиями (все понятия нужно переместить в разделы и удалить)
- Elements - папка с химическими элементами (все элементы нужно переместить в соответствующие разделы и удалить)
- Sections - декомпозиция базы
- Additional - папка с понятиями, которые не относятся к основным разделам
    - Const - химические константы
	- Parameters - параметры (степени окисления, группы, периоды, числа)
	- minerals.scs - минералы
	- other.scs - понятия, которых нет в базе, но есть идентификатор
- Menu - элементы меню (вопросы, агенты)
    - ui_view_kb_chemistry/lib_ui_menu_na_kb_chemistry.scs - список команд для химии
    - ui_view_kb_chemistry/ui_menu_na_view_kb_chemistry.scsi - список команд для химии (сюда добавляются агенты)
    - table.html - периодическая таблица
    - ui_main_menu.scs - хедер страниц
    - ui_menu_na_keynodes.scs - ключевые узлы (менять не нужно)
    - ui_menu_run_scp_program.scs - запуск scp-программы (для лабораторных работ)
- Substances - папка с химическими веществами (все вещества нужно переместить в соответствующие разделы и удалить)
- Reactions - химические реакции на scl
- Ui_components - графические компоненты
    - src/build_components.py - скрипт для сборки компонентов (менять не нужно)
    - src/components/[имя компонента]/src/[имя компонента]-common.js - прототип компонента
    - src/components/[имя компонента]/src/[имя компонента]-component.js - главное окно
    - src/components/[имя компонента]/src/[имя компонента]-paintPanel.js - логика компонента
    - src/components/[имя компонента]/static - сгенерированный компонент
    - src/components/[имя компонента]/build.json - описание используемых js файлов в компоненте
    - components.scs - описание компонентов
    - format.scs - описание форматов для компонентов
    - update_[название компонента].sh - скрипт для обновления конкретного компонента
    - update_components.sh - скрипт для обновления всех компонентов (менять не нужно)
- TODO - понятия, которых нет в базе, но на них есть ссылки
- concepts.scs - абсолютные понятия и идентификаторы, которых нет в базе, но на них есть ссылки (если берете их на формализацию, то помечаете это в гугл доке и на трелло)
- nrels.scs - относительные понятия и идентификаторы, которых нет в базе, но на них есть ссылки (если берете их на формализацию, то помечаете это в гугл доке и на трелло)
- rrels.scs - ролевые понятия и идентификаторы, которых нет в базе, но на них есть ссылки (если берете их на формализацию, то помечаете это в гугл доке и на трелло)

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [OSTIS]: <https://github.com/ShunkevichDV/ostis>
   [База Знаний IMS]: <https://github.com/ShunkevichDV/ims.ostis.kb>
