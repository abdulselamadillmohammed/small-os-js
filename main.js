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

// bbbbbbbb aaaaaaaa
// 01011100 01011100
// 11111111 00000000
// 01011100 00000000

let ctors;

let rev;
rev = (val) => {
  let a, b;
  let mask;

  mask = 0xff;
  a = val & mask;
  mask = 0xff00;
  i = val & mask;
  b = i >> 8;

  return String.fromCharCode(a).concat(String.fromCharCode(b));
};

// 0xccdd
// b8 dd cc

// b8 bb b9
ctors = {
  copy2ax: (val) => "\xb8" + rev(val),
  copy2bx: (val) => "\xbb" + rev(val),
  copy2cx: (val) => "\xbb" + rev(val),
  copy2sp: () => void 0,
  biosinterrupt: () => void 0,
  interruptoff: () => void 0,
  halt: () => void 0,
  jmp: (addr) => void 0,
  padding: (amt) => void 0,
  magic: () => void 0,
};

// Disassembling command:
// alias objdump86='objdump -M intel -b binary -m i8086'

// let x, y, z;

// x = 0xccdd;
// y = ctors.copy2ax(x);

// console.log(y.length);

// z = y.split("").map((a) => a.charCodeAt(0));
