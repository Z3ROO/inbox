import { PostgresRepository } from "@/infra/database/PostgresRepository";
import { v4 as UUID } from "uuid";

export class DraftCategoriesRepository extends PostgresRepository {

  public async findAll() {
    const res = await this.query(`SELECT * FROM draft_categories;`);
    return res;
  }

  public async findById(_id: string): Promise<any> {
    const res = await this.query(`SELECT * FROM draft_categories WHERE draft_categories._id = $1;`, [_id]) as any;
    
    return res;
  }

  public async findByName(name: string) {
    const res = await this.query(`SELECT * FROM draft_categories WHERE draft_categories.name = $1;`, [name]) as any;
    
    return res;
  }

  public async insertOne({_id, name}: {_id?: string, name:string}) {
    if (!_id)
      _id = UUID();

    const res = await this.query(`
      INSERT INTO draft_categories (
        _id, name, color, icon
      )
      VALUES ($1, $2, $3, $4);
    `, [_id, name, '#ccc', 'none']);

    return {
      ...res,
      insertedId: _id
    };
  }
}