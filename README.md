# Casos de uso

Pasos a seguir

  Se le preguntará al usuario su nombre y se le dará la bienvenida, guardaremos el nombre
    - Si el nombre está vacío, mostramos un alert exigiendole uno
  Le muestro todos los vuelos al usuario ejem: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
  El usuario verá el coste medio de los vuelos
  Preguntar al usuario si desea ver los vuelos con escala
    -> Si: Mostrar vuelos con escalas
        -> Vamos al siguiente paso
    -> No: Vamos al siguiente paso 
  Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
                
 
  Después de ver toda la información, el programa preguntará al usuario si es ADMIN/USER.
  - Si introduce algo diferente a ADMIN/USER o no introduce nada, mostramos un alert pidiéndole que se identifique como uno de los dos.
    -> USER: El usuario podrá buscar por precio, le mostramos los vuelos que tengan ese precio o más barato.
        - Si introduce algo que no sean números o deja el campo vacio, le mostramos un alert pidiéndole que solo introduzca números.
    -> Le preguntamos si desea hacer otra busqueda por precios
        -> Si: Repetir paso anterior(buscar vuelos por precio)
        -> No: Pasar al sguiente paso(mostrar los últimos cinco vuelos del día)
    -> ADMIN: El usuario puede crear/eliminar(por id) más vuelos, pidiendo la información por prompt().
        -> Crear:  
            - Si el usuario no introduce datos o introduce datos incorrectos se le pedirá con un alert() que solo introduzca los datos pertinentes
      -> Preguntar al usuario si desea crear otro vuelo
            Si: Repetir el paso anterior.
                - No podrá pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
            No: Pasar al siguiente paso(mostrar los últimos cinco vuelos del día)
 -> Cerrar programa(Despedir al usuario).                  
        
   