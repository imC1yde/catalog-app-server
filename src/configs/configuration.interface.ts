interface IAppConfig {
  PORT: number
}

interface IRawgConfig {
  RAWG_URL: string
  RAWG_API_KEY: string
}

interface IJwtConfig {
  JWT_SECRET: string
}

export interface IConfiguration {
  app: IAppConfig
  rawg: IRawgConfig
  jwt: IJwtConfig
}