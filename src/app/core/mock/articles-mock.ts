import {Article} from '../@types/Article';
import {ArticleStatus} from '../enumeration/ArticleStatus';
import {User} from '../@types/User';
import {Category} from '../@types/Category';
import {Tag} from '../@types/Tag';
import {Role} from '../enumeration/Role';

export const ARTICLES_MOCK: Article[] = [
   {
      id: 1,
      title: 'Ibovespa sobe com ajuda de Vale e Petrobras',
      slug: 'ibovespa-sobe-com-ajuda-de-vale-e-petrobras',
      subtitle: 'Principal índice da bolsa brasileira avança com bom humor externo e alta das commodities.',
      content: 'SÃO PAULO (Reuters) - O Ibovespa tinha uma alta modesta nesta terça-feira, sustentada principalmente por Vale e Petrobras, endossadas pelo avanço dos preços do minério de ferro e do petróleo no exterior, enquanto agentes financeiros também monitoram a retomada do julgamento do ex-presidente Jair Bolsonaro no Supremo Tribunal Federal (STF).\n' +
         '\n' +
         'Por volta de 11h, o Ibovespa, referência do mercado acionário brasileiro, subia 0,17%, a 142.034,18 pontos. O volume financeiro somava R$3,3 bilhões.\n' +
         '\n' +
         '"O Ibovespa está em tendência de alta no curto e médio prazo, e segue em direção aos 150.000 e 165.000 pontos numa visão de médio prazo", afirmaram analistas do Itaú BBA.\n' +
         '\n' +
         '"Do lado da baixa, o primeiro suporte está em 140.900 e, em seguida, em 139.300 pontos. Abaixo deste, encontrará próximos suportes em 139.300 e 137.200 – patamar que mantém o índice em tendência de alta no curto prazo", acrescentaram no relatório Diário do Grafista enviado a clientes nesta terça-feira.\n' +
         '\n' +
         'Em Brasília, a Primeira Turma do STF retomou o julgamento do ex-presidente Jair Bolsonaro e de mais sete réus acusados de tentativa de golpe de Estado, com a leitura do voto do ministro Alexandre de Moraes, relator do processo, que rejeitou alegações de nulidade e preliminares apresentadas pelas defesas.\n' +
         '\n' +
         'Ao começar a analisar o mérito da acusação, Moraes afirmou não haver dúvida de que houve uma tentativa de golpe de Estado no país e afirmou que o que discute no julgamento é a autoria desta tentativa. A leitura do voto segue em andamento.\n' +
         '\n' +
         'Anúncio de terceiros. Não é uma oferta ou recomendação do Investing.com. Leia as nossas diretrizes aqui ou remova os anúncios.\n' +
         'Há preocupações no mercado acerca de eventuais retaliações do governo norte-americano do presidente Donald Trump ao desfecho do julgamento.\n' +
         '\n' +
         'Por causa do processo contra Bolsonaro, os Estados Unidos impuseram sanções a Moraes no final de julho por considerá-lo um violador de direitos humanos. O presidente Donald Trump também citou o caso de Bolsonaro para impor tarifa comercial de 50% sobre produtos brasileiros exportados aos EUA.\n' +
         '\n' +
         'Em Wall Street, o S&P 500 tinha acréscimo de 0,14% em pregão marcado por expectativas para a divulgação no começo da tarde de dados revisados sobre o mercado de trabalho norte-americano.',
      coverImage: 'https://placehold.co/500x250?text=News+1',
      articleStatus: ArticleStatus.PUBLISHED,
      publishedDate: '2025-09-09 14:30:00',
      author: {
         id: 1,
         name: 'Admin',
         email: '',
         password: '',
         role: Role.JORNALISTA,
      } as User,
      category: {
         id: 1,
         name: 'Notícia',
         description: 'Notícias sobre o mercado financeiro',
         slug: 'noticia',
         createdAt: '2025-01-01 00:00:00',
         updatedAt: '2025-01-01 00:00:00'
      } as Category,
      tags: [
         { id: 1, name: 'Economia', slug: 'economia' },
         { id: 2, name: 'Negócios', slug: 'negocios' },
         { id: 3, name: 'Ibovespa', slug: 'ibovespa' },
      ] as Tag[],
      viewCount: 1520,
      createdAt: '2025-09-09 12:00:00',
      updatedAt:'2025-09-09 14:35:00',
   },
   {
      id: 2,
      title: 'Dólar fecha em alta com aversão ao risco no exterior',
      slug: 'dolar-fecha-em-alta-com-aversao-ao-risco-no-exterior',
      subtitle: 'Moeda norte-americana se valoriza frente ao real com dados de inflação nos EUA acima do esperado.',
      content: 'O dólar comercial encerrou o dia em alta de 0,8%, cotado a R$ 5,25, refletindo um movimento global de aversão ao risco. Investidores reagem aos últimos dados de inflação ao consumidor nos Estados Unidos, que vieram acima das expectativas do mercado. O resultado aumenta as apostas de que o Federal Reserve (Fed), o banco central americano, pode manter a taxa de juros elevada por mais tempo para combater a inflação.\n' +
         '\n' +
         'Juros mais altos nos EUA tendem a atrair capital para a maior economia do mundo, fortalecendo o dólar em relação a outras moedas, especialmente de países emergentes como o Brasil. O mercado agora aguarda os próximos passos do Fed e discursos de seus diretores para obter mais pistas sobre o futuro da política monetária.',
      coverImage: 'https://placehold.co/500x250?text=News+2',
      articleStatus: ArticleStatus.PUBLISHED,
      publishedDate: '2025-09-10 10:00:00',
      author: {
         id: 1,
         name: 'Admin',
         email: '',
         password: '',
         role: Role.JORNALISTA,
      } as User,
      category: {
         id: 1,
         name: 'Notícia',
         description: 'Notícias sobre o mercado financeiro',
         slug: 'noticia',
         createdAt: '2025-01-01 00:00:00',
         updatedAt: '2025-01-01 00:00:00'
      } as Category,
      tags: [
         { id: 1, name: 'Economia', slug: 'economia' },
         { id: 4, name: 'Câmbio', slug: 'cambio' },
         { id: 5, name: 'Mercado Internacional', slug: 'mercado-internacional' },
      ] as Tag[],
      viewCount: 890,
      createdAt: '2025-09-10 09:30:00',
      updatedAt:'2025-09-10 10:05:00',
   },
   {
      id: 3,
      title: 'Copom mantém Selic em 10,5% e sinaliza cautela com inflação',
      slug: 'copom-mantem-selic-em-10-5-e-sinaliza-cautela-com-inflacao',
      subtitle: 'Decisão unânime do Comitê de Política Monetária interrompe ciclo de cortes na taxa básica de juros.',
      content: 'BRASÍLIA - O Comitê de Política Monetária (Copom) do Banco Central decidiu por unanimidade manter a taxa Selic em 10,50% ao ano, interrompendo o ciclo de cortes que vinha ocorrendo desde agosto do ano passado. A decisão já era amplamente esperada pelo mercado financeiro.\n' +
         '\n' +
         'No comunicado, o Copom adotou um tom mais cauteloso, citando a deterioração do cenário externo e a resiliência da inflação de serviços no Brasil. A autoridade monetária afirmou que o cenário exige "serenidade e moderação na condução da política monetária" e não se comprometeu com futuros cortes.\n' +
         '\n' +
         'Analistas acreditam que a Selic deve permanecer neste patamar até o final do ano, com o Banco Central monitorando de perto a evolução dos preços e as expectativas de inflação antes de considerar novos movimentos.',
      coverImage: 'https://placehold.co/500x250?text=News+3',
      articleStatus: ArticleStatus.PUBLISHED,
      publishedDate: '2025-09-08 18:45:00',
      author: {
         id: 1,
         name: 'Admin',
         email: '',
         password: '',
         role: Role.JORNALISTA,
      } as User,
      category: {
         id: 1,
         name: 'Notícia',
         description: 'Notícias sobre o mercado financeiro',
         slug: 'noticia',
         createdAt: '2025-01-01 00:00:00',
         updatedAt: '2025-01-01 00:00:00'
      } as Category,
      tags: [
         { id: 1, name: 'Economia', slug: 'economia' },
         { id: 6, name: 'Juros', slug: 'juros' },
         { id: 7, name: 'Política Monetária', slug: 'politica-monetaria' },
      ] as Tag[],
      viewCount: 2345,
      createdAt: '2025-09-08 18:00:00',
      updatedAt:'2025-09-08 18:50:00',
   },
   {
      id: 4,
      title: 'Magazine Luiza reverte lucro e ações desabam mais de 10%',
      slug: 'magazine-luiza-reverte-lucro-e-acoes-desabam-mais-de-10-porcento',
      subtitle: 'Resultado do segundo trimestre frustra expectativas do mercado e levanta preocupações sobre o setor varejista.',
      content: 'As ações da Magazine Luiza (MGLU3) operavam em forte queda nesta manhã, após a companhia divulgar um prejuízo líquido de R$ 198,8 milhões no segundo trimestre de 2025, revertendo o lucro de R$ 95,5 milhões do mesmo período do ano anterior. O resultado veio bem abaixo do consenso de analistas, que projetavam um lucro modesto.\n' +
         '\n' +
         'A empresa citou o cenário macroeconômico desafiador, com juros altos e endividamento das famílias, como principais fatores para a queda nas vendas e o aumento das despesas. A margem Ebitda ajustada caiu 2,5 pontos percentuais, para 4,8%.\n' +
         '\n' +
         'O resultado negativo da gigante varejista afeta todo o setor na bolsa, com outras empresas como Via e Americanas também registrando perdas significativas no pregão.',
      coverImage: 'https://placehold.co/500x250?text=News+4',
      articleStatus: ArticleStatus.PUBLISHED,
      publishedDate: '2025-09-07 09:15:00',
      author: {
         id: 1,
         name: 'Admin',
         email: '',
         password: '',
         role: Role.JORNALISTA,
      } as User,
      category: {
         id: 1,
         name: 'Notícia',
         description: 'Notícias sobre o mercado financeiro',
         slug: 'noticia',
         createdAt: '2025-01-01 00:00:00',
         updatedAt: '2025-01-01 00:00:00'
      } as Category,
      tags: [
         { id: 8, name: 'Ações', slug: 'acoes' },
         { id: 9, name: 'Varejo', slug: 'varejo' },
         { id: 10, name: 'Resultados Trimestrais', slug: 'resultados-trimestrais' },
      ] as Tag[],
      viewCount: 3102,
      createdAt: '2025-09-07 08:30:00',
      updatedAt:'2025-09-07 09:20:00',
   },
   {
      id: 5,
      title: 'Safra recorde de soja impulsiona exportações e PIB do agronegócio',
      slug: 'safra-recorde-de-soja-impulsiona-exportacoes-e-pib-do-agronegocio',
      subtitle: 'Estimativa da Conab aponta para uma colheita de mais de 160 milhões de toneladas do grão.',
      content: 'A Companhia Nacional de Abastecimento (Conab) elevou sua projeção para a safra de soja 2024/2025, que agora é estimada em um recorde de 162 milhões de toneladas. O volume representa um aumento de 5% em relação à safra anterior e consolida o Brasil como o maior produtor e exportador mundial da oleaginosa.\n' +
         '\n' +
         'O bom desempenho no campo é um dos principais motores da economia brasileira. O setor do agronegócio deve ser responsável por um crescimento significativo nas exportações do país, ajudando a manter o saldo positivo da balança comercial. Analistas do setor preveem que o PIB do agronegócio crescerá acima da média nacional, contribuindo para a atividade econômica como um todo.',
      coverImage: 'https://placehold.co/500x250?text=News+5',
      articleStatus: ArticleStatus.PUBLISHED,
      publishedDate: '2025-09-06 11:00:00',
      author: {
         id: 1,
         name: 'Admin',
         email: '',
         password: '',
         role: Role.JORNALISTA,
      } as User,
      category: {
         id: 1,
         name: 'Notícia',
         description: 'Notícias sobre o mercado financeiro',
         slug: 'noticia',
         createdAt: '2025-01-01 00:00:00',
         updatedAt: '2025-01-01 00:00:00'
      } as Category,
      tags: [
         { id: 1, name: 'Economia', slug: 'economia' },
         { id: 11, name: 'Agronegócio', slug: 'agronegocio' },
         { id: 12, name: 'Exportação', slug: 'exportacao' },
      ] as Tag[],
      viewCount: 754,
      createdAt: '2025-09-06 10:45:00',
      updatedAt:'2025-09-06 11:05:00',
   },
   {
      id: 6,
      title: 'Itaú anuncia pagamento de JCP bilionário; veja se você tem direito',
      slug: 'itau-anuncia-pagamento-de-jcp-bilionario-veja-se-voce-tem-direito',
      subtitle: 'Banco pagará R$ 0,26 por ação em Juros sobre Capital Próprio no próximo mês.',
      content: 'O Itaú Unibanco (ITUB4) informou ao mercado que seu Conselho de Administração aprovou o pagamento de Juros sobre Capital Próprio (JCP) no valor bruto de R$ 2,5 bilhões. O montante corresponde a um valor de R$ 0,2615 por ação.\n' +
         '\n' +
         'Terão direito ao provento os acionistas que tiverem posse das ações no final do pregão do dia 20 de setembro de 2025, a chamada "data com". A partir do dia 21 de setembro, as ações passarão a ser negociadas "ex-juros", ou seja, sem direito ao recebimento deste pagamento.\n' +
         '\n' +
         'O pagamento será realizado no dia 31 de outubro de 2025 e está sujeito à retenção de 15% de imposto de renda na fonte. O JCP é uma das formas de uma empresa distribuir lucros aos seus acionistas.',
      coverImage: 'https://placehold.co/500x250?text=News+6',
      articleStatus: ArticleStatus.PUBLISHED,
      publishedDate: '2025-09-05 19:00:00',
      author: {
         id: 1,
         name: 'Admin',
         email: '',
         password: '',
         role: Role.JORNALISTA,
      } as User,
      category: {
         id: 1,
         name: 'Notícia',
         description: 'Notícias sobre o mercado financeiro',
         slug: 'noticia',
         createdAt: '2025-01-01 00:00:00',
         updatedAt: '2025-01-01 00:00:00'
      } as Category,
      tags: [
         { id: 2, name: 'Negócios', slug: 'negocios' },
         { id: 8, name: 'Ações', slug: 'acoes' },
         { id: 13, name: 'Dividendos', slug: 'dividendos' },
      ] as Tag[],
      viewCount: 4812,
      createdAt: '2025-09-05 18:30:00',
      updatedAt:'2025-09-05 19:02:00',
   },
];
