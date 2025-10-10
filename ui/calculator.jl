using Blink

println("Iniciando a calculadora. . .")

#definindo o caminho para o arquivo HTML da interface de usuario 
#__DIR__  é o diretório onde este script está localizado

ui_path = joinpath(@__DIR__, "ui", "index.html")




# Cria uma nova janela com Blink com configurações específicas

w = Window(Dict(
     "title" => "Calculadora Julia",
     "width" => 380,
     "height" => 650,
     "frame" => true, # mostra a barra de título padrão da janela
     "resizable" => false # impede que a janela seja redimensionada
))

# Carrega a UI (HTML, CSS, JS) na janela


loadurl(w, "file://" * ui_path)





println("Calculadora pronta!")

# Mantém o script Julia em execução enquanto a janela estiver aberta
# para que o aplicativo não feche imediatamente.
while active(w)
     sleep(1)
end

println("Calculadora fechada.")