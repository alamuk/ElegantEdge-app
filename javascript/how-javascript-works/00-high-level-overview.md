# Overview

JavaScript is a high level object-oriented multi-paradigm programming language

JavaScript is a high level, prototype based object-oriented interpreted or just in time compiled, dynamic, single
threaded, gargabe collected
multi-paradigm programming language with first class functions and non-blocking event loop concurrency model

High-level: as we need resources (memory and cpu), and e.g. languages like c needs to manage those, but when
we don't need to manage there are languages that have abstractions to manage those called high level like
JavaScript and Phyton.

Garbage collected: Cleaning memory we don't use automatically from time to time

Interpreted or JIT compiled: computer processor understand 0s and 1s, since that's not practical to write, we write javascript
which is an abstraction, then this code we write is then turn into machine code, and javascript happens in the enginge.

Multi-paradigm, which is an approach of structuring code, will direct coding style and technique. - procedural -
organizing the code in a linear way with some functions in between - object-oriented - functional

    - IMPERATIVE OR DECLARATIVE

Prototype based object-oriented approach: means that all in JS is an object except primitive values. Wondered
why we can create an array and use the push method ? because of prototype inheritance, where there is a blueprint
that is called prototype and then the array we use inherits methods from the prototype.

First class functions: functions are treated like variables. we can pass them into other functions and return them from
functions.

Dynamic: dynamically typed, no data type definitions to variables, they become known at runtime, and can the type
of variable be dynamically changed. (eb. let x = 23, x = 'hello')

Single-threaded:

    - concurrency model, how the JS engine manages multiple task happening at the same time,

    - why we need that ?

    - JS runs in one single-thread (set of instructions executed ina computer CPU), so only do one thing at the time

    - What about a long running task ?

    - Sound it will block the single thread, however we want non-blocking behavior

    - How do we achieve that

    - By using the event loop takes long running tasks, executes them in background, and puts them back in the main thread once they are finished
