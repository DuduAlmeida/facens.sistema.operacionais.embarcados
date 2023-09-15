let a;
let b;
let c;

a = 5;
b = 3.5;
c = "12";

result = a + b;

async function teste(a, b) {
  return a + b;
}

class MyClass {
  constructor(list) {
    this.list = list;
  }

  mapList() {
    return this.list.map((item) => {
      return item * 2;
    });
  }
}

const myList = [1, 2, 3, 4, 5];
const myClassInstance = new MyClass(myList);
const mappedList = myClassInstance.mapList();
