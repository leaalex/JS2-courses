window.onload = function() {

els = {}

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
    if (props.events) Object.keys(props.events).forEach(
        (event) => {
            element.addEventListener(event, props.events[event])
        }
    )

    if (props.ref) els[props.ref] = element
    return element
}

const root = document.getElementById('root')

const button = create('button', {className: 'btn btn-outline-secondary'}, 'Создать')
const input = create('input', {className: 'form-control', attr: {type: 'text'}})
const divButton = create('div', {className: 'input-group-append'}, button)
const divGroup = create('div', {className: 'input-group mb-4'}, input,  divButton)

root.append(divGroup)

// Event

const heandleClick = (event) => {
    if (input.value !== ''){
        const events = {
            'mouseover': function() { this.style.border = '1px solid red'},
            'mouseout': function() { this.style.border = ''}
        }
        root.append(task(input.value))
        input.value = ''
    } else {
        input.focus()
    }
}
button.addEventListener('click', heandleClick)
input.addEventListener('keypress', (event) => {
    if (event.code === 'Enter'){
        heandleClick()
    }
})


function task (text , completed=false){
    shortID = Math.floor(1000 + (9000 * Math.random()))
    const div = `div_${shortID}`
    const button = `button_${shortID}`
    const input = `input_${shortID}`

    const actionButton = {
        'click': function(event) {
            if (this.innerText === 'Сохранить'){
                els[input].setAttribute('disabled', true)
                this.innerText = 'Редактировать'
            } else {
                els[input].removeAttribute('disabled')
                els[input].focus()
                this.innerText = 'Сохранить'
            }
        }
    }
    const actionInput = {
        'keyup': function(event) {
            if(event.key === 'Escape'){
                this.value = this.dataset.value
                this.setAttribute('disabled', true)
                els[button].innerText = 'Редактировать'
            }
        }
    }

    const actionCheckbox = {
        'change': function(event){
            if (this.checked === true) {
                els[div].classList.add('d-none')
                } else {
                els[div].classList.remove('d-none')
            }

        }
    }


return create('div', {className:"input-group"}, 
            create('div', {className:"input-group-prepend"}, 
                create('div', {className:"input-group-text"}, 
                    (completed)?
                    create('input', {attr: { type : "checkbox",   checked: completed }, events: actionCheckbox}, )
                    :
                    create('input', {attr: { type : "checkbox",    }, events: actionCheckbox}, )
                )
            ),
            create('input', {ref: input, className:"form-control", events: actionInput, data: {value: text}, attr: {type: 'text' , disabled: 'true' , value: text}} ),
            create('div', {ref: div, className:"input-group-append"}, 
                create('button', {ref: button, id:'id_121', className:"btn btn-outline-secondary", events: actionButton, attr: {type: 'button'}}, 'Редактировать')
            )
        )
}

// BOM
const buttonXHR = create('button', {className: "btn btn-primary"}, 'XHR')
root.append(buttonXHR)

buttonXHR.addEventListener('click', function(){
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/', true)
    xhr.send()
    xhr.onload = function(event){
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.response) 
            console.log(data)
            data.forEach(function(taskData){
                root.append(task(taskData.title, taskData.completed))
            })
        }
    }
})


const buttonFetch = create('button', {className: "btn btn-primary"}, 'fetch')
root.append(buttonFetch)

buttonFetch.addEventListener('click', function(){
fetch('https://jsonplaceholder.typicode.com/todos/')
    .then((data) => data.json())
    .then((json) => json.forEach(function(taskData){
        root.append(task(taskData.title, taskData.completed))
    }))
})
}