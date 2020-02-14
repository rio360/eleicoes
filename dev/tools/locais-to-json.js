const fs = require("fs-extra")
const xlsx = require("xlsx")

const source = "./../../source/data/2016/raw/locais_votacao.xls"

////////////////////////////////////////////////////////////////////////////////////////////////////

const workbook = xlsx.readFile(source)
const sheet = workbook.Sheets["secoes_completo"]
const secoes = xlsx.utils.sheet_to_json(sheet)

let bairros = { }

secoes.forEach(secao => {
	// Só estamos interessados no município do Rio de Janeiro!
	if (secao.MUNICIPIO.trim() !== "RIO DE JANEIRO") return false

	// Pega o bairro na coluna do endereço
	// e adiciona na lista de bairros, se ainda não existir
	const endereco = secao["ENDERECO LOCAL ATUAL"]
	const bairro = endereco.substring(endereco.lastIndexOf(", ") + 2)
	if (!bairros[bairro]) bairros[bairro] = [ ]

	if (!bairros[bairro].includes(secao["SECAO ANTERIOR"])) {
		bairros[bairro].push(secao["SECAO ANTERIOR"])
	}
})

const destination = `./../../source/data/2016/secoes-por-bairro.json`
fs.outputJsonSync(destination, bairros, { spaces: "\t" })
