console.log("Array.map()");
console.log(
  "Задача 1: Є масив чисел [1, 2, 3, 4, 5]. Створи новий масив, де кожне число помножене на 2."
);
const arr1 = [1, 2, 3, 4, 5];
console.log("Old arr = ", arr1);
console.log(
  "New arr = ",
  arr1.map((item) => item * 2)
);
console.log(
  "Задача 2: Є масив імен ['anna', 'bob', 'charlie']. Створи новий масив, де всі імена написані великими літерами."
);
const arr2 = ["anna", "bob", "charlie"];
console.log("Old arr = ", arr2);
console.log(
  "New arr = ",
  arr2.map((item) => item.toUpperCase())
);
console.log(
  "Задача 3: Є масив цін [100, 200, 300]. Додай до кожної ціни 20% податку та створи новий масив."
);
const arr3 = [100, 200, 300];
console.log("Old arr = ", arr3);
console.log(
  "New arr = ",
  arr3.map((item) => item * 1.2) // +20% == *1.2
);
console.log("Array.filter()");
console.log(
  "Задача 4: Є масив [5, 12, 8, 130, 44]. Відфільтруй тільки числа більше 10."
);
const arr4 = [5, 12, 8, 130, 44];
console.log("Old arr = ", arr4);
console.log(
  "New arr = ",
  arr4.filter((item) => item > 10)
);
console.log(
  "Задача 5: Є масив слів ['apple', 'banana', 'kiwi', 'strawberry']. Залиш тільки ті слова, довжина яких більше 5 символів."
);
const arr5 = ["apple", "banana", "kiwi", "strawberry"];
console.log("Old arr = ", arr5);
console.log(
  "New arr = ",
  arr5.filter((item) => item.length > 5)
);
console.log(
  "Задача 6: Є масив чисел [1, 2, 3, 4, 5, 6, 7, 8]. Відфільтруй тільки парні числа."
);
const arr6 = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("Old arr = ", arr6);
console.log(
  "New arr = ",
  arr6.filter((item) => item % 2 === 0)
);
console.log(" push / pop");
console.log(
  "Задача 7: Створи масив ['apple', 'banana']. Додай в кінець 'orange' та 'grape' за допомогою push. Виведи результат."
);
const arr7 = ["apple", "banana"];
console.log("Old arr = ", arr7);
arr7.push("orange");
arr7.push("grape");
// arr7.push("orange", "grape"); // or so
console.log("New arr = ", arr7);
console.log(
  "Задача 8: Є масив [1, 2, 3, 4, 5]. Видали останній елемент за допомогою pop і збережи його в змінну. Виведи і масив, і видалений елемент."
);
const arr8 = [1, 2, 3, 4, 5];
console.log("Old arr = ", arr8);
const delLastItem = arr8.pop();
console.log("New arr = ", arr8, "; Old Last Item = ", delLastItem);
console.log("shift / unshift");
console.log(
  "Задача 10: Є масив [10, 20, 30, 40]. Видали перший елемент за допомогою shift і збережи його в змінну. Виведи обидва результати."
);
const arr10 = [10, 20, 30, 40];
console.log("Old arr = ", arr10);
const delFirstItem = arr10.shift();
console.log("Old first Item = ", delFirstItem, "; New arr = ", arr10);
console.log("Комбіновані задачі");
console.log(
  "Задача 11: Є масив [1, 2, 3, 4, 5, 6]. Відфільтруй непарні числа, потім помнож кожне на 3."
);
const arr11 = [1, 2, 3, 4, 5, 6];
console.log("Old arr = ", arr11);
console.log(
  "New arr = ",
  arr11.filter((item) => item % 2 !== 0).map((item) => item * 3)
);
console.log(
  "Задача 12: Створи порожній масив. Додай туди числа 1, 2, 3 через push. Потім видали перший елемент через shift."
);
const arr12 = [];
console.log("Old arr = ", arr12);
arr12.push(1, 2, 3);
console.log("Temp arr = ", arr12);
arr12.shift();
console.log("New arr = ", arr12);
