const fs = require("fs-extra")
const readline = require("readline")
const moment = require("moment")

const ano = "2016"
const source = "./../../source/data/2016/raw/votacao_secao_2016_RJ.txt"

const formatNumber = number => {
	return new Intl.NumberFormat("pt-BR").format(number)
}

const logStatus = message => {
	process.stdout.clearLine()
	process.stdout.cursorTo(0)
	process.stdout.write(message)
}

////////////////////////////////////////////////////////////////////////////////////////////////////

const turnos = {
	"1": { zonas: { }, secoes: { } },
	"2": { zonas: { }, secoes: { } },
}

const cargos = [
	"prefeito",
	"vereador",
]

////////////////////////////////////////////////////////////////////////////////////////////////////

const rl = readline.createInterface({
	input: fs.createReadStream(source),
	crlfDelay: Infinity,
})

let lineCount = 0
const startDate = moment()

rl.on("line", line => {
	const columns = line.split(";").map(column => column.replace(/"/g, ""))

	// Não queremos linhas vazias!
	if (columns.length <= 1) return false
	lineCount++

	// Só estamos interessados no município do Rio de Janeiro!
	if (columns[8] !== "RIO DE JANEIRO") return false

	const turno = columns[3]
	const zona = columns[9]
	const secao = columns[10]
	const cargo = columns[12].toLowerCase()
	const votos = parseInt(columns[14])
	let candidato = columns[13]

	switch (candidato) {
		case "95":
			candidato = "branco"
			break
		case "96":
			candidato = "nulo"
			break
		case "97":
			candidato = "aas"
			break
	}

	// Cria zona no objeto, se ainda não existir
	if (!turnos[turno].zonas[zona]) {
		turnos[turno].zonas[zona] = {
			"prefeito": { },
			"vereador": { },
		}
	}

	if (!turnos[turno].secoes[secao]) {
		turnos[turno].secoes[secao] = {
			"prefeito": { },
			"vereador": { },
		}
	}

	// Cria candidato no objeto, se ainda não existir
	if (!turnos[turno].zonas[zona][cargo][candidato]) {
		turnos[turno].zonas[zona][cargo][candidato] = 0
	}

	if (!turnos[turno].secoes[secao][cargo][candidato]) {
		turnos[turno].secoes[secao][cargo][candidato] = 0
	}

	// Registra os votos do candidato
	turnos[turno].zonas[zona][cargo][candidato] += votos;
	turnos[turno].secoes[secao][cargo][candidato] += votos;

	// Loga status
	if (lineCount % 50000 === 0) {
		logStatus(formatNumber(lineCount) + " linhas processadas...")
	}
}).on("close", () => {
	// Salva JSONs por cargo e turno
	for (const turno in turnos) {
		cargos.forEach(cargo => {
			// Zonas
			let zonas = { }

			for (const zona in turnos[turno].zonas) {
				zonas[zona] = turnos[turno].zonas[zona][cargo]
			}

			const zonasDestination = `./../../source/data/${ano}/${cargo}-por-zona-${turno}-turno.json`
			fs.outputJsonSync(zonasDestination, zonas, { spaces: "\t" })

			// Seções
			let secoes = { }

			for (const secao in turnos[turno].secoes) {
				secoes[secao] = turnos[turno].secoes[secao][cargo]
			}

			const secoesDestination = `./../../source/data/${ano}/${cargo}-por-secao-${turno}-turno.json`
			fs.outputJsonSync(secoesDestination, secoes, { spaces: "\t" })
		})
	}

	const endDate = moment()
	const timing = endDate.diff(startDate, "seconds", true);

	process.stdout.clearLine()
	process.stdout.cursorTo(0)
	console.log(`${formatNumber(lineCount)} linhas processadas em ${formatNumber(timing)}s`)
});

// [
// 0	'31/10/2016',
// 1	'10:26:41',
// 2	'2016',
// 3	'1',
// 4	'ELEIÇÕES MUNICIPAIS 2016',
// 5	'RJ',
// 6	'60011',
// 7	'60011',
// 8	'RIO DE JANEIRO',
// 9	'246',
// 10	'171',
// 11	'11',
// 12	'PREFEITO',
// 13	'96',
// 14	'70'
// ]
