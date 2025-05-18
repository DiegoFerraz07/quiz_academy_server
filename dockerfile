# Usa uma imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos da aplicação para dentro do container
COPY . .

# Expondo a porta onde a aplicação vai rodar
EXPOSE 3001


# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]

