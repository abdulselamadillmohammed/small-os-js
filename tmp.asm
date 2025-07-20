bits 16
org 0xfc00        ; Set origin address to BIOS load address (for emulation/debug)

; mov ax, 0x7c00     ; Load stack address into AX
; mov sp, ax         ; Initialize the stack pointer

; nop
; nop
; dd 0x0
; mov bx, 0xaabb
; mov ax, 0xaabb
; mov cx, 0xaabb
; mov sp, ax
; dd 0x0
; nop
; nop

halt1:
    nop
    hlt
    jmp halt1
halt2:
    nop
    hlt
    jmp halt1