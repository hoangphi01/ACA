# ADVANCED COMPUTER ARCHITECTURES

**Imre Varga PhD**

University of Debrecen,
Department of IT Systems and Networks

09 March 2026

---

## Topics

- Assembly and machine codes
- Basics of processors: structure and operation
- The x86 and the ARM architectures
- Modern solutions
- The cache
- Other architectures
- ...

IPPV131-K2

---

## Assembly and machine codes

- Assembly language
  - Instruction set
- Addressing modes
  - Machine code

---

### Assembly programming

- Low-level abstraction, elementary instructions
- Need for hardware knowledge
  - Platform dependent
- Liberty of programmers
- Ability to optimize code for task
- Higher performance
- Code reading difficulties
- PC, microcontroller

Abstraction levels (top to bottom):
- High level languages
- Assembly programming
- Machine code

---

### ISA – Instruction Set Architecture

Details of the computer related to programming:

- Register set
- Word width
- Machine instructions
- Addressing modes
- Memory architecture
- Interrupt handling

---

### Register set

- **Registers:** Small capacity, fast-access storage circuits in the processor, to store, for instance, the operands and results of operations.
- Important: size, count, name, role, etc.
- Few examples:
  - Main 32-bit registers of x86 architecture:
    `eax, ebx, ecx, edx, esp, ebp, edi, esi, eip, eflags`
  - Main 32-bit registers of ARM architecture:
    `r0, r1, r2, r3, ... r12, SP, LR, PC, CPSR`

---

### Types of instructions

- Data transfer instructions
- (Integer) arithmetic instructions
- Bitwise logical instructions
- Shift instructions
- Control flow instructions
- String instructions
- BCD and float arithmetic instructions
- Compiler directives
- Other instructions

---

### Addressing modes

How can we access data in memory?

- Implicit, implied
- Immediate
- Direct, absolute
- Register direct
- Indirect
- Register indirect
- Indexed address
- Register relative address
- ...

---

### Assembly code example

x86-64 architecture:

```asm
    ...
# eax=-1
    mov eax, 0xFFFFFFFF
# edx=edx+3
    add edx, 3
# edx=edx*4
    shl edx, 2
# eax==edx or eax>edx or eax<edx ?
    cmp eax, edx
# if eax==edx goto .L0 (so skip next instruction)
    jz   .L0
# eax=eax-1
    dec eax
# (*ecx)=eax (ecx: address of a variable)
.L0: mov DWORD PTR[ecx], eax
    ...
```

---

### Machine code

- Only language understandable for processor
- Binary format
- Operation, addressing mode, operand size, operand type (reg./mem./const.), etc.
- Can vary from processor to processor
- Must be easily decodable by the hardware
- Format in x86 architecture:

| Number of bytes | 0-4    | 1-3      | 0-1     | 0-1 | 0-4          | 0-4            |
|-----------------|--------|----------|---------|-----|--------------|----------------|
|                 | Prefix | Op.code  | Mod-R/M | SIB | Displacement | Immediate data |

Mod-R/M breakdown:

| Number of bits | 2   | 3          | 3   |
|----------------|-----|------------|-----|
|                | Mod | REG/Op.code | R/M |

SIB breakdown:

| Number of bits | 2     | 3     | 3    |
|----------------|-------|-------|------|
|                | Scale | Index | Base |

---

### Machine code example

C language code:

```c
y=5;
z=6;
x=z+y*7;
```

Assembly code (x86):

```asm
mov    DWORD PTR [ebp-12], 5
mov    DWORD PTR [ebp-8], 6
mov    ebx, DWORD PTR [ebp-12]
mov    eax, ebx
sal    eax, 3
sub    eax, ebx
add    eax, DWORD PTR [ebp-8]
mov    DWORD PTR [ebp-16], eax
```

Machine code (x86):

```
c7 45 f4 05 00 00 00 c7 45 f8 06 00 00 00
8b 5d f4 89 d8 c1 e0 03 29 d8 03 45 f8
89 45 f0
```

---

### Machine code example (detailed)

x86 architecture:

```
assembly:     sub eax, ebx   # R1 = R1-R2
machine code: 0x29 0xD8
```

Binary breakdown:

```
  2        9        D        8
0010 1001  1101 1000

     OpCode      d  s  MOD   REG   R/M
```

- **SUB** operation
- REG is the source
- 32-bit register
- Register addressing
- Source: **EBX**
- Destination: **EAX**

---

## Basics of processors: structure and operation

- CPU
- Registers
- Fetch-execute cycle
- RISC / CISC processors

---

### Schematic structure of computers

- Processor
- Memory
- Input-Output interface
- Bus system
- Peripheral

```
Processor          Memory          I/O interface       Peripheral

                   Bus system
```

---

### Processor

Central Processing Unit (CPU)

Parts:
- Control Unit (CU)
- Arithmetic Logic Unit (ALU) — part of Execution Unit (EU)
- Addressing Unit (AU) and Bus Interface Unit (BIU)
- Registers
- Inner bus system
- Inner cache
- Other (E.g., clock generator)

---

### Registers

- Small (flip-flop-like) storage circuit
  - Size often equal to the width of data bus
  - Generally, it can store 8-512 bits
- Fast access (access time < 1ns)
- Their number depends on the processor (10-100)
- They build register files/blocks
- 3 categories:
  - System-, general purpose- and special purpose registers

---

### Arithmetic logic unit

- Performs calculations
- Contains: fixed-point adder, complement composer, shift registers, bitwise and logic operation circuit, etc.

```
A operand        B operand

instruction  -->   ALU    --> status

               result
```

---

### Control unit

- Based on the content of IR controls/governs operation of other units (E.g., ALU)
- Important registers: IR, PC, SR
- The control can be:
  - **Hard-wired (direct) way:** Execution of every instruction is based on complex digital electronical circuits
  - **Microprogrammed (indirect) way:** All operation code launches a tiny microprogram (stored in ROM)

---

### Addressing unit

Addressing Unit (AU), Address Generation Unit (AGU)

- Instructions have several addressing modes to find out the address of operands
- The AU places the address of operands into the MAR
- References in instructions are mapped to "physical" memory address
- Handling memory protection errors
- Related to BIU

---

### Clock signal

- Periodical electronical square wave
- Clock generator (oscillator) produces it
- Synchronize the operation of units
- Frequency is proportional to the heat produced by the CPU
- Period is greater than signal propagation time
- 1 MHz – 4 GHz
- Often variable (turbo, powersave)
- Today not proper for speed characteristic (FLOPS)

---

### CISC processor

**Complex Instruction Set Computer**

- Many complex instructions (large code density)
- Lot of addressing modes
- Variable length instructions
- Several clock cycles for execution of instruction
- Microprogrammed (uops)
- Few registers
- Instructions can access RAM
- E.g.: IA-32, Motorola 68k

---

### RISC processor

**Reduced Instruction Set Computer**

- Few, simple instructions
- Few addressing modes
- Fixed-length instructions
- Execution within one clock cycle
- Hard-wired or microprogrammed
- Several registers
- Only Load/Store instructions access RAM
- E.g.: ARM, MIPS, AVR

---

### CISC vs RISC

Example:

```
x = a+b-32;
r1: address of a; r2: address of b; r3: address of x
```

**CISC:**

```asm
ADD r4, [r1], [r2]
SUB [r3], r4, 32
```

- result: data in register
- operand: address of data in register, or constant data

**RISC:**

```asm
LDR r5, [r1]
LDR r6, [r2]
ADD r4, r5, r6
SUB r7, r4, 32
STR [r3], r7
```

(Pseudo-assembly)

---

### Operation of CPU

- Iteration of same atomic operations
  - Fetch-execute cycle
- Synchronized by the clock
- CU controls
- Infinite, monotonic, mechanic iteration of:
  - Data movement
  - Execution of operations
- Important: the content of registers (PC, IR, SR, ACC, MAR, MDR, etc.) and their change

---

### Fetch-Execute cycle

1. **Instruction fetch (IF)**
   - PC register refers to the memory address of the next instruction. Reading from here to IR.
   - PC is updated to the address of next instruction

2. **Instruction decoding (ID)**
   - Interpretation of the opcode. What kind of operation? What is the input data? Where to save the result? (Which registers are used?)
   - Instruction Set Architecture (ISA) defines it.
   - It can be hard-wired or microprogrammed.

3. **Execution or address calculation (EX)**
   - ALU works, result into internal temporal register, in case of Load/Store instruction calculation of the proper memory address.

4. **Memory access (MEM)**
   - In case of Load/Store instruction reading/writing of given data memory address.

5. **Writing back (WB)**
   - Result of operation or read data stored into destination register.

---

## The x86 and the ARM architectures

- Structure of the processor
- Register set
- Memory handling
- Assembly programming

---

### Beginnings

- Intel developed a "new" CISC processor between 1976-78 called Intel 8086
- Later it was improved:
  - Intel 80186 (1982)
  - Intel 80286 (1982)
  - Intel 80386 (1986)
  - Intel 80486 (1989)
  - ..., still go on
  - New processors are backward compatible
- The processor family is referred as x86
- Main manufacturers: Intel, AMD, VIA

---

### x86 register set

```
         31                  15    AH    7    AL    0
  EAX                              AX
  EBX
  ECX
  EDX
  ESI                                    SI
  EDI                                    DI
  EBP                                    BP
  ESP                                    SP

  CS                                              ES
  DS                                              FS
  SS                                              GS
  EIP                                    IP
  EFLAGS                                FLAGS
```

---

### x86 register set – Main registers (general purpose registers)

- **EAX** — Primary work register, multiplication, division, return value
- **EBX** — Work register, base pointer in DS
- **ECX** — Work register, (loop)counter, 4th parameter
- **EDX** — Work register, input/output, multiplication, division, 3rd parameter

---

### x86 register set – Index (addressing) registers

- **ESI** (source index register) — Source index of string operations, working with DS, 2nd parameter
- **EDI** (destination index register) — Destination index of string operations, working with ES, 1st parameter
- **ESP** (stack pointer register) — Address of data on the top of stack, working with SS
- **EBP** (base/frame register) — Related to subroutines, working with SS

---

### x86 register set – Segment registers

- **CS** — Address of code segment, IP works with it
- **DS** — Address of data segment (static variables)
- **SS** — Address of stack segment, ESP and EBP use it
- **ES, FS, GS** — Address of extra segment, base of EDI is ES

---

### x86 register set – EFLAGS register

- Status bits
- Control bits
- System bits

```
Bit 31-24:  0  0  0  0  0  0  0  0
Bit 23-16:  0  0  ID VIP VIF AC VM RF
Bit 15-8:   0  NT   IOPL   OF DF IF TF
Bit 7-0:    SF ZF  0  AF  0  PF  1  CF
```

---

### x86 register set – Program counter

- **EIP** (Instruction pointer)
  - Refers to next instruction together with CS
  - During all "fetch-execute" cycle it is incremented by the length of instruction (except control passing)

**Other registers:**
- Further registers helping CPU operation
- Hidden from programmer

---

### x87 register set

- Floating point unit (mathematical co-processor)
- 8 pcs of 64 (80) bit registers (ST(0)-ST(7))
- Stack-based operation
- Double precision floating point representation
- 2 more bits per registers:
  - 00 valid, 01 null, 10 special (Inf, NaN), 11 empty
- 16-bit status registers (E.g., OE, UE, ZE, TOS, B, DE)
- 16-bit control registers (E.g., RC, PC)
- 48-bit program counter and data pointer

---

### Input-Output

- Port-mapped I/O (PMIO)
- 16 bit I/O addresses (0h-FFFFh)
- Separate instructions (in, ins, out, outs, etc.)
- More ports belong to a device:
  - Data, Instruction, Status
- Some devices available via I/O ports:
  - DMA controller, programmable interrupt handler (8259A), timer (8254), keyboard (8042), real time clock, mathematical co-processor, PATA controller, etc.
- Linux: `/proc/ioports`

---

### x86 instructions, operands

- Several hundred instructions
- Instructions have 0, 1 or 2 operand(s):
  - Register (8, 16, 32 bits)
  - Constant (8, 16, 32 bits)
  - Memory content — Memory address and size forcing:

```asm
mov   al, BYTE PTR [rbx]
mov   ax, WORD PTR [rbx]
mov   eax, DWORD PTR [rbx]
mov   rax, QWORD PTR [rbx]
```

---

### x86 addressing modes

Summary of effective address (EA) forms:

```
Segment:  Base  + Index  * Scale  + Offset
```

- **Segment:** CS, SS, DS, ES, FS, GS, or none
- **Base:** EAX, EBX, ECX, EDX, ESI, EDI, EBP, ESP, or none
- **Index:** EAX, EBX, ECX, EDX, ESI, EDI, EBP, or none
- **Scale factor:** 1, 2, 4, 8, or none
- **Offset:** offset or nothing

Example:

```asm
mov EAX, [DS:EBP+EDI*4+16]
```

The same instruction in different form:

```asm
mov EAX, DS:10h[EBP][EDI*4]
```

---

### x86 assembly syntax

**Intel syntax:**

```asm
.intel_syntax noprefix
.globl main
main: push ebp
      mov ebp, esp
      sub esp, 16
      mov DWORD PTR [ebp-16], 2
      mov DWORD PTR [ebp-12], 3
      cmp DWORD PTR [ebp-16], 4
      jne .L2
      mov eax, DWORD PTR [ebp-12]
      mov DWORD PTR [ebp-8], eax
      jmp .L3
.L2:  mov DWORD PTR [ebp-8], 4
.L3:  mov eax, DWORD PTR [ebp-8]
      add esp, 16
      pop ebp
      ret
```

**AT&T syntax:**

```asm
.att_syntax noprefix
.globl main
main: pushl %ebp
      movl %esp, %ebp
      subl $16, %esp
      movl $2, -16(%ebp)
      movl $3, -12(%ebp)
      cmpl $4, -16(%ebp)
      jne   .L2
      movl -12(%ebp), %eax
      movl %eax, -8(%ebp)
      jmp   .L3
.L2:  movl $4, -8(%ebp)
.L3:  movl -8(%ebp), %eax
      addl $16, %esp
      popl %ebp
      ret
```

---

### x86 subroutine calling convention

**Rules of caller:**

- Parameters in given order into registers: `edi, esi, edx, ecx, ...`
  - Or pushing parameters in reverse order into stack
  - Floating point parameters in other registers (number of them in eax register)
- Invocation (return address into stack, update program counter to subroutine address)
- After return removing parameters from stack
- Return value in `eax` register

**Rules of callee (subroutine):**

- Saving base pointer (EBP) into stack
- Copying stack pointer (ESP) into EBP
- Allocation space in stack for local variables
- Necessary registers saved into stack
- Putting return value into `eax` register
- Recovering saved registers and stack
- Return (address is in stack)

---

### ARM architecture

- Advanced/Acorn RISC Machine
- Since 1985
- Continuous development
  - ARMv1 (1985) – ARMv9 (2021) architectures
- The ARM Ltd sells licenses, no production
- Manufacturers: Apple, Samsung, Qualcomm, ...
- Application: smartphones, media players, game consoles, routers, navigation systems, cameras, on-board systems (billions of CPUs per year)

---

### ARM register set

In case of ARMv7 (AArch32):

- **R0-R15:** sixteen 32-bit general registers (in some modes further private registers)
  - Frame pointer (FP=R11)
  - Stack pointer (SP=R13)
  - Link register (LR=R14)
  - Program counter (PC=R15)
- **Status register (CPSR):**

```
Bit 31-16: N Z C V Q IT J DNM GE
Bit 15-0:  IT E A I F T Mode
```

---

### ARM instructions

- Uniform 32-bit instructions
- Only load/store instructions access memory
  - Other instructions use registers
  - Powerful indexed addressing modes
- Numerous CPU modes
  - E.g., User, System, IRQ, FIQ, Supervisor, Abort, ...
- 2-priority-level interrupt subsystem
- Hardwired control unit (no microcodes)
- Bi-endianness (default Little-endian)

---

### ARM instructions, operands

**Arithmetic and logic instructions** — 3 operands (register or constant):

```asm
add R1, R2, R3      ; R1=R2+R3
sub R1, R1, #1      ; R1=R1-1
```

**Load/Store instructions** — 2 operands (register, constant or memory reference):

```asm
ldr R1, [R0]        ; register indirect
str R2, [R1,#4]!    ; pre-indexed
```

**Control-flow instructions** — 1 operand (label):

```asm
b mylabel            ; jump to somewhere
```

---

### ARM conditional execution

- 4-bit condition code in each machine instruction
- Instructions are not always executed, sometimes they are ignored
- No branching instructions in short if statements

**Example: greatest common divisor**

ARM assembly:

```asm
Loop: cmp    R0, R1
      subgt  R0, R0, R1
      sublt  R1, R1, R0
      bne    Loop
```

x86 assembly (Intel):

```asm
Loop: cmp    eax, ebx
      je     End
      jl     Less
      sub    eax, ebx
      jmp    Loop
Less: sub    ebx, eax
      jmp    Loop
End:  nop
```

---

### ARM subroutine calling convention

- Parameters into the R0-R3 registers
- Return address into the LR register ("leaf" call)
- Control-flow by branch-and-link (`bl`) instruction
- The R4-R11 and LR registers saved into the stack (`push`, `pop`) by caller, if necessary
- Return value in R0 register
- Return by `mov PC, LR` or `bx LR` instructions

---

## Modern solutions

- Parallel execution
- Pipeline operation
- Superscalar and vector processors
- GPU

---

### "Classical" architecture

In-order (serial) execution (von Neumann)

Possible performance improvements of "classical" architectures:

- Increasing CPU clock frequency
- Application of co-processors (FPU)
- Direct Memory Access (DMA)
- Larger word size (larger address space/registers)
- Application of cache
- Faster bus system

---

### Dynamic clock setting

Higher clock frequency leads to higher produced heat and higher consumption (limiting factor)

- **Intel SpeedStep and AMD PowerNow!**
  - If the core is "idle" clock frequency and power is reduced saving energy.
- **Intel Turbo Boost and AMD Turbo Core**
  - A core can use higher frequency if rest of cores are not loaded. (Heat remains below threshold.)

---

### Floating-Point Unit

- FPU: mathematical co-processor
  - E.g., Intel x87
- Integer and floating-point arithmetic is architecturally different
- Earlier separate co-processor, now integrated into CPU
- Stack-based register set: ST(0)-ST(7)
- Separate instruction set:
  - E.g., FADD, FMUL, FDIV, FSQRT, FSIN, ...

---

### DMA and Cache

**Direct Memory Access (DMA):**
- Not all memory operation is controlled by the CPU
- Direct RAM-RAM or RAM-I/O blocked data movement without CPU

**Cache:**
- Intermediate storage between CPU and RAM
- Contains a copy of recently/frequently used data
- Low access latency
- Small capacity

---

### 64-bit architectures

**x86-64 (Intel 64, AMD64):**

- 64-bit general purpose registers: `rax, rbx, rcx, rdx, rbp, rsp, rip, rsi, rdi, r8-r15`

```
rax / r8              eax / r8d     ax / r8w    al / r8b
```

- Backward compatibility with x86 (IA-32)
- 64-bit virtual address (in implementation 48bit)
- 48-bit physical address (256TB) (extendable to 52 bit)
- Operation modes: Long mode (no memory segmentation), Legacy mode

**IA-64:**
- 2001-2025
- Itanium processor family
- 128 general 64-bit registers (32 static + 96 as stack)

**AArch64:**
- 2011-
- ARMv8 processor family
- 31 general 64-bit registers (x0-x30), +PC

```
x0-x30                              w0-w30
63                    31                    0
```

---

### Parallelism

- **Bit level parallelism** — Operations on all bits at the same time
- **Data level parallelism (DLP)** — Same instruction on several data at the same time
- **Instruction level parallelism (ILP)** — Run of assembly instructions "next to each other"
- **Task (thread) level parallelism (TLP)** — Parallel execution of instruction groups
- **Process level parallelism** — More running processes (multiprogrammed OS)

---

### Flynn's taxonomy

Classification from the point of view of parallelism:

- **SISD** (Single Instruction Single Data) — E.g., classical, early one core PCs
- **SIMD** (Single Instruction Multiple Data) — E.g., vector processors, GPU
- **MISD** (Multiple Instruction Single Data) — E.g., fault tolerant systems (space shuttle)
- **MIMD** (Multiple Instruction Multiple Data) — E.g., multicore- or superscalar processors

---

### Instruction level parallelism

ILP solutions:

- Pipeline execution
- Out-of-Order Execution (OoOE)
  - Register renaming
- Speculative execution
  - Branch prediction
- Superscalar execution
- Using Very Long Instruction Word (VLIW)

---

### Execution of an instruction

Fetch-execute cycle (RISC logic) — All instructions have the following phases:

1. Instruction fetch (IF)
2. Instruction decode (ID)
3. Execution (EX)
4. Memory access (MEM)
5. Write back (WB)

An instruction is executed in a few (more than one) clock cycles.

**Simple RISC datapath:**

```
IF           ID           EX           MEM          WB

instruction  register     arithmetic   data         register
memory       file         logic unit   memory       file

CLK
```

---

### Pipelining

- Pipelined architecture of execution
- More instructions are under execution at the same time, but all of them in distinct phases
- In some processors even 30 phases/instruction
- Execution time of an instruction is not reduced
- However, the number of finished instructions in a time unit (throughput) increases
- Program run is faster

```
CPU time
[clock]    IF           ID           EX           MEM          WB
  1.   instruction 1
  2.   instruction 2  instruction 1
  3.   instruction 3  instruction 2  instruction 1
  4.   instruction 4  instruction 3  instruction 2  instruction 1
  5.   instruction 5  instruction 4  instruction 3  instruction 2  instruction 1
  6.   instruction 6  instruction 5  instruction 4  instruction 3  instruction 2
  7.   instruction 7  instruction 6  instruction 5  instruction 4  instruction 3
  8.   instruction 8  instruction 7  instruction 6  instruction 5  instruction 4
```

- Theoretical execution time (latency): **5 clock / instruction**
- Theoretical throughput: **1 instruction / clock**

---

### Hazard

- Sequential execution principle (von Neumann): Supposes all instructions are finished before the next instructions are started
- It is not true for pipelined processors
- **Hazard:** a situation when it leads to a problem
- Types:
  - Data hazard
  - Structural hazard
  - Control hazard

---

### Data hazard

Instructions under execution use/modify the same data:

- **RAW** (Read After Write, data dependency)
  - `add r3, r1, r2`
  - `add r4, r3, r2`
- **WAR** (Write After Read, name dependency)
  - `add r3, r1, r2`
  - `add r2, r1, r4`
- **WAW** (Write After Write, name dependency)
  - `add r3, r1, r2`
  - `add r3, r4, r1`

(ARM assembly examples)

---

### Structural and control hazard

**Structural hazard:**
- If the processor hardware is not able to execute given instructions at the same time
- E.g., if instructions are in IF and MEM phase, reading memory simultaneously

**Control hazard:**
- In case of branching CPU does not know in advance which instruction must be placed into the pipeline

---

### Handling hazards

**Data hazard:**
- Pipeline bubble/stall
- Operand/result forwarding (bypassing)
- Out-of-Order Execution (OoOE)
- Register renaming

**Structural hazard:**
- Pipeline bubble

**Control hazard:**
- Pipeline bubble
- Speculative execution

---

### Pipeline bubble/stall

- If control unit realizes hazard after IF phase, it inserts a NOP instruction delaying the next instruction in pipeline
- When the instruction is ready with a result (after the delay) the next instruction can use it
- Bubble ("idle" state) in pipeline
- Running time is increasing, but still faster than without pipeline
- Also known as pipeline stall

```
CPU time
[clock]    IF             ID             EX             MEM            WB
  1.   ADD r1,r2,r3
  2.   SUB r4,r5,r1   ADD r1,r2,r3
  3.                  SUB r4,r5,r1   ADD r1,r2,r3
  4.                  SUB r4,r5,r1     (bubble)      ADD r1,r2,r3
  5.                  SUB r4,r5,r1     (bubble)        (bubble)     ADD r1,r2,r3
  6.                                 SUB r4,r5,r1      (bubble)      (bubble)
  7.                                                 SUB r4,r5,r1    (bubble)
  8.                                                                SUB r4,r5,r1
```

Data dependency caused **2 clock cycle delay** (ARM assembly examples)

---

### Result forwarding

- The output of the EX phase of an instruction directly (earlier than WB) forwarded to the EX phase of the next instruction (no bubble)

```
CPU time
[clock]    IF             ID             EX             MEM            WB
  1.   ADD r1,r2,r3
  2.   SUB r4,r5,r1   ADD r1,r2,r3
  3.                  SUB r4,r5,r1   ADD r1,r2,r3
  4.                                 SUB r4,r5,r1   ADD r1,r2,r3
  5.                                                 SUB r4,r5,r1   ADD r1,r2,r3
  6.                                                                SUB r4,r5,r1
```

---

### Out-of-Order Execution

- Abbreviated: OoOE
- Execution of instructions in a different order as they are in the program
- That instruction is executed first which's input(s) is ready first
- CPU tries to avoid bubbles (idle state) in pipeline with rearranging the instructions
- Recompilation accelerated by hardware
- Relatively large instruction window is needed

**Process:**
1. Reading instruction from memory
2. Instruction goes to instruction queue and waits
3. An instruction leaves the queue if its operands are available
4. This instruction will be executed
5. The result goes to a result queue and waits
6. A given result leaves the queue (and saved to register file) if all results of previous instructions are ready/saved

---

### Register renaming

- In case of name dependency (WAR and WAW hazard) the output of an instruction should overwrite a register, which's content is necessary later (number of empty registers is limited)
- It can be avoided by renaming registers
- The instruction set refers to the items of architectural register file
- It is mapped to a greater hardware register file by a circuit

**Example:**

```
Architectural registers: r0-r7
Hardware registers: t0-t10

Renaming logic maps r2->t8, r3->t9
```

| Original code (ARM) | Code after reordering | Code after renaming |
|----------------------|----------------------|---------------------|
| `mul r1, r6, r0`    | `mul r1, r6, r0`     | `mul t1, t6, t0`    |
| `add r2, r1, r0`    | `sub r3, r6, r2`     | `sub t3, t6, t2`    |
| `shl r3, r1, r6`    | `add r2, r1, r0`     | `add t8, t1, t0`    |
| `xor r4, r5, r2`    | `shl r3, r1, r6`     | `shl t9, t1, t6`    |
| `sub r3, r6, r2`    | `xor r4, r5, r2`     | `xor t4, t5, t8`    |
| `and r7, r5, r6`    | `and r7, r5, r6`     | `and t7, t5, t6`    |
| RAW hazard           | WAW hazard, WAR hazard | No hazard          |

---

### Speculative execution

**Problem: control hazard**

x86 assembly code:

```asm
    cmp    eax, ebx
    jne    .L1
    shl    eax, 2       ; ?
    or     eax, ecx
    add    ecx, 8
.L1:
    mov    edx, 16
    and    ebx, edx
    inc    edx
```

Pipeline — which branch to load?

```
cmp eax, ebx                         cmp eax, ebx
    jne .L1                               jne .L1
        shl eax, 2                            mov edx, 16
            or eax, ecx                           and ebx, edx
                add ecx, 8                            inc edx
```

- Execution of instructions that maybe not necessary
- If CPU later realizes that execution was not necessary, it discards the result
- No idle state (bubble) in pipeline waiting for decision
- Solutions:
  - **Greedy prefetching:** E.g., execution of both branches; if it finds out which is needed, CPU keeps the result of only that one
  - **Predictive execution:** E.g., prediction of the necessary branch

---

### Branch prediction

- In case of conditional jump instruction, which is the next instruction to read into the pipeline?
- Separate circuit tries to predict the needed branch
- The execution of the predicted branch starts
- If later the prediction proved to be wrong, the result of these instructions are discarded, else saved time (not necessary to wait)
- The length of pipeline (it can be even 30) is proportional to the need of good prediction

**Static:**
- In case of backward jump (loops), taken branch (jump) is the default

**Dynamic:**
- Runtime history of few hundred branch instructions of the program is recorded (in branch target buffer) and used for predictions
  - **1-bit dynamic prediction:** 2 options: jump (taken branch), go on (not taken branch)
  - **2-bit dynamic prediction:** 4 options: strongly/weakly taken, strongly/weakly not taken

---

### Superscalar processors

- More than one instruction is finished per clock
- A processor core contains more execution units

```
CPU time                          pipeline phases
[clock]      IF             ID             EX           MEM            WB
         instruction 1
  1.
         instruction 2
         instruction 3  instruction 1
  2.
         instruction 4  instruction 2
         instruction 5  instruction 3  instruction 1
  3.
         instruction 6  instruction 4  instruction 2
         instruction 7  instruction 5  instruction 3  instruction 1
  4.
         instruction 8  instruction 6  instruction 4  instruction 2
         instruction 9  instruction 7  instruction 5  instruction 3  instruction 1
  5.
        instruction 10  instruction 8  instruction 6  instruction 4  instruction 2
```

- ILP and OoOE
- **Instruction window:** Set of "foreseeable" instructions — scene of looking for independent instructions. Larger window size accelerates run.
- Simple sequential programs are also executable. Appropriate compilation can increase performance increasing the throughput.

---

### VLIW processors

**Very Large Instruction Word**

- A "big instruction" (called bundle) contains more, small (simple) instructions to be executed in parallel
- Specially compiled programs are needed, which explicitly contain the instructions to be parallel
- Superscalar ILP and OoOE
- Simple hardware, complex compiler
- Intel terminology: Explicitly Parallel Instruction Computing (EPIC)

---

### VLIW example

Calculation of (x-y)*(x+y)/(z*z*8) = (x-y)(x+y) / 8z^2

Value of x in r1, value of y in r2, value of z in r3

**Scalar solution (6 instructions):**

```asm
SUB r4, r1, r2
ADD r5, r1, r2
MUL r6, r4, r5
MUL r7, r3, r3
ASL r8, r7, #3
DIV r9, r6, r8
```

**VLIW solution (3 instructions):**

| Clock | Slot 1           | Slot 2           | Slot 3           |
|-------|------------------|------------------|------------------|
| 1.    | SUB r4, r1, r2   | ADD r5, r1, r2   | MUL r7, r3, r3   |
| 2.    | MUL r6, r4, r5   | ASL r8, r7, #3   | NOP               |
| 3.    | DIV r9, r6, r8   | NOP               | NOP               |

(ARM assembly examples)

---

### VLIW vs Superscalar

**VLIW Pros:**
- Simple hardware
- Shorter clock cycle, faster operation
- Higher density of execution units on chips

**VLIW Cons:**
- Slow compilation with special compiler
- Non-portable programs (software incompatibility)
- Larger size in RAM (due to NOP instructions)

---

### Vector processors

- CPU executes an instruction on a one dimensional "array" of data (SIMD)
- Using large size registers which can store more data at the same time
- To handle them new instructions are needed
- Examples:
  - x86: MMX (Intel), 3DNow! (AMD), SSE, AVX
  - ARM: Helium, Neon

**Logic of scalar processor:**

```
Repeat 10 times
  Read next instruction
  Read this and that numbers
  Add them together
  Save the result
Loop end
```

**Logic of vector processor:**

```
Read the next instruction
Read these 10 and those 10 numbers
Add them together simultaneously
Save results
```

---

### Vector processors – MMX

**MultiMedia eXtension (MMX):**
- 64-bit registers (integer: 1x64, 2x32, 4x16, 8x8)
- 8 pieces (MM0-MM7)
- Aliases of FPU registers (causing concurrency)
- 3DNow! (development of AMD) using also float

**Streaming SIMD Extensions (SSE):**
- 128-bit registers (float: 4x32)
- 8 or 16 pieces (XMM0-XMM15)
- 70 new instructions

---

### Vector processors – SSE2, AVX

**SSE2:**
- 128-bit registers (float: 2x64, 4x32; integer: 2x64, 4x32, 8x16, 16x8)

**SSE3, SSE4:**
- Further instructions (+13, +47)

**Advanced Vector eXtensions (AVX, AVX2):**
- 256-bit registers (float)
- 8 or 16 pieces (YMM0-YMM15)
- Further instructions, int and float data

---

### Vector processors – AVX-512, Neon

**AVX-512:**
- 512-bit registers (integer, float)
- 32 pieces (ZMM0-ZMM31)

Register hierarchy:

```
AVX-512 (512 bit)    AVX (256 bit)    SSE (128 bit)    MMX (64 bit)
ZMM0                 YMM0             XMM0             MM0
```

**Neon (ARM):**
- Sixteen 128-bit (FPU) registers (int, float)

```
128 bit              64 bit           32 bit
    S0        S1        S2        S3
       D0                  D1
              Q0
```

---

### Vector processors – Overflow handling

**Addition of 2 pieces of 32-bit signed integers:**
- Overflow indication: status register bits (OF, CF)

```
  0x77 0x35 0x74 0x00       (2,000,000,000)
+                        +
  0x3B 0x02 0x33 0x76       (989,999,990)
=                        =
OF=1  0xB2 0x37 0xC7 0x76  (-1,304,967,306)
```

**Addition of 4x2 pieces of 8-bit signed integers:**
- Overflow indication: saturation arithmetic mode

```
  0x77 0x35 0x74 0x00       (119  53  116   0)
+                        +
  0x3B 0x02 0x33 0x76       ( 59   2   51 118)
=                        =
  0x7F 0x37 0x7F 0x76       (127  55  127  118)
```

---

### Loop dependency

```c
N = 5;
x = {0,1,2,3,4};
y = {5,6,7,8,9};
z = {9,7,5,3,1};
```

- **Read After Write: non-vectorizable**

```c
for(i=1; i<N; i++)
    x[i] = x[i-1] + y[i];
```

- **Write After Read: vectorizable**

```c
for(i=0; i<N-1; i++)
    x[i] = x[i+1] + y[i];
```

- **Read after Read: vectorizable**

```c
for(i=0; i<N; i++)
    x[i] = y[i%2] + z[i];
```

- **Write after Write: non-vectorizable**

```c
for(i=0; i<N; i++)
    x[i%2] = y[i] + z[i];
```

---

### Loop unrolling

- Performance can be improved in case of superscalar, vector and VLIW processors as well
- Easier detection of independent instructions
- Less loop control steps

**Traditional loop:**

```c
for(i=0;i<100;i++)
    a[i]=b[i]+c[i];
```

**Unrolled loop:**

```c
for(i=0;i<100;i+=4){
    a[i]  =b[i]  +c[i];
    a[i+1]=b[i+1]+c[i+1];
    a[i+2]=b[i+2]+c[i+2];
    a[i+3]=b[i+3]+c[i+3];
}
```

---

### Hyper-threading

- Intel SMT (Simultaneous MultiThreading) solution
- More thread execution in one CPU/core
  - More "context handlers"
  - One execution resource
- If a thread has to wait, the other can be executed
  - Reducing pipeline bubbles
- All "physical" cores can behave as two "logical" cores
- Operating system support is important

---

### Multi-processor systems

- Computer with more than one processor
- Shared or distributed memory
- Implementations:
  - **Homogeneous (symmetric):** Same type processors with shared memory
  - **Heterogeneous:** Different type processors for various tasks
  - **Cluster:** Separate processors with own memory in network

---

### Homogeneous systems

**On the same chip:**
- **Multi-core system:** Some independent CPUs (namely cores) on a die. Application: personal computers
- **Many-core system:** A lot of (up to thousands) cores. Application: servers, supercomputers

**On separate chips:**
- Computers using multisocket motherboard. Application: servers

---

### Multi-core processors

- More independent processing units on a chip
- In case of N cores performance is better and consumption is lower than in case of N CPUs
- Usually own L1 (maybe L2) cache, but shared L3
  - Cache coherency problems
- Parallel thread/process run (MIMD)
  - Task-level parallelism (E.g., Java Thread, C OpenMP)
  - Operating system support is needed

---

### Heterogeneous systems

**Different CPUs:**
- For example ARM big.LITTLE architecture

**Hardware accelerators:**
- Floating Point Unit (FPU)
- Graphical Processing Unit (GPU)
- Cryptography accelerators (e.g., AES-NI)
- Digital Signal Processors (DSP)
- Field-Programmable Gate Array (FPGA)
- Artificial intelligence accelerators (e.g., PNN)

---

### Graphics Processing Unit

- Abbreviated: GPU
- Task: texture handling, rendering images, 3D graphics acceleration, video decoding, ...
- Integrated or separate video card
- Can have own dedicated memory
- Producers: nVIDIA and AMD (ATI)

**Capabilities:**
- Big computation capacity (parallel, SIMD)
- Parallel execution of hundreds of threads
- Hardware-level thread management
- Thousands of registers
- Big memory bandwidth requirement (even TB/s)
- Special instruction set: `1/sqrt(x)`, `a*b+c`

---

### Graphics pipeline

- Among others, the graphics pipeline contains vertex-, geometry- and pixel shader
- The unified GPU architecture can execute them using the same hardware (efficient load balancing)
- Even 1000 operations are necessary to determine the colors of 1 pixel

---

### GPU programming

- General-Purpose GPU (GPGPU)
- GPU receives (non-graphics) computations from CPU
- Huge memory bandwidth requirement
- Programming: OpenCL, CUDA, MATLAB
- **Accelerated Processing Unit (APU):** CPU and GPU elements in a heterogeneous system

---

### Components of GPU

(NVIDIA terminology)

- Streaming/Scalar Processor (SP)
- Register File (RF)
- Special Function Unit (SFU)
- Multithreaded Instruction Unit (MIU)
- Cache (L1/L2)
- Shared Memory
- Streaming Multiprocessor (SM)
- Texture Unit (TU)
- Texture/Processor Cluster (TPC)
- Interconnection Network
- Raster Operation Processors (ROP)
- ...

---

### Example: NVIDIA Tesla architecture

```
CPU --- Bridge --- RAM

GPU
  TPC  TPC  TPC  TPC  TPC  TPC
   SM SM  SM SM  SM SM  SM SM  SM SM  SM SM
   TU     TU     TU     TU     TU     TU

         Interconnection Network

  ROP  L2   ROP  L2   ROP  L2   Interface

  VRAM       VRAM       VRAM      Display
```

**SM (Streaming Multiprocessor):**

```
MIU
Cache
SP  SP
RF  RF
SP  SP
RF  RF
SP  SP
RF  RF
SFU  SFU
Shared Memory
```

---

### CPU vs GPU

| CPU                                | GPU                                 |
|------------------------------------|-------------------------------------|
| Low latency                        | Large throughput                    |
| Shallow pipeline (<30 stages)      | Deep pipeline (>100 stages)         |
| Optimized for serial operation     | Optimized for parallel operation    |
| Max few 10 cores                   | Even 10000 "cores"                  |

```
CPU:                    GPU:
control                 [many small cores]
core core
core core
cache
```

---

### FPGA

- **Field-Programmable Gate Array**
- Programmable logical circuits
- Re-configurable system
- Special languages: VHDL, Verilog
- Parallel operation by nature
- There are processors with integrated FPGA
- **Soft-processor:** Processor architecture implemented in FPGA

---

### Cluster systems

- **Non-Uniform Memory Access (NUMA)** architecture
- Processors have own memory, but they can access each others memory as well
- Access time depends on location
- More memory operations simultaneously

```
    CPU                         CPU

  node1                         node2
         interconnection
    bus                         bus

    RAM                         RAM
```

---

### Mindmap: parallelism

(Visual mindmap of parallelism concepts)

---

### Performance analysis

**Performance equation:**

```
T = NI x eCPI x 1/f
```

- **T:** Program execution time (s)
- **NI:** Number of machine code instructions (considering loops)
- **eCPI:** Effective number of cycles per instruction, depends on type of instruction, microarchitecture (pipeline, superscalar, RISC/CISC, etc.)
- **f:** Clock frequency (Hz)

**Performance measure unit:** FLoating point Operations Per Second (FLOPS)

---

### Amdahl's law

N processors (threads) does not result in N times acceleration in a process execution.

```
S(N) = T1/TN = 1 / (A + (1-A)/N)
```

Where:
- **S** is the speedup
- **T** is the running time
- **A** is the sequential ratio of execution (0 <= A <= 1)

Speedup curves for different sequential ratios:
- A=0.1 (best speedup)
- A=0.2
- A=0.5 (worst speedup among examples)

---

## The cache

- Structure and operation
- Associativity
- Update

---

### Cache

- Devices exchange data regularly
- Transfer speed of devices are very different
- Slow device "slows down" the faster
- E.g., CPU circa 10 times faster than RAM
- CPU cache, GPU cache, Web cache, DNS cache
- **Solution idea:**
  - Intermediate storage (cache)
  - Faster than the slower device (SRAM)
  - Slow device not replaceable by faster due to price
  - Reason of existence: locality principle

---

### Cache – Locality principles

**Spatial locality principle:**
- If a program refers to a memory address (data or instruction), then probably soon refers to neighboring addresses as well
- Sequential execution, arrays

**Temporal locality principle:**
- If a program refers to a memory address, then probably soon refers to this address again
- Loops

---

### Cache – Properties

- Storing frequently used data
- Smaller capacity, faster access (SRAM) than the operative memory
- Transparent to programmers/users
- Can contain associative (CAM) memory
- CPU cache:
  - Multiple level: L1, L2, L3 cache
  - On-chip or off-chip

---

### Structure of cache

- Storage unit "Line" (or "Block")
- Line is extended by "Tag" and "Flags"
- Block contains a copy of memory fragment
- Tag belongs to the memory address of Block

```
              Cache                    RAM
CPU
          Tag    F    Block           ABC  127
          128    ...  DEF             DEF  128
                                     GHI  129
                                     JKL  130
          131    ...  MNO             MNO  131
          129    ...  GHI              ...
```

---

### Operation of cache

- CPU looks up necessary data in cache, giving the address to cache controller
- If the address is in a Tag (**cache hit**), then cache responds based on Block content
- If address is not stored in any Tag (**cache miss**), then cache reads the Block from RAM saving it (overwriting a line), then responds based on Block content

---

### Operation of cache – Associativity

How many lines can be used to store data from a RAM address?

- **Direct-mapped:** From 1 RAM address to only 1 line.
- **Fully associative:** From any address to any cache line.
- **Set-associative (N-way):** From 1 RAM address to one of a few lines. Special cases: direct-mapped, fully associative.

---

### Operation of cache – Replacement policy

In case of overwriting:

- **Random:** Fast, but not effective
- **Least recently used (LRU):** Efficient, but complicated
- **Not most recently used:** Effective and simple

---

### Operation of cache – Write policies

During writing, take care of consistency of memory and cache.

**Write through:**
- Cache writing simultaneously to RAM
- Cache does not speed up writing

**Write back:**
- Cache updated after each write operation
- It is indicated by a "dirty" bit of Tag
- If necessary, to overwrite a "dirty" cache line, the line has to be written back to memory. After that the line can be updated with a new line.
- In multiprocessor system separate caches can lead to problems (inconsistency). There are problems with DMA as well.

---

### Operation of cache – Flowchart

**Reading:**
1. Cache hit? -> Yes -> Response with data
2. Cache hit? -> No -> Searching line to overwrite
3. "Dirty"? -> Yes -> Writing back the destination line
4. "Dirty"? -> No -> Reading lower memory to the chosen line. Status: "not dirty"
5. Response with data

**Writing:**
1. Cache hit? -> Yes -> (write to cache)
2. Cache hit? -> No -> Searching line to overwrite
3. "Dirty"? -> Yes -> Writing back the destination line
4. "Dirty"? -> No -> Reading lower memory to the chosen line
5. Writing new data to chosen block. Status: "dirty"

---

### Characteristics of cache

- Size of cache
- Size of Block (E.g., 64 byte)
- Lookup time of a block
- Updating time (in case of write back)
- Replacement strategy (in case of line update)
- Hit rate
  - Generally, over 90%
  - Depending on size, replacement, etc.

---

### Structure of addresses

**Address = Tag & Index & Offset**

- **Offset:** position of the byte in the block
  - In case of 2^S size blocks it is S bit wide
- **Index:** identifies cache line sets
  - In case of 2^N sets it is N bit wide
- **Tag:** most significant bits of a RAM address
  - In case of L bit wide address, it is L-N-S bit wide

**Example:** Pentium 4, 8kB 4-way L1 cache, 64B block
- log2(64) = 6 offset bits
- log2(8192/64/4) = 5 index bits
- 32-5-6 = 21 tag bits

---

### Addressing example

```
Address: 1 1 0 1 1 1 0 0 0 1 0 1 0
         |  tag  | idx |  offset  |
```

Architecture:
- 13-bit address
- 128B cache size
- Set associative (4-way) cache
- 8B block size
- "write-back"
- "not most recently used" replacement

| Set  | Tag | Valid | Dirty | Recent | 000 | 001 | 010 | 011 | 100 | 101 | 110 | 111 |
|------|-----|-------|-------|--------|-----|-----|-----|-----|-----|-----|-----|-----|
| 00   | 1D  | 1     | 0     | 1      | 2E  | 13  | 3D  | D1  | 4F  | FF  | 01  | A2  |
| 00   | 2E  | 1     | 1     | 0      | 33  | 8B  | CA  | 4F  | 89  | 67  | 30  | 12  |
| 00   | FA  | 0     | 0     | 0      | 12  | 36  | 77  | B6  | 0C  | E0  | 55  | 75  |
| 00   | 20  | 1     | 1     | 0      | 02  | 00  | 00  | 00  | 43  | C0  | 3E  | E1  |
| 01   | 56  | 1     | 1     | 0      | FF  | FF  | FF  | FF  | 24  | E4  | AA  | DA  |
| 01   | F2  | 0     | 0     | 0      | 23  | 43  | E4  | 1A  | 4D  | 43  | 02  | 35  |
| 01   | DC  | 1     | 1     | 0      | 3E  | 18  | 48  | 45  | 4C  | 4C  | 4F  | 00  |
| 01   | 03  | 1     | 0     | 1      | 48  | 42  | C3  | C5  | 23  | 40  | 30  | 12  |
| ...  | ... | .     | .     | .      | ... | ... | ... | ... | ... | ... | ... | ... |

Cache hit? What is there? Overwritable? Need save?

---

### Cache hierarchy

```
                processor                                    processor
       core              core                       core              core
  L1         L1     L1         L1              L1         L1     L1         L1
instr.  data    instr.  data               instr.  data    instr.  data

        L2              L2                          L2              L2

              L3                                          L3

                              Main memory
```

---

### Cache coherence

- In shared-memory multiprocessor systems caches can contain several copies of the same memory field.
- They must contain the same data independently of which processor modifies it
- Protocol categories:
  - **Invalidation-based:** when a line is modified, all its copies must be invalidated
  - **Update-based:** when a line is written by a processor, it is sent to other caches to update the copies

---

### MESI protocol

Invalidation-based cache coherence protocol. Each line in a processor's cache has a state:

- **Modified:** only one processor has this line, which has written it since it acquired the copy from RAM (dirty)
- **Exclusive:** only one processor has this line without any modification since it acquired the copy (clean)
- **Shared:** multiple processor's caches have (the same) copies of the line (clean)
- **Invalid:** the given processor's cache does not contain this line (no copy)

**State transitions:**

- a: Processor reads the line, no other copies
- b: Processor reads the line, at least one more copy already exists
- c: Processor writes the line
- d: Processor writes the line, other copies are invalidated
- e: Another processor reads the line
- f: Another processor writes the line

```
              I
            d
          M
            f
         a e
       b f   c
         d f
           S --- e --- E
```

---

### Effect of cache on programming

```c
...
ARRAY = (double*)malloc(SIZE*sizeof(double));
N_Rep = 1000000000/SIZE;
for(j=0; j<N_Rep; j++)
    for(i=0; i<SIZE; i++)
        sum += ARRAY[i];
...
```

If the data/program fits into the cache, then the program will be faster!

(Graph: Bandwidth [GB/s] vs ARRAY size [B] — showing performance drop as array exceeds cache sizes)

---

### Effect of cache on programming – Matrix traversal

Row-major order matrix: `int a[N][M];`

**Row-by-row (fast):**

```c
for(i=0;i<N;i++)
    for(j=0;j<M;j++)
        sum+=a[i][j];
```

**Column-by-column (slow):**

```c
for(j=0;j<M;j++)
    for(i=0;i<N;i++)
        sum+=a[i][j];
```

In case of huge matrix: Frequent cache miss -> Slow run

---

## Other architectures

- Further architectures
- High-Performance Computing

---

### Intel Core i9

- Released in 2017
- 64-bit registers (x86-64)
- Microarchitecture: Skylake, Coffee Lake, Rocket Lake
- 14nm technology
- FCLGA socket (2066 contacts)
- 6-18 cores, 13-24MB L3 smart cache, AVX-512, HT, DMI 3.0, Virtualization Technology (VT-x, VT-d), DDR4, Turbo Boost Max 3.0 (5.2GHz), DL Boost, AES-NI

---

### AMD Ryzen 9

- Released in 2019
- 64-bit registers (x86-64)
- Microarchitecture: Zen2, Zen3
- 7-14nm technology
- Ca. 10 billion transistors
- AM4, FP6 socket (1331, 1140 contacts)
- 8-16 cores, 32-64MB L3 cache, AVX2, HT, PCIe 4.0, APU, DDR4, AMD-V virtualization, unlocked, Turbo Core (4.9GHz)

---

### ARM Cortex-A72

- Released in 2016
- 64-bit registers (AArch64)
- Microarchitecture: ARMv8-A
- 16nm technology
- 1 billion transistors
- 1-4 cores, 0.5-4MB L2 cache, 3-way superscalar, speculative execution, Neon Vector FPU, DSP
- Used in Raspberry Pi 4, Samsung Galaxy A9 smart phones (big.LITTLE)

---

### Intel Xeon Phi

- In supercomputers or servers
- GPU based MIC (Many Integrated Core) architecture
- 57-72 cores (1.0-1.7GHz)
- 28.5-36MB L2 cache
- ISA: x86-64
- 4-way hyperthreading
- AVX-512
- 1000-3000 GFLOPS (Core i7: 30-100 GFLOPS)
- Co-processor

---

### MIPS

- Microprocessor without Interlocked Pipeline Stages (1985-)
- RISC
- 32/64 bit (31 GPRs + 32 FPRs)
- 5 level pipeline
- OoOE, SIMD, superscalar
- Multilevel cache
- Application: PlayStation 2 and Nintendo 64 game consoles, CISCO routers, HPC

```asm
lw $t1, ($t0)  # move 2 bytes from the address stored in t0 to t1
```

---

### Alpha

- Developer DEC (1992-)
- Goal to replace CISC based VAX architecture
- RISC
- 64-bit (31 GPRs + 31 FPRs)
- Multilevel cache
- OoOE, SIMD
- Application: workstations, HPC

```asm
ldq ra, 0(sp)  # pop return address from stack
```

---

### PowerPC

- Developer: Apple+IBM+Motorola (1992-)
- RISC
- 32/64 bit (32 GPRs + 32 FPRs)
- Superscalar, vector processor
- Runtime changeable little-endian/big-endian byte order
- Application: Xbox 360, Nintendo Wii, F35 Raptor

```asm
li 3, 0(5)  ; move data from the address stored in register 5 to register 3
```

---

### SPARC

- Scalable Processor Architecture (1993-)
- Sun Microsystems (Oracle)
- RISC
- 32/64-bit (32 GPRs + 32 FPRs)
- 1-32 cores (<=5.0GHz)
- L3 cache
- Java support
- Application: servers, HPC (K-computer)

```asm
add %L1,%L2,%L3  ! Sum of %L1+%L2 into %L3
```

---

### Supercomputer architecture

```
User
          Batch scheduler         Compute nodes
Internet
                                  Fast interconnection
User
          Interactive nodes       Storage
```

---

### High-Performance Computing

**HPC – UD Faculty of Informatics (2022)**

- NVIDIA DGX A100
- 5 PFLOPS AI
- Dual AMD Rome 7742
  - 128 cores/256 threads
  - 2.25 GHz (base), 3.4 GHz (max boost)
- 8x NVIDIA A100 80GB GPUs
- 2048 GB RAM
- 30 TB (8x 3.84 TB) U.2 NVMe SSD
- Ubuntu Linux OS
- 6.5 kW electric power (consumption)

---

### High-Performance Computing

**HPC - Top 1 in Hungary, TOP60 in the world (2023) – Komondor**

- Debrecen, DE Kassai campus
- 5 PFLOPS
- 384 AMD EPYC 7763 CPUs (24,576 cores) + 12 Intel Xeon Gold 6254 CPUs (216 cores) + 216 NVIDIA A100 GPUs
- 49,664 GB RAM
- 11,900 TB storage
- 4,700,000,000 HUF (approx. 12.8 million USD)
- 300 kW consumption

---

### High-Performance Computing

**HPC - TOP 1 (2023) – El-Capitan**

- Hewlett Packard Enterprise CRAY EX255A
- Lawrence Livermore National Laboratory, USA
- 1742 PFLOPS
- AMD Epyc 24C CPUs + AMD Instinct MI300A GPUs
- 11,039,616 cores
- 5,400,000 GB RAM
- 90 miles worth of HPE Slingshot-11 networking cables
- Ca. 600,000,000 USD
- 30,000 kW electric power (consumption)

---

### HPC challenges

- Limited clock frequency
- Gigantic costs
- Huge energy consumption
  - Carbon (ecological) footprint
- Increasing communication latency
- More components results in more frequent failures (low reliability)
- Application scalability problems
  - Amdahl's law

---

## References

- Sarah L. Harris, David M. Harris: *Digital design and computer architecture (ARM edition)*, Morgan Kaufman, 2016
- Nicholas Charter: *Computer architecture*, McGraw-Hill, 2001
- David A Patterson, John L Hennessy: *Computer organization and design*, Morgan Kaufman, 2014
- R. E. Bryant, D. R. O'Hallaron: *Computer Systems – A programmer's perspective*, Pearson, 2016
- Andrew S. Tanenbaum, Todd Austin: *Structured Computer Organization*, Pearson, 2013
- Joseph Cavanagh: *X86 Assembly Language and C Fundamentals*, CRC Press, 2013

---

## ThanQ for your attention!

Have a successful study!
