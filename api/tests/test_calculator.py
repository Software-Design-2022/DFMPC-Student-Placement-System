from ..calculator import Calculator


def test_add():
    if Calculator.add(1, 2) != 3.0:
        raise AssertionError
    if Calculator.add(1.0, 2.0) != 3.0:
        raise AssertionError
    if Calculator.add(0, 2.0) != 2.0:
        raise AssertionError
    if Calculator.add(2.0, 0) != 2.0:
        raise AssertionError
    if Calculator.add(-4, 2.0) != -2.0:
        raise AssertionError

def test_subtract():
    if Calculator.subtract(1, 2) != -1.0:
        raise AssertionError
    if Calculator.subtract(2, 1) != 1.0:
        raise AssertionError
    if Calculator.subtract(1.0, 2.0) != -1.0:
        raise AssertionError
    if Calculator.subtract(0, 2.0) != -2.0:
        raise AssertionError
    if Calculator.subtract(2.0, 0.0) != 2.0:
        raise AssertionError
    if Calculator.subtract(-4, 2.0) != -6.0:
        raise AssertionError

def test_multiply():
    if Calculator.multiply(1, 2) != 2.0:
        raise AssertionError
    if Calculator.multiply(1.0, 2.0) != 2.0:
        raise AssertionError
    if Calculator.multiply(0, 2.0) != 0.0:
        raise AssertionError
    if Calculator.multiply(2.0, 0.0) != 0.0:
        raise AssertionError
    if Calculator.multiply(-4, 2.0) != -8.0:
        raise AssertionError

def test_divide():
    if Calculator.divide(1, 2) != 0.5:
        raise AssertionError
    if Calculator.divide(1.0, 2.0) != 0.5:
        raise AssertionError
    if Calculator.divide(0, 2.0) != 0:
        raise AssertionError
    if Calculator.divide(-4, 2.0) != -2.0:
        raise AssertionError