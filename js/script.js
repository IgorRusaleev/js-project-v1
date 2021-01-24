// назначение глобального обработчика событий
window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContetnt = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContetnt() {
        tabsContetnt.forEach(item => {
            item.classList.add('hide'); // скрытие табов
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); //удаление класса активности
        });
    }

    function showTabContetnt(i = 0) {
        tabsContetnt[i].classList.add('show', 'fade');
        tabsContetnt[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active'); //добавление класса активности
    }

    hideTabContetnt();
    showTabContetnt(); // показ первого таб

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContetnt();
                    showTabContetnt(i);
                }
            });
        }
    });
    
    // Timer

    const deadline = '2021-05-11'; //переменная определяющая дедлайн - дата ввиде строки

    //функция определяющая разницу между дедлайном и текущим временем

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); //разница между датами
        //Date.parse разбирает строковое представление даты и возвращает
        //количество миллисекунд, прошедших с 1 января 1970 года
        // 00:00:00 по UTC
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); // осталось суток до даты
        // 1000 * 60 - кол-во миллисекунд в 1 минуте
        // 1000 * 60 * 60 - кол-во миллисекунд в 1 часе
        // 1000 * 60 * 60 * 24 - кол-во миллисекунд в 1 сутках
        // Math.floor() - округление вниз. Округляет аргумент до ближайшего меньшего целого
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        // (t / 1000 * 60 * 60) общее кол-во часов оставшееся до даты
        const minutes = Math.floor((t /( 1000 * 60)) % 60);
        const seconds = Math.floor(((t / 1000) % 60));

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    // ф-ция помощник для добавления нуля к однозначному числу
    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // функция устанавливающая таймер на страницу

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000), //вызывает функцию с фиксированной паузой между каждым вызовом
              textDays = document.querySelector('#text-days'),
              textHours = document.querySelector('#text-hours'),
              textMinutes = document.querySelector('#text-minutes'),
              textSeconds = document.querySelector('#text-seconds');
        
              // запуск updateClock что бы не было мигания в верстке
        updateClock();

              // функция которая будет обновлять таймер каждую секунду
              
        function updateClock() {
            // расчет времени, оставшегося на эту секунду
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // seconds.after(getSeconds(t.seconds));
            
            //остановка таймера
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }

            function dateCreater (days, hours, minutes, seconds) {
                let daysResult = ((((days % 100) >= 11 && days <= 19) || (days = days % 10) >= 5 || days == 0) ? 
                textDays.innerHTML = ('Дней') : (days == 1 ? textDays.innerHTML = ('День') 
                : textDays.innerHTML = ('Дня')));
 
                let hoursResults = ((((hours % 100) >= 11 && hours <= 19) || (hours = hours % 10) >= 5 || hours == 0) ? 
                textHours.innerHTML = ('Часов') : (hours == 1 ? textHours.innerHTML = ('Час') 
                : textHours.innerHTML = ('Часа')));
 
                let minutesResults = ((((minutes % 100) >= 11 && minutes <= 19) || (minutes = minutes % 10) >= 5 || minutes == 0) ? 
                textMinutes.innerHTML = ('Минут') : (minutes == 1 ? textMinutes.innerHTML = ('Минута') 
                : textMinutes.innerHTML = ('Минуты')));
 
                let secondsResults = ((((seconds % 100) >= 11 && seconds <= 19) || (seconds = seconds % 10) >= 5 || seconds == 0) ? 
                textSeconds.innerHTML = ('Секунд') : (seconds == 1 ? textSeconds.innerHTML = ('Секунда') 
                : textSeconds.innerHTML = ('Секунды')));
            }
 
            dateCreater(t.days, t.hours, t.minutes, t.seconds);
        }
    }

    setClock('.timer', deadline);

    //модальное окно
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            // Либо вариант с toggle - но тогда назначить класс в верстке
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // Либо вариант с toggle - но тогда назначить класс в верстке
        document.body.style.overflow = '';
    }
    
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });
});