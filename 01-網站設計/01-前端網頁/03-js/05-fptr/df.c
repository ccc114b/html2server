#include <stdio.h>
#include <math.h>

double df(double (*f)(double), double x) {
    double dx = 0.001;
    double dy = f(x + dx) - f(x);
    return dy / dx;
}

double square(double x) {
    return x * x;
}

int main() {
    printf("df(x^2,2) = %f\n", df(square, 2.0));
    printf("df(sin(x/4), pi/4) = %f\n", df(sin, M_PI / 4));
    return 0;
}
