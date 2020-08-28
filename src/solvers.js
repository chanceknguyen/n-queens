/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var solution = undefined;
  var board = new Board({n: n});
  var matrix = board.rows();
  // create toggle counter
  var toggleCounter = 0;
  // iterate through rows
  for (var i = 0; i < n; i++) {
    var currentRow = matrix[i];
    for (var j = 0; j < n; j++) {
      if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j)) {
        board.togglePiece(i, j);
        toggleCounter++;
        if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
          board.togglePiece(i, j);
          toggleCounter--;
        }
      }
    }
  }

  //  if counter = n
  if (toggleCounter === n) {
    solution = matrix;
  }
  //  set solution equal to board;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var toggleCounter = 0;

  var findSolution = function(row) {
    if (row === n && toggleCounter === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      toggleCounter++;
      if (!board.hasAnyRooksConflicts() ) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
      toggleCounter--;
    }
  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;

  var board = new Board({n: n});

  var findSolution = function(row) {
    if (row === n) {

      solution = board.rows().map(function(row) {
        return row.slice();
      });


      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  findSolution(0);



  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution === undefined ? new Board({n: n}).rows() : solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board ({n: n});
  // var toggleCounter = 0;

  var findSolution = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      // toggleCounter++;
      if (!board.hasAnyQueensConflicts() ) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
      // toggleCounter--;
    }
  };
  findSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
