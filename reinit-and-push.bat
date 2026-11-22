@echo off
setlocal
set "ROOT=C:\Working\Playwright"
set "PROJ=C:\Working\Playwright\playwright cicd"

rem 1. Remove the old git repo created in the wrong folder (your other folders are NOT touched)
if exist "%ROOT%\.git" (
  attrib -h -r "%ROOT%\.git" /s /d >nul 2>&1
  rmdir /s /q "%ROOT%\.git"
  echo Removed old repo at %ROOT%\.git
)

rem 2. Init new repo in the correct folder
cd /d "%PROJ%" || goto :err
if exist .git rmdir /s /q .git
git init || goto :err
git checkout -B main
call npm install || goto :err
git add . || goto :err
git commit -m "Init Playwright CI/CD project (login/home tests + GitHub Pages)" || goto :err

rem 3. Replace remote main (old history with wrong folders is overwritten)
git remote add origin https://github.com/tankhoa1611/Automation-CI-CD.git
git push -u origin main --force || goto :err

echo.
echo DONE. Check https://github.com/tankhoa1611/Automation-CI-CD/actions
exit /b 0
:err
echo FAILED - see the error above.
exit /b 1
