#imagem criada a partir do node
FROM node:18.16.0-alpine3.17 

#(diretorio de trabalho no container) caminho da pasta que sera criado para aplicação
WORKDIR /usr/src/app

#copiar o json para o diretorio (.)
COPY package*.json .

#instalar os pacotes de npm
RUN npm install

#copiar todos os arquivos da aplicação para o WORKDIR
COPY . .

#expor a porta
EXPOSE 3000

#comando que da o start na aplicação
CMD ["npm","start"]
