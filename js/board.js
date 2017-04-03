// Fen: each section of numbers indicates a rank.
//https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation


function PCEINDEX(pce, pceNum) {
  return (pce * 10 + pceNum); //returns our piece multiplied by ten plus the piece number in the list
}

//using Global variable here
var GameBoard = {};

//we need to maintain the state of our pieces
//we need an array to reflect this piece status
GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLOURS.WHITE;

// a player can claim a draw if both players have made 50 moves
//so every time a move is made we increment fiftyMove by 1
//if fiftyMove ever hits 100 the game is drawn
//fiftyMove gets reset to zero every time a pawn is moved or a capture is made
GameBoard.fiftyMove = 0;

//this will maintain a count of all of the half moves made in the game from the start
GameBoard.hisPly = 0;

//the number of half moves made in the search tree
GameBoard.ply = 0;

//you can only castle if the king and the rook are on their starting position and haven't moved
//see var CASTLEBIT in defs.js
// the one furthest to the right has the least significance

GameBoard.enPas = 0;

GameBoard.castlePerm = 0;
//will hold the value of the material of each side.
GameBoard.material = new Array(2);

//piece lists - in order to generate moves we'd need to loop through our board, look if there's a piece on our board.  if the piece on the square equals color of the side to move, then generate a move for the square

//we need an array that keeps track of our piece number -> how many pieces we have of each type
GameBoard.pceNum = new Array(13); //indexed by piece

//how might we store this list in a one dimensional array?
//we're going to have a piecelist array and at its given index it will give the square.
//store the maximum capacity of all the piece types in that array

// white pawn multiplied by ten and then add the white pawn number which is a 0 based index from GameBoard.pceNum
GameBoard.pList = new Array(14 * 10);

GameBoard.posKey = 0;//we can use this for repetition detection

GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveListStart = new Array(MAXDEPTH);


function GeneratePosKey(){
  var sq = 0;
  var finalKey = 0;
  var piece = PIECES.EMPTY;

  //hash into our final key the unique number for a given piece on a given square

  for(sq = 0; sq < BRD_SQ_NUM; ++sq){
    piece = GameBoard.pieces[sq];
    if(piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD){
      finalKey ^= pIeceKeys[(piece * 120) + sq];
    }
  }

  //if the side to move is white we'll hash in our side key
  if(GameBoard.side == COLOURS.WHITE){
    finalKey ^= SideKey;
  }

  if(GameBoard.enPas != SQUARES.NO_SQ){
    finalKey ^= PieceKeys[GameBoard.enPas];
  }

  finalKey ^= CastleKeys[Gameboard.castlePerm];

  return finalKey;

}

function ResetBoard(){

  var index = 0;

  for (index = 0; index < BRD_SQ_NUM; ++index){
    GameBoard.pieces[index] = SQUARES.OFFBOARD;
  }

  for(index = 0; index < 64; ++index){
    GameBoard.pieces[SQ120(index)] = PIECES.EMPTY;
  }

  for(index = 0; index < 14 * 120; ++index){
    GameBoard.Plist[index] = PIECES.EMPTY;
  }

  for(index = 0; index < 2; ++index){
    GameBoard.material[index] = 0;
  }

  for(index = 0; index < 13; ++index){
    GameBoard.pceNum[index] = 0;
  }

  GameBoard.side = COLOURS.BOTH;
  GameBoard.enPas = SQUARES.NO_SQ;
  GameBoard.fiftyMove = 0;
  GameBoard.ply = 0;
  GameBoard.hisPly = 0;
  GameBoard.castlePerm = 0;
  GameBoard.posKey = 0;
  GameBoard.moveListStart[GameBoard.ply] = 0;

}

function ParseFen(fen){

  ResetBoard();

}
