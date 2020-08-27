// Efecto de Color en Titulo
function titleEffect(selector) {
  $(selector)
    .animate(
      { opacity: "1" },
      {
        step: function () {
          $(this).css("color", "white");
        },
        queue: true,
      }
    )
    .animate(
      { opacity: "1" },
      {
        step: function () {
          $(this).css("color", "yellow");
        },
        queue: true,
      },
      600
    )
    .delay(1000)
    .animate(
      {
        opacity: "1",
      },
      {
        step: function () {
          $(this).css("color", "white");
        },
        queue: true,
      }
    )
    .animate(
      {
        opacity: "1",
      },
      {
        step: function () {
          $(this).css("color", "yellow");
          titleEffect("h1.main-titulo");
        },
        queue: true,
      }
    );
}

// Generador numeros aleatoreos
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Obtiene rows o columas
function giveElementArrays(arrayType, index) {
  var elementCol1 = $(".col-1").children();
  var elementCol2 = $(".col-2").children();
  var elementCol3 = $(".col-3").children();
  var elementCol4 = $(".col-4").children();
  var elementCol5 = $(".col-5").children();
  var elementCol6 = $(".col-6").children();
  var elementCol7 = $(".col-7").children();

  var elementColumns = $([
    elementCol1,
    elementCol2,
    elementCol3,
    elementCol4,
    elementCol5,
    elementCol6,
    elementCol7,
  ]);

  if (typeof index === "number") {
    var elementRow = $([
      elementCol1.eq(index),
      elementCol2.eq(index),
      elementCol3.eq(index),
      elementCol4.eq(index),
      elementCol5.eq(index),
      elementCol6.eq(index),
      elementCol7.eq(index),
    ]);
  } else {
    index = "";
  }

  if (arrayType === "columns") {
    return elementColumns;
  } else if (arrayType === "rows" && index !== "") {
    return elementRow;
  }
}

// Arreglos de rows
function elementRows(index) {
  var elementRow = giveElementArrays("rows", index);
  return elementRow;
}

// Arreglos de colunmnas
function elementColumns(index) {
  var elementColumn = giveElementArrays("columns");
  return elementColumn[index];
}

// Validacion columnas
function columnValidation() {
  for (var j = 0; j < 7; j++) {
    var counter = 0;
    var elementPosition = [];
    var extraElementPosition = [];
    var elementColumn = elementColumns(j);
    var comparisonValue = elementColumn.eq(0);
    var gap = false;
    for (var i = 1; i < elementColumn.length; i++) {
      var srcComparison = comparisonValue.attr("src");
      var srcElement = elementColumn.eq(i).attr("src");

      if (srcComparison != srcElement) {
        if (elementPosition.length >= 3) {
          gap = true;
        } else {
          elementPosition = [];
        }
        counter = 0;
      } else {
        if (counter == 0) {
          if (!gap) {
            elementPosition.push(i - 1);
          } else {
            extraElementPosition.push(i - 1);
          }
        }
        if (!gap) {
          elementPosition.push(i);
        } else {
          extraElementPosition.push(i);
        }
        counter += 1;
      }
      comparisonValue = elementColumn.eq(i);
    }
    if (extraElementPosition.length > 2) {
      elementPosition = $.merge(elementPosition, extraElementPosition);
    }
    if (elementPosition.length <= 2) {
      elementPosition = [];
    }
    elementCount = elementPosition.length;
    if (elementCount >= 3) {
      deleteColumnElement(elementPosition, elementColumn);
      setScore(elementCount);
    }
  }
}

function deleteColumnElement(elementPosition, elementColumn) {
  for (var i = 0; i < elementPosition.length; i++) {
    elementColumn.eq(elementPosition[i]).addClass("delete");
  }
}

// Validacion Rows
function rowValidation() {
  for (var j = 0; j < 6; j++) {
    var counter = 0;
    var elementPosition = [];
    var extraElementPosition = [];
    var elementRow = elementRows(j);
    var comparisonValue = elementRow[0];
    var gap = false;
    for (var i = 1; i < elementRow.length; i++) {
      var srcComparison = comparisonValue.attr("src");
      var srcElement = elementRow[i].attr("src");

      if (srcComparison != srcElement) {
        if (elementPosition.length >= 3) {
          gap = true;
        } else {
          elementPosition = [];
        }
        counter = 0;
      } else {
        if (counter == 0) {
          if (!gap) {
            elementPosition.push(i - 1);
          } else {
            extraElementPosition.push(i - 1);
          }
        }
        if (!gap) {
          elementPosition.push(i);
        } else {
          extraElementPosition.push(i);
        }
        counter += 1;
      }
      comparisonValue = elementRow[i];
    }
    if (extraElementPosition.length > 2) {
      elementPosition = $.merge(elementPosition, extraElementPosition);
    }
    if (elementPosition.length <= 2) {
      elementPosition = [];
    }
    elementCount = elementPosition.length;
    if (elementCount >= 3) {
      deleteHorizontal(elementPosition, elementRow);
      setScore(elementCount);
    }
  }
}

function deleteHorizontal(elementPosition, elementRow) {
  for (var i = 0; i < elementPosition.length; i++) {
    elementRow[elementPosition[i]].addClass("delete");
  }
}

// Score Count
function setScore(elementCount) {
  var score = Number($("#score-text").text());
  switch (elementCount) {
    case 3:
      score += 3;
      console.log("Scored " + 3);
      break;
    case 4:
      score += 4;
      console.log("Scored " + 4);
      break;
    case 5:
      score += 5;
      console.log("Scored " + 5);
      break;
    case 6:
      score += 6;
      console.log("Scored " + 6);
      break;
    case 7:
      score += 7;
      console.log("Scored " + 7);
  }
  $("#score-text").text(score);
}

// Inicializador del tablero
function checkBoard() {
  fillBoard();
}

function fillBoard() {
  var top = 6;
  var column = $('[class^="col-"]');

  column.each(function () {
    var elements = $(this).children().length;
    var agrega = top - elements;
    for (var i = 0; i < agrega; i++) {
      var elementType = getRandomInt(1, 5);
      if (i === 0 && elements < 1) {
        $(this).append(
          '<img src="image/' + elementType + '.png" class="element"></img>'
        );
      } else {
        $(this)
          .find("img:eq(0)")
          .before(
            '<img src="image/' + elementType + '.png" class="element"></img>'
          );
      }
    }
  });
  addElementEvents();
  setValidations();
}

// Validacion eliminacion de elementos
function setValidations() {
  columnValidation();
  rowValidation();
  if ($("img.delete").length !== 0) {
    deleteElementAnimation();
  }
}

// Drag
// Efectos entre elementos
function addElementEvents() {
  $("img").draggable({
    containment: ".panel-tablero",
    droppable: "img",
    revert: true,
    revertDuration: 500,
    grid: [100, 100],
    zIndex: 10,
    drag: constrainElementMovement,
  });
  $("img").droppable({
    drop: swapElement,
  });
  enableElementEvents();
}

function disableElementEvents() {
  $("img").draggable("disable");
  $("img").droppable("disable");
}

function enableElementEvents() {
  $("img").draggable("enable");
  $("img").droppable("enable");
}

// Elemento solido al moverse
function constrainElementMovement(event, elementDrag) {
  elementDrag.position.top = Math.min(100, elementDrag.position.top);
  elementDrag.position.bottom = Math.min(100, elementDrag.position.bottom);
  elementDrag.position.left = Math.min(100, elementDrag.position.left);
  elementDrag.position.right = Math.min(100, elementDrag.position.right);
}

// Swap de elementos con anteriores
function swapElement(event, elementDrag) {
  var elementDrag = $(elementDrag.draggable);
  var dragSrc = elementDrag.attr("src");
  var elementDrop = $(this);
  var dropSrc = elementDrop.attr("src");
  elementDrag.attr("src", dropSrc);
  elementDrop.attr("src", dragSrc);

  setTimeout(function () {
    checkBoard();
    if ($("img.delete").length === 0) {
      elementDrag.attr("src", dragSrc);
      elementDrop.attr("src", dropSrc);
    } else {
      updateMoves();
    }
  }, 500);
}

function checkBoardPromise(result) {
  if (result) {
    checkBoard();
  }
}

// Validacion puntos por linea
function updateMoves() {
  var actualValue = Number($("#movimientos-text").text());
  var result = (actualValue += 1);
  $("#movimientos-text").text(result);
}

// Eliminacion de elementos
function deleteElementAnimation() {
  disableElementEvents();
  $("img.delete").effect("fade", 400);
  $("img.delete")
    .animate(
      {
        opacity: "0",
      },
      {
        duration: 500,
      }
    )
    .animate(
      {
        opacity: "0",
      },
      {
        duration: 500,
        complete: function () {
          deleteElement().then(checkBoardPromise).catch(showPromiseError);
        },
        queue: true,
      }
    );
}

function deleteElement() {
  return new Promise(function (resolve, reject) {
    if ($("img.delete").remove()) {
      resolve(true);
    } else {
      reject("No se pudo eliminar element...");
    }
  });
}

// Creacion de elementos en espacios vacios
function showPromiseError(error) {
  console.log(error);
}

// Inicializacion del juego
function initGame() {
  titleEffect("h1.main-titulo");

  $(".btn-reinicio").click(function () {
    if ($(this).text() === "Reiniciar") {
      location.reload(true);
    }
    checkBoard();
    $(this).text("Reiniciar");
    $("#timer").startTimer({
      onComplete: endGame,
    });
  });
}

$(function () {
  initGame();
});

// Final del juego
function endGame() {
  $("div.panel-tablero, div.time").effect("fold");
  $("h1.main-titulo").addClass("title-over").text("Gracias por jugar!");
  $("div.score, div.moves, div.panel-score").width("100%");
}
