import shell from 'npm:shelljs'
shell.echo('hello world');
shell.ls('./').forEach(function (file) {
    console.log(file)
})