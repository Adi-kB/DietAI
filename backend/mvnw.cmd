@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------

@echo off
setlocal enabledelayedexpansion

set "DIRNAME=%~dp0"
if "%DIRNAME%" == "" set "DIRNAME=.\"

set "WRAPPER_JAR=%DIRNAME%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%DIRNAME%\.mvn\wrapper\maven-wrapper.properties"

rem Find out the distribution URL
for /F "tokens=1,2 delims==" %%A in (%WRAPPER_PROPERTIES%) do (
    if "%%A"=="distributionUrl" set "DISTRIBUTION_URL=%%B"
)

rem Extract zip name
for %%i in ("%DISTRIBUTION_URL%") do set "ZIP_NAME=%%~nxi"

set "MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\%ZIP_NAME:~0,-4%"

if exist "%MAVEN_HOME%" goto runMaven

echo Downloading Maven...
set "TEMP_ZIP=%TEMP%\%ZIP_NAME%"
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('%DISTRIBUTION_URL%', '%TEMP_ZIP%')"
powershell -Command "Expand-Archive -Path '%TEMP_ZIP%' -DestinationPath '%USERPROFILE%\.m2\wrapper\dists'"
del "%TEMP_ZIP%"

rem Locate extracted folder name
for /d %%d in ("%USERPROFILE%\.m2\wrapper\dists\apache-maven-*") do set "MAVEN_HOME=%%d"

:runMaven
set "MAVEN_CMD=%MAVEN_HOME%\bin\mvn.cmd"
"%MAVEN_CMD%" %*
