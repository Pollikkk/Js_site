var quest = [   //вопросы с вариантами ответов и с правильными вариантами ответов
    {q: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.", an1: "a) Пол деревни, за раз", an2: "b)	Полдеревни, зараз", an3: "c) Пол-деревни, за раз", num: 1, right: "Полдеревни, зараз", rep: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом." },
    {q: "А эти слова как пишутся?", an1: "a)	Капуччино и эспрессо", an2: "b)	Каппуччино и экспресо", an3: "c) Капучино и эспрессо", num: 2, right: "Капучино и эспрессо", rep: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»." },
    {q: "Как нужно писать?", an1: "a) Черезчур", an2: "b) Черес-чур", an3: "c) Чересчур", num: 2, right: "Чересчур", rep: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»." },
    {q: "Где допущена ошибка?", an1: "a)	Аккордеон", an2: "b) Белиберда", an3: "c) Эпелепсия", num: 2, right: "Эпелепсия", rep: "Верно! Это слово пишется так: «эпИлепсия»." },
]

var a = document.getElementById('field');

var butt = document.getElementById('But');
var res = document.getElementById('result');

var vopr = document.createElement('h2');
var r = document.createElement('h2'); 

var i = 0;  //количество нажатий на кнопку
var right = 0;  //кол-во правильных ответов
//нажатия ответов



function shuffle(array) {   //перемешивание вопросов

    let currentIndex = 0,  randomIndex;

    for (let i = 0; i < array.length; i++) {
        // checking the type of the object.
        if ( array[i] instanceof Object ) {
            currentIndex++;
        }
    }
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }



function test(){    //вывод вопросов
    
    if (a.innerHTML == ''){   //когда поле пусто
        quest = shuffle(quest);
        console.log(quest); //
    }
    if (i == 4){    //когда на все вопросы ответили
        a.innerHTML = null;
        vopr.innerHTML = null;
        r.innerHTML = null;
        i = 0;
        return;
    }

    var st = document.createElement('div'); //столбец с вопросами и ответами
    st.classList.add('stolbiki');


    var qq = document.createElement('div');
    qq.innerHTML = (i+1) + ". " + quest[i].q;
    qq.id = 'qq' + i;
    qq.classList.add('main_box');


    var otv = document.createElement('div'); //область с ответами
    otv.classList.add('ansv');

    var a1 = document.createElement('button');
    a1.innerHTML = quest[i].an1;
    a1.id = 'btn0'+ i;
    a1.classList.add('box');

    var a2 = document.createElement('button');
    a2.innerHTML = quest[i].an2;
    a2.id = 'btn1'+ i;
    a2.classList.add('box');
    a2.style.top = 100 + 'px';

    var a3 = document.createElement('button');
    a3.innerHTML = quest[i].an3;
    a3.id = 'btn2'+ i;
    a3.classList.add('box');
    a3.style.top = 200 + 'px';

    otv.appendChild(a1);
    otv.appendChild(a2);
    otv.appendChild(a3);

    st.appendChild(qq);
    st.appendChild(otv);

    a.appendChild(st);

    i++;

    butt.disabled = true;
}


function movement(k){  //функция, отвечающая за движение блока вниз, k- один из блоков
  let str = k.style.top;
  let coordY = str.slice(0, -2);
  console.log(coordY);
  let time = setInterval(frame, 1);
  function frame() {
    if (coordY == 400) {
      clearInterval(time);
    } else {
      coordY++;
      k.style.top = coordY + 'px';
    }
  }
  console.log(k);
  console.log(k.style.top);
}




function rev_movement(k){  //функция, отвечающая за движение блока вниз, k- один из блоков
  let str = k.style.top;
  let coordY = str.slice(0, -2);
  console.log(coordY);
  let time = setInterval(frame, 2);
  function frame() {
    if (coordY == -400) {
      clearInterval(time);
    } else {
      coordY--;
      k.style.top = coordY + 'px';
    }
  }
  console.log(k);
  console.log(k.style.top);
}

document.getElementById('field').addEventListener("click", event => {
    if (event.target.className === "box") { //если это кнопка с вариантом ответа
      console.log("Click!");    //
      console.log(event.target.innerHTML);
      console.log(quest[i-1].num);  //правильный ответ
      event.target.className = "click_box"; //желтая рамка при нажатии

      let el = document.getElementById('btn'+0+ '' + (i-1));
        for(let j = 0; j<3; j++){ //деактивируем кнопки
          el.disabled = true;
          el = el.nextSibling;
        }

      if (event.target.id === 'btn' + quest[i-1].num + '' + (i-1)){  //если правильный ответ
        let komm = quest[i-1].rep;
        let r_q = document.getElementById('qq'+(i-1));  //правильный вопрос
        r_q.classList.add("main_box_right");  //красим вопрос в зеленый
        event.target.className = "box_right"; //увеличиваем кнопку с правильным ответом
        event.target.innerHTML = event.target.innerHTML + komm; //добавляем коммент

        el = document.getElementById('btn'+0+ '' + (i-1));
        setTimeout(function() { //функция, выполняющаяся после 3-х секунд
          console.log('Функция выполнена');

          let j = 0;  
          //сдвигаем неправильные ответы
          let timerId = setInterval(() => {if(j !== quest[i-1].num){movement(el);} el = el.nextSibling; j++}, 500); //убираем неправильные блоки
          
          setTimeout(() => {movement(event.target); clearInterval(timerId)}, 1500); //в конце временного интервала сдвигаем правильный блок
        }, 3000);
        right++;  //кол-во правильных ответов растет
      }
      else{                                         //если неправильный ответ
        document.getElementById('qq'+(i-1)).classList.add("main_box_wrong");
        
        setTimeout(function() { //функция, выполняющаяся после 1-й секунды
          console.log('Функция выполнена');


          //сдвигаем все ответы
          el = document.getElementById('btn'+0+ '' + (i-1));
          let timerId = setInterval(() => {movement(el); el = el.nextSibling}, 500);
          setTimeout(() => clearInterval(timerId), 1500);

         
        }, 1000);
      }

      setTimeout(function() { //кнопки исчезают
        el = document.getElementById('btn'+0+ '' + (i-1));
        let el1;
        for(let j = 0; j<3; j++){ 
          el1 = el.nextSibling;
          el.remove();
          el = el1;
        }

        butt.disabled = false;  //кнопка "Вопрос" активна
      }, 5000);
      
    }

    if(i === 4){
       //создаем надпись
      vopr.innerHTML = 'Вопросы закончились!';
      res.appendChild(vopr);
      //создаем область с результатом
      r.innerHTML = 'Правильно:' + right + ' из ' + i;
      res.appendChild(r);

      showRes();
    }
    
  });


var answDiv;

function showRes() {      //показывает ответы
    
    a.querySelectorAll("div.main_box").forEach(
        question => {
            question.addEventListener(
                'click',
                (event) => {
                    a.querySelectorAll("div.box").forEach((element) => element.remove());

                    let enter = document.createElement("div");
                    enter.id = 'field';

                    answDiv = document.createElement("div");
                    answDiv.classList.add('box');
                    console.log(parseInt(question.id.slice(-1))+1); /***********/
                    
                    answDiv.innerHTML = quest[parseInt(question.id.slice(-1))].right;
                    question.after(enter);
                    question.after(answDiv);
                }
            )
           
        }
    )
}