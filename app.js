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

function catScratch () {
  if( emptyBoxes().length === 0) { return true }
}

function indexOf (box) {
  return parseInt(box.id.slice(4)) - 1
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

function xCount (indices) {
  xNum = 0
  for( var i = 0; i < indices.length; i++) {
    currentBox = boxes[ indices[i] ]
    if( isX(currentBox) ) { xNum += 1 }
  }
  return xNum
}

function oCount (indices) {
  oNum = 0
  for( var i = 0; i < indices.length; i++) {
    currentBox = boxes[ indices[i] ]
    if( isO(currentBox) ) { oNum += 1 }
  }
  return oNum
}

function emptyCount (indices) {
  emptyNum = 0
  for( var i = 0; i < indices.length; i++) {
    currentBox = boxes[ indices[i] ]
    if( isEmpty(currentBox) ) { emptyNum += 1 }
  }
  return emptyNum
}

/// checks for two of either x/o + one empty
function twoInARow (indices, funct) {
  if( emptyCount(indices) === 1 ) {
    if( funct(indices) === 2 ) {
      return true
    }
  }
  return false
}

/// if twoInArow we need to find the empty
function findEmpty (indices) {
  empty = null
  for( var i = 0; i < indices.length; i++) {
    box = boxes[ indices[i] ]
    if( isEmpty(box) ) { empty = box }
  }
  return empty
}

/// weird potential calculation
function potentialOf (index) {
  count = 0
  if( index === 4 ) {count += 1 }
  if( availableColumn( index ) ) { count += 1 }
  if( availableRow( index ) ) { count += 1 }
  if( availableDiagonal( index ) ) { count += 1}
  return count
}

function bestAvailable() {
  highestPotential = null
  choice = null
  available = emptyBoxes()

  for( var i = 0; i < available.length; i++) {
    box = available[i]
    index = indexOf(box)
    indexPotential = potentialOf(index)

    if( choice === null ) {
      choice = box
    }else if( indexPotential > highestPotential ) {
      highestPotential = indexPotential
      choice = box
    }
  }
  return choice
}

function aiIntelligence () {
  /// if ai has 2 in a row with a third empty in same row, go for victory
  /// if user has 2 in a row with a third empty in same row, must defeat attempt
  /// ^ one in the same
  for( var i = 0; i < rows.length; i++) {
    row = rows[i]
    if( twoInARow(row, xCount) ) { return findEmpty(row) }
  }

  for( var i = 0; i < columns.length; i++) {
    column = columns[i]
    if( twoInARow(column, xCount) ) { return findEmpty(column) }
  }

  for( var i = 0; i < diagonals.length; i++) {
    diagonal = diagonals[i]
    if( twoInARow(diagonal, xCount) ) { return findEmpty(diagonal) }
  }

  for( var i = 0; i < rows.length; i++) {
    row = rows[i]
    if( twoInARow(row, oCount) ) { return findEmpty(row) }
  }

  for( var i = 0; i < columns.length; i++) {
    column = columns[i]
    if( twoInARow(column, oCount) ) { return findEmpty(column) }
  }

  for( var i = 0; i < diagonals.length; i++) {
    diagonal = diagonals[i]
    if( twoInARow(diagonal, oCount) ) { return findEmpty(diagonal) }
  }

  return bestAvailable()
}

function aiMove () {
  /// AI is X
    makeX( aiIntelligence() )
}

function game () {
  for( var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener( 'click', function () {
      /// user is O
      if( isEmpty(this) ) {
        makeO(this)
        if( oWin() ) {
          alert('O wins!')
        }else if( catScratch() ) {
          alert('Cat Scratch')
        }else {
          aiMove()
          if( xWin() ) { alert('X wins!') }
        }
      }
    })
  }
};

game()
