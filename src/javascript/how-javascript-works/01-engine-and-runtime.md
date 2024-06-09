<div style="display: flex; justify-content: space-between; align-items: center;">
<img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript Logo" width="100" height="100">
<h1>JavaScript Engine and JavaScript Runtime</h1>
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" width="100" height="100">
</div>

A **JavaScript Engine** is a computer program that executes JavaScript code. There are many steps involved in executing
JavaScript code, and that's what the engine does. Every browser has its own engine, with the most well-known being
Chrome's V8, which is also used in Node.js. Other browsers have their own engines as well.

Understanding a JavaScript engine is crucial, especially its components:

- **Call Stack**: Where the code is executed in an execution context.
- **Heap**: Where the objects needed by the application are stored.

## Compilation vs. Interpretation

The CPU can only understand machine code (0s and 1s), so programs need to be converted into machine code through
compilation or interpretation:

- **Compilation**: The code is converted into machine code all at once and then written to a portable file that can be
  executed on the CPU. Execution can happen long after compilation.
- **Interpretation**: An interpreter goes through the source code and executes it line by line. The source code still
  needs to be converted to machine code, but it is executed by the engine immediately.

JavaScript was initially an interpreted language, which made it slower. However, modern JavaScript engines use a
combination of compilation and interpretation called **Just-In-Time (JIT) Compilation**, where execution happens
immediately after compilation.

## The JavaScript Engine

When code enters the engine, it is parsed (read) into an Abstract Syntax Tree (AST). The code is split into small,
meaningful pieces, which are then converted into machine code. The resulting tree is used to generate machine code. JIT
compilation takes the AST, compiles it, and then executes it.

## JavaScript Runtime in the Browser

In the browser, the JavaScript runtime environment includes several components:

```
JS ENGINE               WEB APIS (accessible through the window object)
HEAP - CALL STACK       DOM - TIMERS - FETCH API - ...
                        CALLBACK QUEUE
                        CLICK - TIMER - DATA - ...
            EVENT LOOP
```

- **Heap**: An unstructured memory pool that stores all the objects our application needs.
- **Callback Queue**: A data structure that contains all the callback functions ready to be executed.

### How JavaScript is Executed in the Call Stack

- **Execution Context and The Call Stack**: JavaScript is executed in the call stack within the engine. After the code
  finishes compiling, it is ready to be executed.
- **Global Execution Context**: This context is created for top-level code (code not inside any function). Only the code
  outside functions will be executed initially. Functions are executed when called, so variable declarations and
  function declarations are executed in the global execution context, but the code inside functions is only executed
  when the functions are called.

### What is an Execution Context?

An execution context is an environment in which a piece of JavaScript code is executed. It stores all the necessary
information for code execution, such as local variables and arguments passed to a function.

- **Analogy**: Ordering a pizza at a takeaway. The pizza is the JavaScript code, and the box it comes in is the
  execution context. The box (execution context) also contains necessary items like cutlery and a receipt (local
  variables and arguments).

### The Execution Context in Detail

In any JavaScript project, there is only one global execution context, which is the default context for top-level code.
When functions are called, new execution contexts are created for each function. These contexts make up the call stack.

After the top-level code is executed, functions start to execute. Each function call creates a new execution context
containing all the information necessary to run that function, including:

1. **Variable Environment**: Stores variables and function declarations, along with a special `arguments` object
   containing all arguments passed to the function.
    - Functions can access variables outside their scope through the **Scope Chain**.
2. **Scope Chain**: Consists of references to variables located outside the current function.
3. **`this` Keyword**: Each execution context gets its own `this` keyword, except for arrow functions, which use
   the `this` keyword from their closest regular function parent.

### The Call Stack

The call stack keeps track of execution contexts, stacking them on top of each other to track where the program is in
its execution. The execution context on top of the stack is the one currently running. Once it finishes, it is removed
from the stack, and execution returns to the previous context.

---

This Markdown text provides a comprehensive overview of the JavaScript engine, runtime, execution context, and call
stack, making it easier to understand how JavaScript is executed in browsers.

## Scope & Scope Chain

As we know, each `execution context` has:

- Variable environment
- Scope chain
- `this` keyword

### What is Scoping?

Scoping controls how our program's variables are organized and accessed by the JavaScript engine. Scoping asks the questions:

- Where do variables live?
- Where can we access a certain variable, and where not?

In JavaScript, we have something called `Lexical Scoping`, which means that the way variables are organized and accessed is entirely controlled by the placement of functions and blocks in the program's code. For example, a function written inside another function has access to the variables of the `parent function`. Variable scoping is influenced by where exactly we write our functions and code blocks.

### Scope

Scope is the space or environment in which a certain variable is declared (variable environment in case of functions). There are three types of scope:

- Global Scope
- Function Scope
- Block Scope

#### Difference between Scope and Variable Environment

For functions, scope and variable environment are basically the same. In JavaScript, we have:

- Global Scope
- Function Scope
- Block Scope

The scope of a variable is the entire region of our code where a certain variable can be accessed. Scope is not the same as the scope of a variable, and we should know about this subtle difference.

### Three Types of Scope

1. **Global Scope**: For top-level code, variables declared outside functions or blocks are accessible everywhere in the program, including inside functions and blocks.

2. **Function Scope**: Each function creates a scope, and the variables declared inside the function scope are only accessible inside that function. This is also called LOCAL SCOPE. Local variables live in the function, and outside the function, the variables are not accessible at all. Function declarations, function expressions, and arrow functions all create their own scope. Starting with ES6, blocks also create scopes.

3. **Block Scope**: Everything between curly braces, such as a block of the `if` statement or a `for` loop. Just like with functions, variables declared inside a block are only accessible inside that block and not outside of it. Block scopes only apply to variables declared with `let` or `const`. `let` and `const` variables are block-scoped, whereas `var` is function-scoped.

### Example of Scope

```javascript
const myName = 'Oscar';

function first() {
  const age = 30;

  if (age >= 30) {
    const decade = 3;
    var millennial = true;
  }

  function second() {
    const job = 'teacher';

    console.log(`${myName} is ${age} years old ${job}`);
  }

  second();
}

first();
```

#### Global Scope

The `myName` variable is the only declaration in the global scope. The `first` function also counts as a variable present in the global scope.

Inside the global scope, we have a scope for the `first()` function, which contains the `age` variable. Inside the `first()` scope, we have the `second` function, which creates its own scope containing the `job` variable set to "teacher". We have a nested structure of scopes.

In the `second()` function, the line of code `console.log(`${myName} is ${age} years old ${job}`);` requires the `myName` and `age` variables that are not declared inside the current scope. Every scope always has access to all the variables from all its outer scopes (parent scopes). Therefore, the scope for `second()` can access the `age` variable from the scope of the `first()` function, and the `first()` function can access variables from the Global Scope.

This process is called VARIABLE LOOKUP. A certain scope will never have access to the variables of an inner scope.

#### `if` Statement Scope

The `if` statement creates its own scope starting with ES6. The `decade` variable is scoped to the block, but the `millennial` variable is scoped to the `first` function scope because it is declared with `var`.

### Difference between Scope Chain and Call Stack

```javascript
const a = 'Oscar';
first();

function first() {
  const b = 'hello';
  second();

  function second() {
    const c = 'Hi!';
    third();
  }
}

function third() {
  const d = 'Hey!';
  console.log(d + c + b + a);
  // Reference Error
}
```

#### Call Stack

The order in which functions are called forms the call stack:

1. `third()` EC
2. `second()` EC
3. `first()` EC
4. Global EC

Each function creates its own execution context, and the variable environment for each context includes the variables declared in that function.

#### Scope Chain

The scope chain is all about the order in which functions are written in the code. The scope chain in a certain scope is equal to adding together all the variable environments of all parent scopes. The order of function calls does not affect the scope chain at all.

In the `third()` function, we try to access variables `b`, `c`, `d`, and `a`. Variable `d` is no problem as it's in the `third()` function scope. However, variables `c` and `b` are not found in the scope chain because they are defined in the `second()` function, leading to a `ReferenceError`.

### Summary

- Scoping asks the question "Where do variables live?" or "Where can we access a certain variable, and where not?"
- JavaScript has three types of scope: Global Scope, Function Scope, and Block Scope.
- `let` and `const` variables are block-scoped, while `var` variables are function-scoped.
- JavaScript uses lexical scoping, meaning the rules of where we can access variables are based on exactly where functions and blocks are written in the code.
- Every scope has access to all the variables from all its outer scopes, forming the `scope chain`.
- The scope chain is a one-way street: a scope will never have access to the variables of an inner scope.
- The scope chain has nothing to do with the order in which functions are called; it is determined by the order in which functions are written.

HAND WRITTEN

## Scope & Scope Chain

As we know that each `execution context` has:

- Variable environment
- Scope chain
- this keyword

- What scoping means?
  - Scoping controls how our program's variables are organized and accessed by the JavaScript engine.
  - Scoping ask the questions
    - Where do variables live ?
    - Where can we access a certain variable, and where not ?

In Javascript we have something called `Lexical Scoping`, and means that the way variables are organised and accessed
is entirely controlled by the placement of functions and of blocks in the programs code.

For example a function that is written inside another function has access to the variables of the `parent function`.
Variable scoping is influenced by where exactly we write our functions and code blocks.

- Scope: is the space or environment in which a certain variable is declared (variable environment in case of functions).
  - There is Global Scope, Function Scope and Block Scope.
- What's the difference between Scope and Variable Environment ?
  - For the case of functions it's basically the same.
  - In JavaScript, we have the GLOBAL SCOPE, FUNCTION SCOPE AND BLOCK SCOPE
- Scope of a variable is the entire region of our code where a certain variable can be accessed.

Taking a closer look, Scope is not the same as Scope of a variable. we should know about this subtle difference.

Three Types of Scope

- Global Scope for top-level code, variables that ar declared outside functions or blocks, will be accessible everywhere in the program either functions or blocks.

- Function Scope: each and every function creates a scope and the variables declared inside the function scope are only accessible inside that function. Call LOCAL SCOPE.
  So local variables live in the function so to say, and outside the function the variables are not accessible at all.

This is the same as to say variable environment but still we need to give it the name of scope in this context because BLOCKS also creates scopes.

It actually does not matter what kind of function we are using, function declarations, function expressions and arrow functions all create their own scope.

Traditionally only functions used to create scopes, in JS. But starting in ES6, Blocks also create scopes now.

- Block Scope: everything that is between curly braces, such as a block of the if statement or a for loop. Just like with functions, variables declared inside a block are only accessible inside that bloc and not outside of it.

The big difference is that block scopes only apply to variables declared with `let` or `const`.
Only let or const variables are restricted to the block in which they were created. That's why we say that let and const variables are block scoped.

IF I declare a variable using the `var` in the block then that variable would actually still be accessible outside the block, and would be scoped to the current function or to the global scope.
AND so we say that `var` is function scoped.

In ES5 and before we only had global scoped and function scope. And that's why ES5 variables declared with `var`, only care about functions, but not about blocks. They simply ignore them.

Starting with ES6 all functions are blocked scoped. At least in Strict Mode.

Functions declared inside a block are only accessible inside that block.

Summary: `let`, `const` variables and functions are block scoped.

Let's check the scope

```javascript
const myName = 'Oscar';

function first() {
  const age = 30;

  if (age >= 30) {
    const decade = 3;
    var millenial = true;
  }

  function second() {
    const job = 'teacher';

    console.log(`${myName} is ${age}-old ${job}`);
  }

  second();
}

first();
```

Global Scope: the myName variable is the only declaration that we have in the global scope.

Technically the first function also counts as a variable that is present in the global scope. But we can keep it simple for now. So we consider only variable declarations.

Inside the global scope we have a scope for the `first()` function, because each function creates its own scope. And
what's in this scope ?
It's the `age` variable right at the top of the function.
Next inside of the first() scope we consider the `second function` which creates its own scope containing the `job`
variable set to teacher.
We have a nested structure of scopes with one inside the other.

But now the interesting part, because in the `second()` function we have this line of
code ``console.log(`${myName} is ${age}-old ${job}`);`` where we need the
`myName` and the `age` variable that are not declared inside the current scope. But we need these variables here or we could not create the string.

How this can be fixed ?

The secret is that every scope always has access to all the variables from all its outer scopes. from all parent scopes.

Meaning the scope for `second()` can access the `age` variable from the scope of the `first()` function, also means that
the `first()` function can access variables that are in the Global Scope,
because that's the parent scope.
As a consequence of this the `second()` scope will then also be able to access the `myName` variable from the Global Scope. Because it has access to the variables from the `first()` scope.

By the way all this also applies to function arguments but in this example, we don't have any.

In summary this is how Scope Chain works. In other words if one scope needs to use certain variable but cannot find it
in the current scope it will look up in the scope chain and see if it can find a variable
in one of the parent scopes, if it can will use the variable if not it will be an error. `This process is called VARIABLE LOOKUP`.
IMPORTANT is to know that this is not working the other way around A certain scope will never have access to the variables of an inner scope.

There is one scope left and that's the one created by the `if` statement, but remember that starting with ES6 not only functions create scopes, but also blocks.
However, these scopes only work for the ES6 variable types. For `let` and `const` variables. That's why the only variable that's in the scope is `decade`, the
`millenial` variable is var and not scoped to just this block, so the `millenial` variable is part of the `first function scope`, so again for a variable
declared with `var` block scope don't apply at all, they are function scoped not block scoped.

```javascript
if (age >= 30) {
  const decade = 3;
  var millenial = true;
}
```

Regarding the scope chain if the `millenial` variable is in the `first()` function scope then of course the second
function scope also has access to it, even
if it doesn't really need that variable.
Also, the scope chain does of course apply to block scopes as well. Therefore in the `if` block scope we get access to all the variables from all it outer scopes, from the
`first()` function scope and from the `global scope`.

### Difference between Scope Chain and Call Stack

```javascript
const a = 'Oscar';
first();

function first() {
  const b = 'hello';
  second();

  function second() {
    const c = 'Hi!';
    third();
  }
}

function third() {
  const d = 'Hey!';
  console.log(d + c + b + a);
  // Reference Error
}
```

We start by calling the `first()` function which then calls `second()` function which in turn calls the `third()` function.
So from what we learned before the call stack for this example will look like this:

- CALL STACK (order in which functions were called)

third() EC
d = 'Hey'

second() EC
c = 'Hi'

first() EC
b = 'Hello'
second = <function>

Global EC
a= 'Oscar'
first = <function>
third = <function>

Explanation:

One execution context for each function in the exact order in which they were called.
In the example is also included the variable environment of each execution context.

`All this has nothing to do with scopes` or the `scope chain`

All we are doing here is creating one execution context for each function call and filling it with the variables of
that function.

So now we can start building the scope chain, starting with the Global SCOPE and the variables available in the
global scope are exactly the ones stored in the variable environment of the GLOBAL EXECUTION CONTEXT.
Note that in this example we are including functions in each scope unlike we did in the previous.
In the Global Scope we also call the `first() function` which is the reason why we have an execution context for it in
the call stack.
And this function of course also gets its own scope which contains all the variables that are declared inside the
function. And once again this is the same as the variable environment of the functions execution context.

first() EC
b = 'Hello' FIRST VE
second = <function>

---

a = 'Oscar'
first = <function> GLOBAL VE
third = <function>

However, that is not all, because now we already know about the scope chain, so the first scope also gets access to
all the variables from its parent scope thanks to the scope chain.
As we all know the scope chain is all about the order in which functions are written in the code, but what's really
important to note is that the scope chain has nothing to do with the order in which the functions were called.
Or in other words, the scope chain has nothing to do with the order of the execution contexts in the CALL STACK.
The scope chain does get the variable environments from the EXECUTION CONTEXT. The order of function calls is not
relevant to the SCOPE CHAIN at all.

Moving on to the `second() function` once again, its scope is equal to its variable environment. Also it's lexically
written within the `first() function`. And so of course it will have access to all its parent scopes as well. So we
can say that the scope chain in a certain scope is equal to adding together all the variable environments of all the
parent scopes.

second() EC
c = 'Hi'

---

b = 'Hello'  
second = <function>

---

a = 'Oscar'
first = <function>  
third = <function>

In the `second() function` we try to all the `third function()` But why that does work ?
It works because the `third() function` is in the scope chain of the `second() function` scope, it's a function in the
global scope or a global function, and therefore it's accessible everywhere.
This will create a new scope along with the scope chain as we already know.
What happens in this `third() function`: we are trying to access variables `b`, `c`, `d` and `a`, `d` is no problem
because it's right there in the `third() function` scope. Then variable `c` is not in a local scope so JavaScript needs
to do a variable lookup, so it looks up in the scope chain looking for variable `c` but it's not there because `c` is
defined in the `second() function`, and there is just no way in which the third function can access variables defined
in the `second() function`. That is true even though it was the `second() function` who called the `third()` and even
more proof that the order in which functions are called does not affect the scope chain at all. So here as a result we
get the `reference error` because both `c` and `b` cannot be found in the `third() function` scope nor in the scope chain.

Summary

- scoping ask the question `where do variables live?` OR `Where can we access a certain variable, and where not ? `
- Three types of scope in JS, Global Scope, function scope and block scope.
- However `let` and `const` variables are block-scoped. Variables declared with `var` end up in the closest function scope.
- In JavaScript, we have lexical scoping, so the rules of where we can access variables are based on exactly where in the code functions and blocks are written.
- Every scope always has access to all the variables from all its outer scopes. This is the `scope chain`!
- The scope chain is a one-way street: a scope will never, ever have access to the variables of an inner scope.
- The scope chain in a certain scope is equal to adding together all the variable environments of all parent scopes.
- We need to keep in mind that the scope chain has nothing to do with the order in which functions were called. The order of function calls does not affect the scope chain at all.
