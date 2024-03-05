import { postgres } from "@/infra/database";

export interface PostgresRepositoryResponse<DataT> {
  status: 'OK'|'ERROR'|'NOT_QUERIED'
  data: DataT[]
  resultCount: number
  error: string
}

export class PostgresRepository {
  
  protected async query<QueryResult>(rawQuery: string, placeHolders?: any[]) {
    const res:PostgresRepositoryResponse<QueryResult> = {
      status: 'NOT_QUERIED',
      data: [],
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