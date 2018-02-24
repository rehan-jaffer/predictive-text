var fs = require('fs');
var eachCons = require('each-cons');

class Predictor {
  constructor(corpus) {
    this.corpus = corpus;
    this.words = {};
    let words = corpus.split(" ");
    let word_pairs = eachCons(words, 2);
    word_pairs.forEach((pair) => 
      this.add(pair) );
  }
  add(w1, w2) {
    if (!this.words[w1]) {
      this.words[w1] = {};
    }
  }

}

var corpus = fs.readFileSync('tng.txt', 'utf8');

pred = new Predictor(corpus);
