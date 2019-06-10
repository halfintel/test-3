$(function() {
$(window).load(function() {
  // вешает обработчик событий на документ
  document.addEventListener('click', EvtListener);
});
});

// массив чисел от 0 до 15 в рандомном порядке
var cellsRandArr;
// массив цветов
var cellsColorRandArr = [
  'red', 'maroon', 'yellow', 'olive', 
  'lime', 'green', 'aqua', 'teal', 
  'blue', 'navy', 'fuchsia', 'purple', 
  'chocolate', 'silver', 'gray', 'blueviolet'
];
// массив, в котором key - номер ячейки, value - цвет этой ячейки
var cellsAndColorArr = [];
// инициализатор таймера
var stopwatchInit = 0;
// секундомер в timestamp
var stopwatchTimer = 0;
// секундомер в формате 'mm:ss:ms'
var stopwatchTimerText = '';
// setTimeout
var stopwatchTimeout;

// обработчик событий на документе
function EvtListener(e) {
  const $item = $(e.target);
  
  if (e.target.tagName === 'TD') {
    tdClick($item);
  }
}

// обрабатывает события клика на <td>
function tdClick($item) {
  let $tdActive = $('td.tdActive');
  const $tdFound = $('td.tdFound');
  const tdActiveLength = $tdActive.length;
  const tdFoundLengthBefore = $tdFound.length;
  const itemId = $item.index('td');
  
  if ( tdFoundLengthBefore === 16 ) {
    return;
  }


  if (tdActiveLength === 0) {
    $item.addClass('tdActive');
    $item.css( 'background-color', cellsAndColorArr[itemId] );
  } else if (tdActiveLength === 1) {
    $item.addClass('tdActive');
    $item.css( 'background-color', cellsAndColorArr[itemId] );
	
	$tdActive = $('td.tdActive');
    const color1 = $tdActive.eq(0).css('background-color');
    const color2 = $tdActive.eq(1).css('background-color');

    if ( color1 === color2 ) {
      $tdActive.addClass('tdFound').removeClass('tdActive');
    } else {
      setTimeout(tdClose, 300);
    }
  } else {
    event.preventDefault();
  }
  
  const tdFoundLengthAfter = $('td.tdFound').length;
  
  if ( tdFoundLengthAfter === 16 ) {
    alert('Вы выиграли!\nЗатраченное время: ' + stopwatchTimerText);
    clearTimeout(stopwatchTimeout);
  }
}

// закрывает открытые плитки
function tdClose() {
  const $tdActive = $('td.tdActive');
  
  $tdActive.css('background-color', 'white').removeClass('tdActive');
}

// заполняет массив cellsAndColorArr, в котором key - номер ячейки, value - цвет этой ячейки
function pairedСells() {
  const $pairedCellsItem = $('#pairedCells');
  const cellsLength = $pairedCellsItem.find('td').length;
  const cellsArr = [];
  
  if (cellsLength % 2 === 0){
    cellsLengthHalf = Math.ceil(cellsLength / 2);
	
    for ( i = 0; i < cellsLength; i++ ){
      cellsArr.push(i);
    }
    
    cellsRandArr = randomSortArr(cellsArr);
    
    for ( i = 0; i < cellsLengthHalf; i++ ){
      let e = i + cellsLengthHalf;
      cellsAndColorArr[ cellsArr[i] ] = cellsColorRandArr[i];
      cellsAndColorArr[ cellsArr[e] ] = cellsColorRandArr[i];
    }
  }
}

// переводит числа от 0 до 15 в hex
function decimalToHex(number) {
  if ( 
    number > 9 
	&& number < 16 
  ) {
    switch(number) {
      case 10:
        return 'a';
      case 11:
        return 'b';
      case 12:
        return 'c';
      case 13:
        return 'd';
      case 14:
        return 'e';
      case 15:
        return 'f';
    }
  } else {
    return number;
  }
}

// перемешивает массив
function randomSortArr(arr) {
  let j;
  let temp;
  
  for(i = arr.length - 1; i > 0; i--) {
    j = Math.floor( Math.random()*(i + 1) );
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  
  return arr;
}

// секундомер
function stopwatch() {
  // шаг секундомера (в мс)
  const stopwatchStep = 50;  
  
  stopwatchTimer = stopwatchTimer + stopwatchStep;
  
  const ms = stopwatchTimer % 1000;
  let sec = stopwatchTimer % 60000 - ms;
  let min = stopwatchTimer % 3600000 - ms - sec;
  
  sec = sec/1000;
  min = min/60000;
  
  let msText = '';
  let secText = '';
  let minText = '';

  if ( ms < 10 ){
    msText = '00' + ms;
  } else if ( ms < 100 ){
    msText = '0' + ms;
  } else {
    msText = ms;
  }
  
  if ( sec < 10 ){
    secText = '0' + sec;
  } else {
    secText = sec;
  }
  
  if ( min < 10 ){
    minText = '0' + min;
  } else {
    minText = min;
  }
  
  stopwatchTimerText = minText + ':' + secText + ':' + msText;
  
  const $pairedCells__timer = $('.pairedCells__timer');
  
  $pairedCells__timer.text(stopwatchTimerText);
  stopwatchTimeout = setTimeout(stopwatch, stopwatchStep);
}

// инициализация секундомера и позиций пар
function stopwatchInitialization() {
  if (stopwatchInit === 0) {
    stopwatchInit = 1;
    pairedСells();
    stopwatch();
  }
}
