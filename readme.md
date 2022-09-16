## <p align="center">The Assignment Problem</p>

To solve this problem, it was used the hungarian method, based on the materials below. And javascript was used for the algorithm.
* [Youtube Class - Hungarian Method](https:www.youtube.com/watch?v=ezSx8OyBZVc&ab_channel=ShokoufehMirzaei)
* [Wikipedia - Hungarian Method](https:en.wikipedia.org/wiki/Hungarian_algorithm)

## THE PROBLEM
<p>Calculate the least cost of production by assigning only one task to each machine. Data is provided in a matrix. Being:</p>

* Rows: the machines 
* Columns: the tasks
* Values: the cost of task production with that machine
* ex: 
  * [ [1, 2, 1],
  *   [4, 1, 5],
  *   [5, 2, 1] ]
output expected: (1-1)(2-2)(3-3) (string)

# The Method

matrix nxn                             
* [X11, X12, ..., Xnn]
* [X21, X22, ..., Xnn]
* [X31, X32, ..., Xnn]
* [..., ..., ..., ...]
* [Xn1, Xn2, ..., Xnn]

Rows constraints
* X11 + X12 + ... + Xnn = 1
* X21 + X22 + ... + Xnn = 1

Columns constraints
* X11 + X21 + ... + Xn1 = 1
* X12 + X22 + ... + Xn2 = 1

Value of Xij
* Xij = 1 if allocated
* = 0 otherwise

Steps of the Hungarian Method
* Step 1 - Find minimum value of each row, and subtract it from all the values of that row;
* Step 2 - Find minimum value of each column, and subtract it from all the values of that column;
* Step 3 - Find minimum number of rows and columuns that cover all the zeros of matrix;
  * Step 3.1 - assign all possible zeros;
  * Step 3.2 - cover all columns of assinged values;
  * Step 3.3 - find non-covered zeros and prime it;
    * Step 3.3.1 - if there is starred zero at the same row of primed zero - change row to covered and column of starred zero to uncovered;
    * Step 3.3.2 - if there is not a starred zero;
      * Step 3.3.2.1 - if there is a starred zero at the same column of primed zero;
        * Step 3.3.2.1.1 -  if there is a primed zero at the same row as starred zero above remove all starred zeros of the path and change all the primed zeros to starred. Call Step3 function again;
        * Step 3.3.2.1.2 - if there is not - Stop;
      * Step 3.3.2.2 - if there is not - Stop;
* Step 4 - if number of lines covered < matrix.length, then find minumun values of uncovered items. Subtract them, and add them to the intersection of the covered lines. Call step3 function again until number of covered lines >= matrix.length;
* Step 5 - Assign zeros for best solution;

## Ferramentas/Tecnologias utilizadas
* Javascript;

## Autores
| [<img src="https://avatars.githubusercontent.com/u/97759524?v=4" width=115><br><sub>Diego Ferreira</sub>](https://github.com/diegonf) | 
| :---: |