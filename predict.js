var fs = require('fs');
var eachCons = require('each-cons');
var getStdin = require('get-stdin');

class Predictor {
  constructor(corpus) {
    this.corpus = corpus;
    this.words = {};
    let words = corpus.split(" ");
    let word_pairs = eachCons(words, 2);
    word_pairs.forEach((pair) => 
      this.add(pair[0], pair[1]) );
  }
  add(w1,w2) {
    if (!this.words[w1]) {
      this.words[w1] = {};
    }
    if (!this.words[w1][w2]) {
      this.words[w1][w2] = 0;
    }
    this.words[w1][w2] += 1;
  }

  get(word) {
    if (!this.words[word]) {
      return "";
    }
    var followers = Object.entries(this.words[word]).sort((k) => k[1]);
    followers = followers.sort();
    let sum = followers.reduce((sum,kv) => sum += kv, 0);
    let random = Math.random(sum)+1
    let partial_sum = 0
    let c = 0;
    let choices = [];
    for(let x=0;x<5;x++) {
      choices.push(followers[x][0]);
    }
    console.log(choices.join(" "));
    while (partial_sum < random && c < followers.size) {
      console.log(followers[c]);
      c++;
      partial_sum += followers[c][1];
    }

    return followers[c][0];
  }

}

var corpus = fs.readFileSync('tng.txt', 'utf8');

pred = new Predictor(corpus);

process.stdin.on('data', function (data) {
  console.log(data.toString());
  w = pred.get(data.toString().trim());
  console.log(w);
});
