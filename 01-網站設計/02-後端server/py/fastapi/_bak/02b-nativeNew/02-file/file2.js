Deno.serve(async req => {
    const file = await Deno.open("./README.md");
    return new Response(file.readable, {
        headers: {
            "content-type" : "text/plain"
        }
    });
});
