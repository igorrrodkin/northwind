declare namespace NodeJS {
  export interface ProcessEnv {
    PORT_APP: number;
    USER_PSQL: string;
    HOST_PSQL: string;
    DB_PSQL: string;
    PASSWORD_PSQL: string;
    PORT_PSQL: number;
  }
}
