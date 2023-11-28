let a;
let b;
let c;

a = 5;
b = 3.5;
c = "12";

function teste(ab = 5, ba = c) {
  return ab + ba;
}

let result;

result = teste(a, b);

class Jurema {
  constructor(f = 3, e = false) {}
}
