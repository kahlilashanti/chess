$(function(){
  init();
  console.log('working');
});

function InitFilesRanksBrd() {
  var index = 0;
  var file = FILES.FILE_A;
  var rank = RANKS.RANK_1;
  var sq = SQUARES.A1;

  //loop through all 120 squares and set them to 'OFFBOARD'
  for(index = 0; index < BRD_SQ_NUM; ++index){
    FilesBrd[index] = SQUARES.OFFBOARD;
    RanksBrd[index] = SQUARES.OFFBOARD;
  }
  //loop through the 8 files and ranks (64 squares) and set each array (from FR2SQ in defs.js) to the appropriate value
  for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank){
    for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file){
      sq = FR2SQ(file, rank);
      FilesBrd[sq] = file;
      RanksBrd [sq]= rank;
    }
  }
  //print a few tests to console to ensure everything works properly
  // console.log("FilesBrd[0]:" + FilesBrd[0] + " RanksBrd[0]:" + RanksBrd[0]);
  // console.log("FilesBrd[SQUARES.A1]:" + FilesBrd[SQUARES.A1] + " RanksBrd[SQUARES.A1]:" + RanksBrd[SQUARES.A1]);
  // console.log("FilesBrd[SQUARES.E8]:" + FilesBrd[SQUARES.E8] + " RanksBrd[SQUARES.E8]:" + RanksBrd[SQUARES.E8]);
}

function InitHashKeys(){
  var index = 0;

  for(index = 0; index < 14 * 120; ++index){
    PieceKeys[index] = RAND_32();
  }

  SideKey = RAND_32();

  for(index = 0; index < 16; ++index){
    CastleKeys[index] = RAND_32();
  }
}

function InitSq120To64(){

  var index = 0;
  var file = FILES.FILE_A;
  var rank = RANKS.RANK_1;
  var sq = SQUARES.A1;
  var sq64 = 0;

  for(index=0; index < BRD_SQ_NUM; ++index){
    Sq120TOSq64[index] = 65;
  }

  for(index = 0; index < 64; ++index){
    Sq64ToSq120[index] = 120;
  }

  for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank){
    for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file){
      sq = FR2SQ(file, rank);
      Sq64ToSq120[sa64] = sq;
      Sq120TOSq64[sq] = sq64;
      sq64++;
    }
  }

}

function init() {
  console.log("init() called");
  InitFilesRanksBrd();
  InitHashKeys();
}
