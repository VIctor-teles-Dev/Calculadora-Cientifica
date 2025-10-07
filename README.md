# Calculadora-Cientifica
Calculadora feita em julia para calcular calculos incriveis e brutais


# Iniciando:

## instalando Blink:

pkg.add Blink

## iniciando Blink

using Blink

## Criando uma janela 

w = Window()

## Enviando parametros para a janela 

body! (w, "Parametros")

## Enviar parametros de um documento

f = open("index.html") do file 
       read(file,String)
       end

body! (w,f)