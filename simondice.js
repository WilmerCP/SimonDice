
/*Obtenemos los elementos del DOM*/

const boton = document.getElementById("boton");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const amarillo = document.getElementById("amarillo");
const azul = document.getElementById("azul");
const titulo = document.getElementById("titulo");


/*Evento del boton iniciar*/

boton.addEventListener("click", empezarJuego);



/* Clase que contiene toda la lógica de mi juego*/ 

class Juego {

    constructor(){

        this.inicializarJuego();

    }

    inicializarJuego(){


        this.totalNiveles = 10;
        this.alTocar = this.alTocar.bind(this);
        this.activarBotones = this.activarBotones.bind(this);
        this.mostrarSecuencia = this.mostrarSecuencia.bind(this);
        this.administrador = this.administrador.bind(this)


       this.crearSecuencia();
        this.ocultarBoton();
        this.nivel = 0;
        this.contador = 0;
        this.repeticion = new Array(1);

        this.siguienteNivel();
        
    }

    siguienteNivel(){

       this.nivel++;
       this.contador = 0;
       this.repeticion = new Array(this.nivel);

        titulo.innerHTML = "Nivel "+this.nivel;


       setTimeout(this.administrador, 1600);

    }

    administrador(){

        this.mostrarSecuencia(this.activarBotones);
        

    }

    ocultarBoton(){

        boton.classList.add("ocultar");

    }

    mostrarBoton(){

        boton.classList.remove("ocultar");

    }

    //Crear la secuencia para la partida

    crearSecuencia(){

        this.secuencia = new Array(this.totalNiveles).fill(0).map(()=>Math.floor(Math.random()*4));

    }

    //Recibe el numero entre 0 y 3 y dependiendo de cual sea ilumina por unos milisegundos el boton correspondiente

    iluminarBoton(numero){

        switch(numero){

            case 0:

                naranja.classList.add("saturar");
                
                setTimeout(()=>{naranja.classList.remove("saturar")}, 430);

            break;

            case 1:

                verde.classList.add("saturar");
                
                setTimeout(()=>{verde.classList.remove("saturar")}, 430);

            break;

            case 2:

                amarillo.classList.add("saturar");
                
                setTimeout(()=>{amarillo.classList.remove("saturar")}, 430);


            break;

            case 3:

                azul.classList.add("saturar");
                
                setTimeout(()=>{azul.classList.remove("saturar")}, 430);


            break;

        }


    }

    //Dependiendo del nivel que sea te muestra la secuencia a repetir

    mostrarSecuencia(callback){

        for (let i = 0; i < this.nivel; i++) {
           
            setTimeout(()=>{this.iluminarBoton(this.secuencia[i])}, 1000 * i);
 
    
        }
    
        if(callback){

            setTimeout(this.activarBotones, this.nivel * 1050);

        }


    }


    alTocar(evento){

        switch(evento.target){

            case naranja:
            this.iluminarBoton(0);
            this.evaluarClick(0);
            break;

            case verde:
            this.iluminarBoton(1);
            this.evaluarClick(1);
            break;

            case amarillo:
            this.iluminarBoton(2);
            this.evaluarClick(2);
            break;

            case azul:
            this.iluminarBoton(3);
            this.evaluarClick(3);
            break;
        }
        

    }

    activarBotones(){

        naranja.addEventListener("click",this.alTocar);

        verde.addEventListener("click",this.alTocar);

        amarillo.addEventListener("click",this.alTocar);

        azul.addEventListener("click",this.alTocar);

    }

    desactivarBotones(){

        naranja.removeEventListener("click",this.alTocar);

        verde.removeEventListener("click",this.alTocar);

        amarillo.removeEventListener("click",this.alTocar);

        azul.removeEventListener("click",this.alTocar);


    } 

    evaluarClick(btn){

        this.repeticion[this.contador] = btn;
        this.contador++;

        if(this.contador === this.nivel){

            this.desactivarBotones();

            if(sonIguales(this.repeticion, this.secuencia.slice(0,this.nivel))){

                if(this.nivel < this.totalNiveles){
                this.siguienteNivel();
                }else{

                   this.ganaste();
                }

            }else{

                this.reiniciar();


            }

        }

    }

    reiniciar(){

        this.contador = 0;
        this.nivel = 0;
        

        titulo.innerHTML = "Error!";
        setTimeout(()=>{

            titulo.innerHTML = "Simón Dice";
            this.mostrarBoton();

        }, 2000);



    }

    ganaste(){

        this.contador = 0;
        this.nivel = 0;
       

        titulo.innerHTML = "¡Ganaste!";
        setTimeout(()=>{

            titulo.innerHTML = "¡Felicitaciones!";

        }, 1900);

        setTimeout(()=>{

            titulo.innerHTML = "Simón Dice";

            this.mostrarBoton();
        
        }, 3700);



    }

}
/* Metodo para crear una nueva partida*/

function empezarJuego(){
    
    window.partida = new Juego();

}

    /*Que ladilla, me toco hacer mi metodo pa ver si dos arrays son iguales*/

    function sonIguales(uno, dos){

        if(uno.length != dos.length){

            return false;
        }

        for (let i = 0; i < uno.length; i++) {
            
            if(uno[i]!=dos[i]){
                return false;
            }
            
        }

        return true;


    }