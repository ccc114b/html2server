

* https://docs.deno.com/runtime/manual/tools/jupyter



## 執行

```
ccckmit@asus MINGW64 /d/ccc/ccc112b/html2denojs/02-後端/12-database (master)
$ deno jupyter --unstable
ℹ️ Deno kernel is not yet installed, run `deno jupyter --unstable --install` to set it up

ccckmit@asus MINGW64 /d/ccc/ccc112b/html2denojs/02-後端/12-database (master)
$ deno jupyter --unstable --install
[InstallKernelSpec] Installed kernelspec deno in C:\Users\user\AppData\Roaming\jupyter\kernels\deno
✅ Deno kernelspec installed successfully.

ccckmit@asus MINGW64 /d/ccc/ccc112b/html2denojs/02-後端/12-database (master)
$ deno jupyter --unstable
✅ Deno kernel already installed

ccckmit@asus MINGW64 /d/ccc/ccc112b/html2denojs/02-後端/12-database (master)
$ jupyter lab
[I 2024-05-20 12:44:51.028 ServerApp] Extension package jupyter_lsp took 1.5254s to import
[W 2024-05-20 12:44:51.036 ServerApp] A `_jupyter_server_extension_points` function was not found in jupyter_lsp. Instead,
a `_jupyter_server_extension_paths` function was found and will be used for now. This function name will be deprecated in future releases of Jupyter Server.
[I 2024-05-20 12:44:52.286 ServerApp] Extension package jupyter_server_terminals took 1.2631s to import
[W 2024-05-20 12:44:52.354 ServerApp] A `_jupyter_server_extension_points` function was not found in notebook_shim. Instead, a `_jupyter_server_extension_paths` function was found and will be used for now. This function name will be deprecated in future releases of Jupyter Server.
[I 2024-05-20 12:44:52.394 ServerApp] jupyter_lsp | extension was successfully linked.
[I 2024-05-20 12:44:52.428 ServerApp] jupyter_server_terminals | extension was successfully linked.
[I 2024-05-20 12:44:52.469 ServerApp] jupyterlab | extension was successfully linked.
[I 2024-05-20 12:44:52.515 ServerApp] notebook | extension was successfully linked.
[I 2024-05-20 12:44:52.531 ServerApp] Writing Jupyter server cookie secret to C:\Users\user\AppData\Roaming\jupyter\runtime\jupyter_cookie_secret
[I 2024-05-20 12:44:53.946 ServerApp] notebook_shim | extension was successfully linked.
[I 2024-05-20 12:44:54.647 ServerApp] notebook_shim | extension was successfully loaded.
[I 2024-05-20 12:44:54.663 ServerApp] jupyter_lsp | extension was successfully loaded.
[I 2024-05-20 12:44:54.667 ServerApp] jupyter_server_terminals | extension was successfully loaded.
[I 2024-05-20 12:44:54.781 LabApp] JupyterLab extension loaded from C:\Users\user\AppData\Local\Programs\Python\Python311\Lib\site-packages\jupyterlab
[I 2024-05-20 12:44:54.781 LabApp] JupyterLab application directory is C:\Users\user\AppData\Local\Programs\Python\Python311\share\jupyter\lab
[I 2024-05-20 12:44:54.798 LabApp] Extension Manager is 'pypi'.
[I 2024-05-20 12:44:54.811 ServerApp] jupyterlab | extension was successfully loaded.
[I 2024-05-20 12:44:54.835 ServerApp] notebook | extension was successfully loaded.
[I 2024-05-20 12:44:54.839 ServerApp] Serving notebooks from local directory: D:\ccc\ccc112b\html2denojs\02-後端\12-database
[I 2024-05-20 12:44:54.840 ServerApp] Jupyter Server 2.12.1 is running at:
[I 2024-05-20 12:44:54.840 ServerApp] http://localhost:8888/lab?token=b27725ada1b3162b07f95273ab288e6af5603ef52d8e71a7
[I 2024-05-20 12:44:54.841 ServerApp]     http://127.0.0.1:8888/lab?token=b27725ada1b3162b07f95273ab288e6af5603ef52d8e71a7
[I 2024-05-20 12:44:54.841 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 2024-05-20 12:44:55.312 ServerApp]

    To access the server, open this file in a browser:
        file:///C:/Users/user/AppData/Roaming/jupyter/runtime/jpserver-11660-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/lab?token=b27725ada1b3162b07f95273ab288e6af5603ef52d8e71a7
        http://127.0.0.1:8888/lab?token=b27725ada1b3162b07f95273ab288e6af5603ef52d8e71a7
[I 2024-05-20 12:44:56.032 ServerApp] Skipped non-installed server(s): bash-language-server, dockerfile-language-server-nodejs, javascript-typescript-langserver, jedi-language-server, julia-language-server, pyright, python-language-server, python-lsp-server, r-languageserver, sql-language-server, texlab, typescript-language-server, unified-language-server, vscode-css-languageserver-bin, vscode-html-languageserver-bin, vscode-json-languageserver-bin, yaml-language-server
0.02s - Debugger warning: It seems that frozen modules are being used, which may
0.00s - make the debugger miss breakpoints. Please pass -Xfrozen_modules=off
0.00s - to python to disable frozen modules.
0.00s - Note: Debugging will proceed. Set PYDEVD_DISABLE_FILE_VALIDATION=1 to disable this validation.
[W 2024-05-20 12:45:10.969 LabApp] Could not determine jupyterlab build status without nodejs
```