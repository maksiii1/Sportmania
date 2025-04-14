function callFuncTest(callback) {
  let count = 0;

  function countDisc() {
    count++;
    console.log(count);
  }

  return countDisc;
}

const apple = callFuncTest();

apple();
apple();
apple();
