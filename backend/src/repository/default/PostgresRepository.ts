import { postgres } from "@/infra/database";

interface PostgresRepositoryResponse<DataT> {
  status: 'OK'|'ERROR'|'NOT_QUERIED'
  data: null|DataT[]
  resultCount: number
  error: string
}

export class PostgresRepository {
  
  protected async query(rawQuery: string, placeHolders: string[]) {
    const res:PostgresRepositoryResponse<any> = {
      status: 'NOT_QUERIED',
      data: null,
      resultCount: 0,
      error: ''
    };

    try {
      const query = await postgres.query(rawQuery, placeHolders);

      res.data = query.rows;
      res.resultCount = query.rowCount;
      res.status = 'OK';
    }
    catch(err) {
      res.error = err.message;
      res.status = 'ERROR';
    }
    
    return res;
  }
}