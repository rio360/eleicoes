const fs = require("fs-extra")
const readline = require("readline")
const moment = require("moment")

const ano = "2016"
const source = "./../../source/data/2016/raw/votacao_secao_2016_RJ.txt"
// const source = "./../../source/data/2016/raw/sample.txt"

const formatNumber = number => {
	return new Intl.NumberFormat("pt-BR").format(number)
}

const logStatus = message => {
	process.stdout.clearLine()
	process.stdout.cursorTo(0)
	process.stdout.write(message)
}

const startDate = moment()
let lineCount = 0

////////////////////////////////////////////////////////////////////////////////////////////////////

const agrupamentos = [ "secao", "bairro" ]

const turnos = {
	"1": { "prefeito": { }, "vereador": { } },
	"2": { "prefeito": { }, "vereador": { } },
}

const cargos = [ "prefeito", "vereador" ]

const secaoToBairro = fs.readJsonSync("./../../source/data/2016/secoes.json")

////////////////////////////////////////////////////////////////////////////////////////////////////

const rl = readline.createInterface({
	input: fs.createReadStream(source),
	crlfDelay: Infinity,
})

agrupamentos.forEach(criterio => {
	cargos.forEach(cargo => {
		for (const turno in turnos) {
			turnos[turno][cargo][criterio] = { }
		}
	})
})

rl.on("line", line => {
	const columns = line.split(";").map(column => column.replace(/"/g, ""))

	// Não queremos linhas vazias!
	if (columns.length <= 1) return false
	lineCount++

	// Só estamos interessados no município do Rio de Janeiro!
	if (columns[8] !== "RIO DE JANEIRO") return false

	const turno = columns[3].toString()
	const secao = columns[9].toString() + "-" + columns[10].toString()
	const bairro = secaoToBairro[secao]
	const cargo = columns[12].toLowerCase()
	const votos = parseInt(columns[14])
	let candidato = columns[13]

	const criterios = {
		secao: secao,
		bairro: bairro,
	}

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

	agrupamentos.forEach(criterio => {
		// Cria zona no objeto, se ainda não existir
		cargos.forEach(cargo => {
			if (!turnos[turno][cargo][criterio][criterios[criterio]]) {
				turnos[turno][cargo][criterio][criterios[criterio]] = { }
			}
		})

		// Cria candidato no objeto, se ainda não existir
		if (!turnos[turno][cargo][criterio][criterios[criterio]][candidato]) {
			turnos[turno][cargo][criterio][criterios[criterio]][candidato] = 0
		}

		// Registra os votos do candidato
		turnos[turno][cargo][criterio][criterios[criterio]][candidato] += votos;
	})

	// Loga status
	if (lineCount % 50000 === 0) {
		logStatus(formatNumber(lineCount) + " linhas processadas...")
	}
}).on("close", () => {
	// Salva JSONs por cargo e turno
	agrupamentos.forEach(criterio => {
		for (const turno in turnos) {
			cargos.forEach(cargo => {
				// Não tem votação para verador no segundo turno!
				if (turno === "2" && cargo === "vereador") return false;

				const destination = `./../../source/data/${ano}/${cargo}-por-${criterio}-${turno}-turno.json`
				fs.outputJsonSync(destination, turnos[turno][cargo][criterio], { spaces: "\t" })
			})
		}
	})

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
