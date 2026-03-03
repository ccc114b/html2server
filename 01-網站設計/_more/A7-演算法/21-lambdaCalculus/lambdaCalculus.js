// Lambda Calculus 當中的所有資料結構都是用 closure 達成的
// 換言之，所有的資料結構都是函數閉包。

// 終於了解 Lambda Calculus 在玩些甚麼遊戲了。
// 基本上就是，一切皆函數，資料結構也是透過函數 (像是 pair, car, cdr 包在 closure 裡面的)
// 然後，每個函數都只接受一個參數，然後傳回一個值 (也是函數)。

// Church Booleans : Logic -----------------------------------------------------------------------
let IF    = c => x => y => c(x)(y) // if: λ c x y. c x y # if c then x else y.
let TRUE  = x => y => x // if true then x # 兩個參數執行第一個
let FALSE = x => y => y // if false then y # 兩個參數執行第二個
let AND   = p => q => p(q)(p) // if p then q else p
let OR    = p => q => p(p)(q) // if p then p else q
let XOR   = p => q => p(NOT(q))(q) // if p then not q else q
let NOT   = c => c(FALSE)(TRUE) // if c then false else true

// Arithmetics -----------------------------------------------------------------
let IDENTITY       = x => x
let SUCCESSOR      = n => f => x => f(n(f)(x))
let PREDECESSOR    = n => f => x => n(g => h => h(g(f)))(_ => x)(u => u)
let ADDITION       = m => n => n(SUCCESSOR)(m)
let SUBTRACTION    = m => n => n(PREDECESSOR)(m)
let MULTIPLICATION = m => n => f => m(n(f))
let POWER          = x => y => y(x)
let ABS_DIFFERENCE = x => y => ADDITION(SUBTRACTION(x)(y))(SUBTRACTION(y)(x))

// Comparison ------------------------------------------------------------------

let IS_ZERO               = n => n(_ => FALSE)(TRUE)
let IS_LESS_THAN          = m => n => NOT(IS_LESS_THAN_EQUAL(n)(m))
let IS_LESS_THAN_EQUAL    = m => n => IS_ZERO(SUBTRACTION(m)(n))
let IS_EQUAL              = m => n => AND(IS_LESS_THAN_EQUAL(m)(n))(IS_LESS_THAN_EQUAL(n)(m))
let IS_NOT_EQUAL          = m => n => OR(NOT(IS_LESS_THAN_EQUAL(m)(n)))(NOT(IS_LESS_THAN_EQUAL(n)(m)))
let IS_GREATER_THAN_EQUAL = m => n => IS_LESS_THAN_EQUAL(n)(m)
let IS_GREATER_THAN       = m => n => NOT(IS_LESS_THAN_EQUAL(m)(n))
let IS_NULL               = p => p(x => y => FALSE)
let NIL                   = x => TRUE // 不管 x 是什麼都傳回 true，這樣後續會繼續執行。

// Combinators -----------------------------------------------------------------

let Y = f => (x => f(y => (x(x))(y)))
             (x => f(y => (x(x))(y)))

// Lists -----------------------------------------------------------------------

let CONS = x => y => f => f(x)(y)
let CAR  = p => p(TRUE)
let CDR  = p => p(FALSE)

let RANGE = m => n => Y(f => m => IF(IS_EQUAL(m)(n))
  (_ => CONS(m)(NIL))
  (_ => CONS(m)(f(SUCCESSOR(m))))
(NIL))(m)

let MAP = x => g => Y(f => x => IF(IS_NULL(x))
  (_ => x)
  (_ => CONS(g(CAR(x)))(f(CDR(x))))
(NIL))(x)

// Test "Framework" ------------------------------------------------------------

let ASSERT = truth => IF(truth)
  (description => `[\x1b[32m✓\x1b[0m] ${description}`)
  (description => `[\x1b[31m✗\x1b[0m] ${description}`)

let REFUTE = truth => ASSERT(NOT(truth))

let TEST   = description => assertion => console.log(assertion(description))

// Church Numerals -------------------------------------------------------------

let $zero  = f => IDENTITY
let $one   = SUCCESSOR($zero)
let $two   = SUCCESSOR($one)
let $three = SUCCESSOR($two)
let $four  = MULTIPLICATION($two)($two)
let $five  = SUCCESSOR($four)
let $eight = MULTIPLICATION($two)($four)
let $nine  = SUCCESSOR($eight)
let $ten   = MULTIPLICATION($two)($five)

// Tests -----------------------------------------------------------------------

TEST('TRUE')
  (ASSERT(TRUE))

TEST('FALSE')
  (REFUTE(FALSE))

TEST('AND')
  (ASSERT(AND(TRUE)(TRUE)))

TEST('OR')(ASSERT(AND
  (AND(OR(TRUE)(FALSE))(OR(FALSE)(TRUE)))
  (NOT(OR(FALSE)(FALSE)))))

TEST('XOR')(ASSERT(AND
  (AND(XOR(TRUE)(FALSE))(XOR(FALSE)(TRUE)))
  (NOT(XOR(TRUE)(TRUE)))))

TEST('NOT')
  (REFUTE(NOT(TRUE)))

TEST('IF')(ASSERT(AND
  (IF(TRUE)(TRUE)(FALSE))
  (NOT(IF(FALSE)(TRUE)(FALSE)))))

TEST('IDENTITY')
  (ASSERT(IS_EQUAL(IDENTITY)(x => x)))

TEST('SUCCESSOR')
  (ASSERT(IS_EQUAL(SUCCESSOR($zero))($one)))

TEST('PREDECESSOR')
  (ASSERT(IS_EQUAL($zero)(PREDECESSOR($one))))

TEST('ADDITION')
  (ASSERT(IS_EQUAL(SUCCESSOR($one))(ADDITION($one)($one))))

TEST('SUBTRACTION')
  (ASSERT(IS_EQUAL($zero)(SUBTRACTION($one)($one))))

TEST('MULTIPLICATION')
  (ASSERT(IS_EQUAL($four)(MULTIPLICATION($two)($two))))

TEST('POWER')(ASSERT(AND
  (IS_EQUAL($nine)(POWER($three)($two)))
  (IS_EQUAL($eight)(POWER($two)($three)))))

TEST('ABS_DIFFERENCE')(ASSERT(AND
  (IS_EQUAL($one)(ABS_DIFFERENCE($three)($two)))
  (IS_EQUAL($one)(ABS_DIFFERENCE($two)($three)))))

TEST('IS_ZERO')
  (ASSERT(IS_ZERO($zero)))

TEST('IS_LESS_THAN')
  (ASSERT(IS_LESS_THAN($zero)($one)))

TEST('IS_LESS_THAN_EQUAL')(ASSERT(AND
  (IS_LESS_THAN_EQUAL($one)($one))
  (IS_LESS_THAN_EQUAL($zero)($one))))

TEST('IS_EQUAL')(ASSERT(AND
  (IS_EQUAL($zero)($zero))
  (IS_EQUAL($one)($one))))

TEST('IS_NOT_EQUAL')
  (ASSERT(IS_NOT_EQUAL($zero)($one)))

TEST('IS_GREATER_THAN_EQUAL')(ASSERT(AND
  (IS_GREATER_THAN_EQUAL($one)($one))
  (IS_GREATER_THAN_EQUAL($one)($zero))))

TEST('IS_GREATER_THAN')
  (ASSERT(IS_GREATER_THAN($one)($zero)))

TEST('IS_NULL')
  (ASSERT(IS_NULL(NIL)))

TEST('CAR')(ASSERT(AND
  (IS_EQUAL(CAR(CONS($five)($one)))($five))
  (IS_EQUAL(CAR(CONS($two)(CONS($one)($three))))($two))))

TEST('CDR')(ASSERT(AND
  (IS_EQUAL(CDR(CONS($five)($one)))($one))
  (IS_EQUAL(CAR(CDR(CONS($two)(CONS($one)($three)))))($one))))

TEST('CONS')(ASSERT(AND
  (IS_EQUAL(CDR(CDR(CONS($two)(CONS($one)($three)))))($three))
  (IS_EQUAL(CAR(CDR(CONS($five)(CONS($two)(CONS($one)($three))))))($two))))

TEST('RANGE')(ASSERT(AND(
    AND
      (IS_EQUAL(CAR(RANGE($three)($five)))($three))
      (IS_EQUAL(CAR(CDR(RANGE($three)($five))))($four)))(
    AND
      (IS_EQUAL(CAR(CDR(CDR(RANGE($three)($five)))))($five))
      (IS_NULL(CDR(CDR(CDR(RANGE($three)($five)))))))))

TEST('MAP')(ASSERT(AND(
    AND
      (IS_EQUAL
        (CAR(MAP(RANGE($three)($five))(v => POWER(v)($two))))
        (POWER($three)($two)))
      (IS_EQUAL
        (CAR(CDR(MAP(RANGE($three)($five))(v => POWER(v)($two)))))
        (POWER($four)($two))))(
    AND
      (IS_EQUAL
        (CAR(CDR(CDR(MAP(RANGE($three)($five))(v => POWER(v)($two))))))
        (POWER($five)($two)))
      (IS_NULL(CDR(CDR(CDR(MAP(RANGE($three)($five))(v => POWER(v)($two))))))))))

// Examples --------------------------------------------------------------------

console.log('\n--- Examples ---\n')

let FACTORIAL = Y(f => n => IF(IS_ZERO(n))
  (_ => SUCCESSOR(n))
  (_ => MULTIPLICATION(n)(f(PREDECESSOR(n))))
(NIL))

let FIBONACCI = Y(f => n => IF(IS_LESS_THAN_EQUAL(n)(SUCCESSOR(f => IDENTITY)))
  (_ => n)
  (_ => ADDITION
    (f(PREDECESSOR(n)))
    (f(PREDECESSOR(PREDECESSOR(n)))))
(NIL))

TEST('FACTORIAL: 5! = 120')(ASSERT(IS_EQUAL
  (FACTORIAL($five))
  (ADDITION(MULTIPLICATION($ten)($ten))(ADDITION($ten)($ten)))))

TEST('FIBONACCI: 10 = 55')(ASSERT(IS_EQUAL
  (FIBONACCI($ten))
  (ADDITION(MULTIPLICATION($five)($ten))($five))))