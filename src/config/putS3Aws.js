require("dotenv").config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { fromSSO } = require('@aws-sdk/credential-providers');
const fs = require('fs')

async function saveS3(filename, filePath) {

    // Buscando os aquivos na pasta que é passada para função através do parâmetro filePath, e atribui o conteúdo na constate
    const fileContent = fs.readFileSync(filePath, "utf-8")

    // Objeto com os parâmetros para enviar ao Bucket S3
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filename,
        Body: fileContent,
        ContentType: 'application/json'
    };
    
    // Método para autenticar na AWS via SSO  
    const ssoClient = fromSSO({ profile: process.env.AWS_PROFILE_SSO })
    const ssoProvider = await ssoClient()
    try {
        // Fazendo autenticação no S3 com as credenciais que vieram do SSO
        const s3Client = new S3Client({credentials: ssoProvider})

        // Método que recebe os parâmetros para serem enviados ao S3
        const command = new PutObjectCommand(params);

        // Método que envia os dados para o bucket S3
        const response = await s3Client.send(command);

        console.log('Arquivo salvo no S3:', response);
    } catch (err) {
        console.error('Erro ao enviar para o S3:', err);
    }
}

module.exports = { saveS3 };

