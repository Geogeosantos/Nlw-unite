let participantes = [ 
  {
    nome: "Geovany Alves Santos",
    email: "Geovanyalves@gmail.com",
    dataInscricao: new Date(2024, 2, 01, 21, 14),
    dataCheckIn: null
  },
  {
    nome: "Gabriel Antonio",
    email: "Gabrielantonio@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 20, 14),
    dataCheckIn: new Date(2024, 2, 30, 09, 40)
  },
  {
    nome: "Maria Silva",
    email: "mariasilva@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 19, 00),
    dataCheckIn: null
  },
  {
    nome: "João Oliveira",
    email: "joao.oliveira@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 18, 30),
    dataCheckIn: new Date(2024, 2, 30, 07, 45)
  },
  {
    nome: "Ana Paula",
    email: "anapaula@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 17, 45),
    dataCheckIn: new Date(2024, 2, 30, 07, 00)
  },
  {
    nome: "Ricardo Ferreira",
    email: "ricardoferreira@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 16, 55),
    dataCheckIn: new Date(2024, 2, 30, 06, 15)
  },
  {
    nome: "Camila Santos",
    email: "camilasantos@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 16, 10),
    dataCheckIn: null
  },
  {
    nome: "Felipe Souza",
    email: "felipesouza@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 15, 25),
    dataCheckIn: new Date(2024, 2, 30, 04, 45)
  },
  {
    nome: "Juliana Lima",
    email: "julianalima@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 14, 45),
    dataCheckIn: new Date(2024, 2, 30, 04, 00)
  },
  {
    nome: "Lucas Mendes",
    email: "lucasmendes@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 14, 00),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar Check-in
    </button>
    `
  }
  return `
  <tr>
      <td>
        <strong>
         ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
        </strong>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante ja existe

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar formulario
  event.target.querySelector('[name = "nome"').value = ""
  event.target.querySelector('[name = "email"]').value = ""
}

const fazerCheckIn = (event) => {
  //Confirmar se realmente quer o check-in
  const mensagemConfirmacao = "Tem certeza que deseja realizar o check-in?"
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  //Encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //Atualizar o check-in do participante]
  participante.dataCheckIn = new Date()

  //atualizar a lista de participantes
  atualizarLista(participantes)
}