import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {    
    button.addEventListener('click', handleClick)
})

const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
    button.addEventListener('click', (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    // preventDefaul() é uma funcao para tag <a> não se comportar como link e não alterar o endereco da URL
    event.preventDefault()

    const text = check ? "Marcar como lida" : "Excluir"
    const roomId = document.querySelector('#room-id').dataset.id
    // O evento do eventListener já traz consigo todas as propriedades da tag que sofreu o evento, por isso é possível pegar qualquer elemento usando o event.target.dataset.propriedade (neste caso o id da  questão).
    const questionId = event.target.dataset.id
    const slug = check ? 'check' : 'delete'

    const form = document.querySelector('.modal form')
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = `${text}`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()}?`
    modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}`

    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

    modal.open()
}