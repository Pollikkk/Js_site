var btn = document.querySelector("button");
var aa = document.getElementById("words");
var strok = document.getElementById("stroka");
var buttons = document.getElementById("bttns");
console.log(aa.value);
console.log(btn.innerText);
var str = aa.value;



var squares = document.getElementsByClassName('square');    //наши передвигающиеся элементы
var rightBox = document.getElementById('col');
var leftBox = document.getElementById('left');
var description = document.getElementById('added_words');


btn.onclick = function() {
    if (aa.value === null || aa.value === ""){
        aa.placeholder="Write some words divided with the '-' ";
    }
    else if(aa.value!==""){
        description.innerHTML='';
        leftBox.innerHTML='';
        buttons.innerHTML='';
        str = aa.value;
        strok.innerHTML = 'Строка: ' + str;
        zapoln();
    }
    
};


function zapoln() {
    var arr = str.split("-");   //получаем массив
    var map = new Array(arr.length);    //ассоциативный массив
    var arr1 = new Array(); //массив слов
    var arr2 = new Array(); //массив цифр
    var count1 = 0;
    var count2 = 0;
    
//сортируем массив на массив слов и массив цифр
    const regex = new RegExp(/(\s{2,})/, "g");  //\s- пробел, шаблон для замены множественных пробелов
    for (var ind in arr) {                          
        if (!/^\s*$/.test(arr[ind])) {  //если не пустое значение
            arr[ind] = arr[ind].trim().replace(regex, " "); //убираем лишние пробелы
            if (/^\d+$/.test(arr[ind])) {   //если число
                arr2[count2] = arr[ind];
                count2++;
            } else {                        //если символьный тип
                arr1[count1] = arr[ind];
                count1++;
            }
        }
    }

    arr1.sort((a, b) => a.localeCompare(b));    //сортировка слов по алфавиту

    arr2.sort(function (a, b) {     //сортировка чисел по возрастанию
        return a - b
    });


    for (var i = 0; i < count1; i++) {  //заполняем ассоциативный массив словами
        map["a" + (i + 1)] = arr1[i];
    }
    for (var j = 0; j < count2; j++) {  //заполняем ассоциативный массив цифрами
        map["n" + (j + 1)] = arr2[j];
    }


    for (var k in map) {    //вывод ассоциативного массива
        var sq = document.createElement('div');
        sq.innerHTML = k + "   " + map[k];
            //нужно добавить стилей
        sq.id = k;
        sq.classList.add('square');
        sq.draggable = true;
        buttons.appendChild(sq);
    }

    var txt='';
   

    for(subj of squares){
        subj.addEventListener("dragstart", function(e){
            let selected = e.target;

            leftBox.addEventListener("dragover", function(e){
                e.preventDefault(); //убираем "заглушку" для drop
            });
            leftBox.addEventListener("drop", function(e){
                //console.log(selected.innerHTML);
                //txt = txt + selected.innerHTML.slice(3);
                leftBox.insertBefore(selected, leftBox.firstChild);   //children[0]
                //txt='';
                /*for(var key in leftBox){
                    txt = txt + key.innerHTML.slice(3);
                }*/

                txt = leftBox.innerText;
                //console.log('txt' + leftBox.innerText);
                
                description.innerHTML = txt;
                selected=null;
           
            });

        })
    }
}  
