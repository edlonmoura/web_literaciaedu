@echo off
:loop
echo Iniciando servidor...
cd /d C:\Users\babic\projects\web_literaciaedu
call npm run dev
echo Servidor parou. Reiniciando em 3 segundos...
timeout /t 3 /nobreak >nul
goto loop
