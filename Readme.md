# Open Wallet Api

## Manual Installation


Clone the repo:

```bash
git clone https://github.com/Drex72/Open-Wallet-Api
cd Open-Wallet-Api
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```
## Commands

Running locally:

```bash
npm run dev
```


## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
#Server environment
NODE_ENV=development

#Port number
PORT=6000

#Db configuration
DB_NAME=db-name
DB_USERNAME=db-usernmae
DB_HOST=db-host
DB_PASSWORD=db-password

# Access Token and Refresh Token Configuration
ACCESS_TOKEN_SECRET=access-token-secret
REFRESH_TOKEN_SECRET=refresh-token-secret

# Fixer Io Configuration
FIXER_IO_API_KEY=fixer-io-api-secret

```

## Project Structure

```
specs\
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--exceptions\     # Error Exceptions
 |--handlers\       # Handlers for various things
 |--models\         # Sequelize models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Helper classes and functions
 |--validators\     # Request data validation schemas
 |--index.ts        # App entry point
```

## License

[MIT](LICENSE)
