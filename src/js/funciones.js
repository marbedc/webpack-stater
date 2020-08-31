import '../css/componentes.css';

export const sal = ( nom )=>{

    console.log('Holiiis')
    

    const h1= document.createElement('h1')
    h1.innerText= `Hola ${nom}, como estas`
    document.body.append(h1);

}