

# Expo Brasília — Totem Interativo do Acervo do IHGG

Aplicação em modo quiosque para totem touchscreen que permite a visitantes de exposição navegar por jornais históricos sobre Goiás e Brasília, digitalizados do acervo do Instituto Histórico e Geográfico de Goiás (IHGG).

Exposto em Brasília e utilizado por mais de 200 visitantes.

---

## Sobre o projeto

O IHGG mantém um acervo de jornais históricos que, até então, só podia ser consultado presencialmente e sob manuseio direto do material físico. O objetivo do totem foi tornar esse acervo navegável por qualquer visitante da exposição — sem treinamento, sem teclado e sem risco ao original.

O totem não é um equipamento dedicado: é uma TV com tela sensível ao toque, convertida em quiosque por software. Isso reduziu o custo do projeto a praticamente zero em hardware, mas trouxe as restrições que definiram toda a arquitetura:

- **Sem teclado e sem mouse.** Toda a navegação acontece por toque, em cards grandes. Não há campo de busca, porque digitar em tela de TV é inviável — a descoberta do acervo é visual, folheando.
- **Uso por leigos, sem instrução prévia.** A pessoa chega, vê os cards e toca. Não existe tela de ajuda, porque não pode existir necessidade de uma.
- **100% offline.** A aplicação e todo o acervo digitalizado rodam localmente na própria máquina. Sem internet, sem servidor externo, sem ponto de falha de rede no meio da exposição.
- **Operação contínua e desassistida.** O totem fica ligado o dia inteiro sem ninguém por perto para reiniciar nada.

## Funcionalidades

- Navegação visual do acervo por cards, pensada para descoberta por folheio e não por busca textual
- Visualização de página com zoom por gestos de toque
- Interface em tela cheia, sem barra de navegador nem saída acidental do modo quiosque
- Funcionamento integralmente offline, com o acervo servido localmente

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | Vue.js, TypeScript, HTML, CSS |
| Back-end | Node.js |
| Banco de dados | MySQL (local) |
| Versionamento | Git |

## Modelagem do acervo

A base de dados foi modelada do zero a partir do material físico. O desafio principal foi representar um acervo histórico real: datas incompletas ou aproximadas, edições com numeração irregular e a relação entre uma edição e suas páginas digitalizadas.

## Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Gabrieldiog/expo-de-Brasilia-.git
cd expo-de-Brasilia-

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as credenciais do MySQL local

# Iniciar em desenvolvimento
npm run dev
```

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `DB_HOST` | Host do MySQL |
| `DB_USER` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `DB_NAME` | Nome do banco |
| `PORT` | Porta da aplicação |

## Contexto

Projeto desenvolvido para o **Instituto Histórico e Geográfico de Goiás (IHGG)** entre outubro de 2025 e janeiro de 2026, com atuação em arquitetura, desenvolvimento full stack e modelagem da base de dados.

## Autor

**Gabriel Diogo Vieira Silva** — Desenvolvedor Full Stack, Goiânia/GO

[Portfólio](https://gabriel-diogo.vercel.app) · [LinkedIn](https://linkedin.com/in/gabrieldiogovsilva) · [GitHub](https://github.com/Gabrieldiog)
