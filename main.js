/* main.js */

// BIOS
// 512 bytes on disk
// store at 0xfc00

// magic string
//

// 1. Initialize stack
// sp
// 16 bit register
// copy value to AX register
// copy from AX to SP
// copy2ax()
// copy2sp()

// 2. Print the message
// copy AX, BX, and maybe CX
// execute interrupt
// copy2ax, bx, cx
// biosinterrupt

// halt the computer
// 1. disable interrupts
// 2. issue halt interrupt
// 3. Ingfinite lo

let ctors;

ctors = {};
