function create(tag, props, ...children){
    const element = document.createElement(tag)
    if (props.id) element.id = props.id
    if (props.className) element.className = props.className
    if (props.classList) element.classList.add(...props.classList)
    if (props.data) Object.keys(props.data).forEach(
        (key) => {
            element.dataset[key] = props.data[key]
        }
    )
    if (props.attr) Object.keys(props.attr).forEach(
        (key) => {
            element.setAttribute(key, props.attr[key])
        }
    )
    if (props.style) Object.keys(props.style).forEach(
        (key) => {
            element.style[key]  = props.style[key]
        }
    )
    if (children) children.forEach( 
        (child) => {
            if (typeof child === 'string'){
                element.innerHTML += child
            } else {
                element.appendChild(child)
            }
        }
    )
    return element
}

const root = document.getElementById('root')

const button = create('button', {className: 'btn btn-outline-secondary'}, 'Нажми на меня!')
const input = create('input', {className: 'form-control', attr: {type: 'text'}})
const divButton = create('div', {className: 'input-group-append'}, button)
const divGroup = create('div', {className: 'input-group'}, input,  divButton)



root.append(divGroup)

const heandleClick = (a) => (event) => console.log(a++, event)

button.onclick = heandleClick

button.addEventListener('click', heandleClick(1))
setTimeout(
 () => {button.removeEventListener('click', heandleClick)} , 3000
)



// const eventClick = (event)=> {
//     if (event.target.tagName === 'INPUT'){
//         event.target.value = "Пиши что-нибудь!"
//         hendlerKeypress = (event)=>{
//             if (event.code === "Enter") {
//                 event.target.removeEventListener('keypress', hendlerKeypress)
//             } else {
//                 console.log(event.target.value)
//             }
//         }
//         event.target.addEventListener('keypress', hendlerKeypress)
//     }
//     if (event.target.tagName === 'BUTTON'){
//         event.target.innerText = event.target.innerText.toUpperCase()
//     }
// }
// root.addEventListener('click', eventClick)

// button.addEventListener('dblclick', (event)=> {
//     console.log('Двойное Нажатие событие 2  ')
//     button.removeEventListener('click', eventClick)
// })

// console.log(button.onclick) 

