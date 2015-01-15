boxes = document.getElementsByClassName('box')
rows = [[0,1,2],[3,4,5],[6,7,8]]
columns = [[0,3,6],[1,4,7],[2,5,8]]
diagonals = [[0,4,8],[2,4,6]]

function makeO (box) {
  return box.innerHTML = 'O'
}

function makeX (box) {
  return box.innerHTML = 'X'
}

function isO (box) {
  return box.innerHTML === 'O'
}

function isX (box) {
  return box.innerHTML === 'X'
}

function isEmpty (box) {
  return box.innerHTML === ""
}

/// indices is a list of three indices
function isAllX (indices) {
  for(var i = 0; i < indices.length; i++) {
    if( isO( boxes[indices[i]] )  || isEmpty( boxes[indices[i]] )) { return false }
  }
  return true
}

function isAllO (indices) {
  for( var i = 0; i < indices.length; i++) {
    if( isX( boxes[indices[i]] ) || isEmpty( boxes[indices[i]] )) { return false }
  }
  return true
}

function xWin () {
  for( var i = 0; i < rows.length; i++) {
    var row = rows[i]
    if( isAllX(row) ) { return true }
  }
  for( var i = 0; i < columns.length; i++) {
    var column = columns[i]
    if( isAllX(column) ) { return true}
  }
  for( var i = 0; i < diagonals.length; i++) {
    var diagonal = diagonals[i]
    if( isAllX(diagonal) ) { return true}
  }
  return false
}

function oWin () {
  for( var i = 0; i < rows.length; i++) {
    var row = rows[i]
    if( isAllO(row) ) { return true }
  }
  for( var i = 0; i < columns.length; i++) {
    var column = columns[i]
    if( isAllO(column) ) { return true}
  }
  for( var i = 0; i < diagonals.length; i++) {
    var diagonal = diagonals[i]
    if( isAllO(diagonal) ) { return true}
  }
  return false
}

function emptyBoxes () {
  empty = []
  for( var i = 0; i < boxes.length; i++) {
    box = boxes[i]
    if( isEmpty( box ) ) { empty.push(box) }
  }
  return empty
}

function aiMove () {
  /// AI is X
  available = emptyBoxes()
  if ( available.length !== 0 ) {
    makeX( available[ Math.floor( Math.random() * emptyBoxes.length ) ] )
  };
}

function aiIntelligence () {
  /// boxes with more availabe adjacent boxes have more potential
  /// if user has 2 in a row with a third empty is same row, must defeat attempt
  /// 
}

function game () {
  for( var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener( 'click', function () {
      /// user is O
      if( isEmpty(this) ) {
        makeO(this)
        if( oWin() ) { console.log('O wins!')
        }else {
          aiMove()
          if( xWin() ) { console.log('X wins!') }
        }
      }
    })
  }
};

game()
