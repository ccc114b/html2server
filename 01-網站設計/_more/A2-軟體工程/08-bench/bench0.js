// Compact form: name and function
Deno.bench("hello world #1", () => {
    new URL("https://deno.land");
  });
  
  // Compact form: named function.
  Deno.bench(function helloWorld3() {
    new URL("https://deno.land");
  });
  
  // Longer form: bench definition.
  Deno.bench({
    name: "hello world #2",
    fn: () => {
      new URL("https://deno.land");
    },
  });
  
  // Similar to compact form, with additional configuration as a second argument.
  Deno.bench("hello world #4", { permissions: { read: true } }, () => {
    new URL("https://deno.land");
  });
  
  // Similar to longer form, with bench function as a second argument.
  Deno.bench(
    { name: "hello world #5", permissions: { read: true } },
    () => {
      new URL("https://deno.land");
    },
  );
  
  // Similar to longer form, with a named bench function as a second argument.
  Deno.bench({ permissions: { read: true } }, function helloWorld6() {
    new URL("https://deno.land");
  });