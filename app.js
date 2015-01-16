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

function isNotEmpty (box) {

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

function findRow ( index ) {
  found = null
  for( var i = 0; i < rows.length; i++) {
    row = rows[i]
    for( var j = 0; j < row.length; j++) {
      if( row[j] === index ) { found = row }
    }
  }
  return found
}

function findColumn (index) {
  found = null
  for( var i = 0; i < columns.length; i++) {
    column = columns[i]
    for( var j = 0; j < column.length; j++) {
      if( column[j] === index ) { found = column }
    }
  }
  return found
}

/// one index has potential of multiple diagonals, covered in potentialOf function
function findDiagonal (index) {
  found = null
  for( var i = 0; i < diagonals.length; i++) {
    diagonal = diagonals[i]
    for( var j = 0; j < diagonal.length; j++) {
      if( diagonal[j] === index ) { found = diagonal }
    }
  }
  return found
}

/// availability from ai perspective

function availableRow (index) {
  row = findRow(index)
  /// player is O
  for( var i = 0; i < row.length; i++) {
    if( isO( boxes[ row[i] ] ) ) { return false }
  }
  return true
}

function availableColumn (index) {
  /// player is O
  column = findColumn(index)
  for( var i = 0; i < column.length; i++) {
    if( isO( boxes[ column[i] ] ) ) { return false }
  }
  return true
}

/// not every index has an available diagonal
function hasDiagonal (index) {
  for( var i = 0; i < diagonals.length; i++) {
    diagonal = diagonals[i]
    for( var j = 0; j < diagonal.length; j++) {
      if( diagonal[j] === index) { return true }
    }
  }
  return false
}

function availableDiagonal (index) {
  /// player is O
  if( hasDiagonal(index) ) {
    diagonal = findDiagonal(index)
    for( var i = 0; i < diagonal.length; i++) {
      if( isO( boxes[ diagonal[i] ] ) ) { return false}
    }
    return true
  }
  return false
}

/// potential from ai perspective

function potentialOf (index) {
  count = 0
  if( index === 4 ) {count += 1 }
  if( availableColumn( index ) ) { count += 1 }
  if( availableRow( index ) ) { count += 1 }
  if( availableDiagonal( index ) ) { count += 1}
  return count
}

function aiIntelligence () {
  /// if ai has 2 in a row with a third empty in same row, go for victory
  /// if user has 2 in a row with a third empty in same row, must defeat attempt
  /// potential of loop
}

function aiMove () {
  /// AI is X
  available = emptyBoxes()
  if ( available.length !== 0 ) {
    makeX( available[ Math.floor( Math.random() * emptyBoxes.length ) ] )
  };
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
