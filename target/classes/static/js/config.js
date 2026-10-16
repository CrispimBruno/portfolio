/* =====================================================================
   ÁREA DE EDIÇÃO — SEUS DADOS FICAM AQUI
   - Dados e links: neste arquivo.
   - Textos (bio, cargo, descrições, botões): src/main/resources/messages.properties (português)
     e messages_en.properties (inglês).
   ===================================================================== */
const CONFIG = {
  // Seu usuário do GitHub (https://github.com/SEU_USUARIO)
  githubUser: "CrispimBruno",

  // Página "Redes": meios de contato. id define o ícone (whatsapp, instagram, linkedin, github, email).
  contatos: [
    {
      id: "whatsapp",
      nome: "WhatsApp",
      handle: "+55 31 99984-2588",
      url: "https://wa.me/5531999842588",
    },
    {
      id: "instagram",
      nome: "Instagram",
      handle: "@crispim_jrr",
      url: "https://www.instagram.com/crispim_jrr/",
    },
    {
      id: "linkedin",
      nome: "LinkedIn",
      handle: "crispim-bruno",
      url: "https://www.linkedin.com/in/crispim-bruno-073779375/",
    },
    {
      id: "github",
      nome: "GitHub",
      handle: "@CrispimBruno",
      url: "https://github.com/CrispimBruno",
    },
    {
      id: "email",
      nome: "E-mail",
      handle: "crispimbsj@gmail.com",
      url: "mailto:crispimbsj@gmail.com",
    },
  ],

  // E-mail via EmailJS (https://www.emailjs.com). Passo a passo:
  // 1) crie conta e conecte seu e-mail em "Email Services" -> copie o Service ID
  // 2) crie um template em "Email Templates" usando as variáveis {{from_name}}, {{reply_to}} e {{message}},
  //    com o seu e-mail no campo "To Email" -> copie o Template ID
  // 3) em "Account" copie a Public Key
  emailjs: {
    serviceId: "Servide_Crisp7m",
    templateId: "template_vcr7o7k",
    publicKey: "do7wTUQnjYx891RjY",
  },

  // Missões concluídas: nome exibido, nome do repositório no GitHub e a chave do texto (messages.properties).
  // O clique abre https://github.com/<githubUser>/<repo>. Se o projeto não estiver no GitHub, use url: 'https://...'.
  missoes: [
    {
      nome: "E-Charge",
      url: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-ideal-2",
      repo: "e-charge",
      texto: "q.echarge",
    },
    { nome: "Maze Escape", repo: "maze-escape", texto: "q.maze" },
    { nome: "Login 3D", repo: "login-3d", texto: "q.login" },
    {
      nome: "Sistema Hospitalar",
      url: "https://github.com/Unlikeanypedro/TrabalhoPr-tico",
      repo: "sistema-hospitalar",
      texto: "q.hospital",
    },
    {
      nome: "Hoope",
      url: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-2-ti2-8183100-hoope",
      repo: "hoope",
      texto: "q.hoope",
    },
  ],

  // Atributos da aba Status: [nome, nível de 0 a 100]
  atributos: [
    ["Front-end", 80],
    ["Java / Spring", 65],
    ["Python", 60],
    ["Discrete Math", 55],
  ],

  // Tecnologias exibidas na aba Currículo
  tecnologias:
    "HTML · CSS · JavaScript · Java · Spring Boot · Thymeleaf · Python · Pygame · Leaflet.js · Figma · Trhee.Js",

  // Playlist de fundo. Músicas em static/media/music/ e capas (disco) em static/img/covers/.
  // Para trocar nome, artista ou ordem, edite aqui.
  musicas: [
    {
      titulo: "DYNA MIND",
      artista: "9Lana",
      arquivo: "/media/music/dynamite.mp3",
      capa: "/img/covers/dynamite.jpg",
    },
    {
      titulo: "BALALAIKA (Acoustic Ver.)",
      artista: "9Lana",
      arquivo: "/media/music/balalaika.mp3",
      capa: "/img/covers/balalaika.jpg",
    },
    {
      titulo: "Usseewa",
      artista: "Ado",
      arquivo: "/media/music/usseewa.mp3",
      capa: "/img/covers/usseewa.jpg",
    },
    {
      titulo: "RuLe",
      artista: "Ado",
      arquivo: "/media/music/rule.mp3",
      capa: "/img/covers/rule.jpg",
    },
  ],
  // Volume inicial da playlist (0 a 1)
  volumeInicial: 0.15,

  // Experiências (aba "Experiências"). Ordem automática: ano decrescente.
  // titulo / texto = chaves em messages.properties (exp.*.t e exp.*.d) -> escreva as descrições lá.
  // fotos = uma ou mais imagens em src/main/resources/static/img/exp/
  experiencias: [
    {
      ano: 2026,
      titulo: "exp.faculdade.t",
      texto: "exp.faculdade.d",
      fotos: ["/img/exp/faculdade.jpeg"],
    },
    {
      ano: 2025,
      titulo: "exp.gestao.t",
      texto: "exp.gestao.d",
      fotos: ["/img/exp/gestao.jpeg"],
    },
    {
      ano: 2025,
      titulo: "exp.agro.t",
      texto: "exp.agro.d",
      fotos: ["/img/exp/agropecuaria.jpeg"],
    },
    {
      ano: 2024,
      titulo: "exp.obmep.t",
      texto: "exp.obmep.d",
      fotos: ["/img/exp/obmep.jpeg"],
    },
    {
      ano: 2024,
      titulo: "exp.estagio.t",
      texto: "exp.estagio.d",
      fotos: ["/img/exp/estagio.jpeg"],
    },
    {
      ano: 2019,
      titulo: "exp.canguru.t",
      texto: "exp.canguru.d",
      fotos: ["/img/exp/canguru.jpeg"],
    },
    {
      ano: 2017,
      titulo: "exp.ingles.t",
      texto: "exp.ingles.d",
      fotos: ["/img/exp/seed.jpeg"],
    },
  ],
};
