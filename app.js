import Store from './services/Store.js'
import API from './services/API.js'
import { loadData } from './services/Menu.js'
import Router from './services/Router.js'
// Este evento va a ser disparado cuando el DOM este listo para ser manipulado
var options = {
    once: true,
    passive: true
}
window.app = {}
app.store = Store;
app.router = Router
window.addEventListener('DOMContentLoaded', ()=>{
    console.log('Hi there')
    loadData()
}, options)


//AGREGAR LOS SHORTHAND QUE MOSTRO EN EL VIDEO para no repetir codigo
// const $ = (el) => el.querySelector(el).call(this,arguments)  
