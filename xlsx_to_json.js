import excelToJson from 'convert-excel-to-json'
import fs from 'fs'

const convertidos = './arquivos_convertidos'

export function conversor(url_xlsx) {
	if(url_xlsx.includes('.xlsx') || url_xlsx.includes('.xls')){
		const result = excelToJson({
			sourceFile: url_xlsx,
			columnToKey: {
				'*': '{{columnHeader}}'
			},
			header:{
				rows: 1
			}
		});

		var res = JSON.stringify(result)

		if(!fs.existsSync(convertidos))
			fs.mkdirSync(convertidos)

		const extensao = url_xlsx.split('.')[2]
		let converted_filename = url_xlsx.replace(/^.*[\\\/]/, '').replace(`.${extensao}`, '.json')
		console.log(converted_filename)

		let full_path = `${convertidos}/${converted_filename}`

		fs.writeFile(full_path, res, err => {console.log(err)})
	} else {
		throw new Error(`${url_xlsx} não é um arquivo xls ou xlsx`)
	}
}

export function converteDePasta(pasta) {
	try {
		var files = fs.readdirSync(pasta);

		files.forEach(file => conversor(`${pasta}/${file}`))
		
	} catch (error) {
		console.log(error)
	}
}	