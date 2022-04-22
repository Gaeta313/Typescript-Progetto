
interface ISmartphone {
    carica: number;
    numeroChiamate: number;

}

class User implements ISmartphone {
    carica: number;
    numeroChiamate: number;
    nome: string;
    cognome: string;
    constructor(nome: string, cognome: string) {
        this.nome = nome;
        this.cognome = cognome;
        this.carica = 0;
        this.numeroChiamate = 0;
    }

    public ricarica(unaRicarica: number): void {
        if (unaRicarica > 0) {
            this.carica += unaRicarica;
            console.log('Ricarica effettuata con successo');
        }
        else {
            console.log('Errore ricarica');
        }
    };

    public chiamata(minutiDurata: number): void {
        let costoChiamata: number = minutiDurata * 0.20;
        if (costoChiamata > this.carica) {
            console.log('Il credito non è sfficente per effettuare la chiamata');
        }
        else {
            this.carica -= costoChiamata;
            this.numeroChiamate++;
        }
    };

    public numero404(): number {
        return +this.carica.toFixed(2);
    }

    public getNumeroChiamate(): number {
        return this.numeroChiamate;
    }

    public azzeraChiamate(): void {
        this.numeroChiamate = 0;
    }
}

let FirstUser: User = new User('Mario', 'Rossi');
let SecondUser: User = new User('Giuseppe', 'Verdi');
let ThirdUser: User = new User('Filippo', 'Neri');

FirstUser.ricarica(30);
console.log(FirstUser);
FirstUser.chiamata(10);
FirstUser.chiamata(120);
console.log(FirstUser.numero404());
FirstUser.azzeraChiamate();
console.log(FirstUser.getNumeroChiamate());


////////////////////////Tutto il codice che segue serve a generare la parte html della pagina/////////////////////

//function per stampare lo smartphone dell'utente
function stampaSmart(utente: User): void {
    let table: HTMLElement | null = document.querySelector('#table');
    if (table != null) {
        table.innerHTML = '';
        let smart: HTMLElement = document.createElement('div');
        smart.id = 'smartphone';
        smart.innerHTML = `<div id="contenuto" class="text-start">
       <h2> ${utente.nome} ${utente.cognome} </h2>
        <h6>Credito residuo : <span id="credito" class='text-danger'>${utente.numero404()} €</span></h6>
        <h6>Chiamate Effetuate : <span id="chiamate" class='text-success'>${utente.getNumeroChiamate()}</span></h6>
        <h6>Costo Ultima Chiamata : <span id="costo" class='text-warning'></span></h6>

        <div class="flex-nowrap mt-5">
            <button id='ricarica' class="btn btn-success ">Effetua Ricarica</button>
            <input id='importo' class="" type="number" placeholder="Importo">
        </div>
        <span id="esito"></span>
        <div class="flex-nowrap mt-5">
            <button id='chiamata' class="btn btn-warning ">Effetua Chiamata</button>
            <input id='minuti' class="" type="number" placeholder="Minuti">
            <span id="esito1"></span>
        </div>
        <div class="flex-nowrap mt-5">
        <button id='azzera' class="btn btn-danger ">Azzera Chiamate</button>
        </div>

    </div>`
        table.appendChild(smart);
        let ricarica: HTMLButtonElement | null = document.querySelector('#ricarica');
        if (ricarica != null) {
            ricarica.addEventListener('click', () => {
                effetuaRicarica(utente);
            })
        }
        let chiamata: HTMLButtonElement | null = document.querySelector('#chiamata');
        if (chiamata != null) {
            chiamata.addEventListener('click', () => {
                effetuaChiamata(utente);
            })
        }

        let azzera: HTMLButtonElement | null = document.querySelector('#azzera');
        if (azzera != null) {
            azzera.addEventListener('click', () => {
                azzeraChiamate(utente);
            })
        }
    }
}

function effetuaRicarica(utente: User): void {
    let input: HTMLInputElement | null = document.querySelector('#importo');
    let credito: HTMLElement | null = document.querySelector('#credito')
    if (input != null && credito != null) {
        let valore: number = +input.value;
        input.value = '';
        if (valore > 0) {
            utente.ricarica(valore);
            credito.innerText = String(utente.numero404()) + '€';
        }
        else {
            let esito: HTMLElement | null = document.querySelector('#esito');
            if (esito != null) {
                esito.style.display = 'block';
                esito.innerText = 'Errore, la ricarica deve essere in positivo'
                setTimeout(() => {
                    if (esito != null)
                        esito.style.display = 'none';
                }, 3000)
            }
        }
    }
}

function effetuaChiamata(utente: User): void {
    let input: HTMLInputElement | null = document.querySelector('#minuti');
    let credito: HTMLElement | null = document.querySelector('#credito');
    let chiamate: HTMLElement | null = document.querySelector('#chiamate')
    let esito: HTMLElement | null = document.querySelector('#esito1');
    let costo: HTMLElement | null = document.querySelector('#costo');
    if (input != null && credito != null && chiamate != null && esito != null && costo != null) {
        let valore: number = +input.value;
        input.value = '';
        if (valore > 0) {
            if(valore *0.20 < utente.numero404()){
            costo.innerHTML = String((valore*0.20).toFixed(2)) + '€';
            utente.chiamata(valore);
            credito.innerText = String(utente.numero404()) + '€';
            chiamate.innerText = String(utente.getNumeroChiamate());
            }
            else{
                esito.style.display = 'block';
                esito.innerText = 'Errore, il credito residuo non copre il costo della chiamata';
                setTimeout(() => {
                    if (esito != null)
                        esito.style.display = 'none';
                }, 3000)
            }

        }
        else {
            if (esito != null) {
                esito.style.display = 'block';
                esito.innerText = 'Errore, la chiamata deve avere una durata in minuti maggiore di 0'
                setTimeout(() => {
                    if (esito != null)
                        esito.style.display = 'none';
                }, 3000)
            }
        }
    }
}

function azzeraChiamate(utente:User):void{
    let chiamate: HTMLElement | null = document.querySelector('#chiamate');
    let costo: HTMLElement | null = document.querySelector('#costo');
    if(chiamate!= null && costo != null){
        utente.azzeraChiamate()
        costo.innerHTML = '';
        chiamate.innerHTML = String(utente.getNumeroChiamate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
    let utente1: HTMLButtonElement = buttons[0];
    let utente2: HTMLButtonElement = buttons[1];
    let utente3: HTMLButtonElement = buttons[2];

    utente1.addEventListener('click', () => {
        stampaSmart(FirstUser);
    })
    utente2.addEventListener('click', () => {
        stampaSmart(SecondUser);
    })
    utente3.addEventListener('click', () => {
        stampaSmart(ThirdUser);
    })
})