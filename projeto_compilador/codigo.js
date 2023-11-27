let a;
let b;
let c;

a = 5;
b = 3.5;
c = "12";

function teste(ab = 5, ba = c) {
  return ab + ba;
}

class Jurema {
  constructor(f, e) {
    this.f = f;
    this.e = e;
  }

  sendNumber() {}
}

let result;

result = teste(a, b);
