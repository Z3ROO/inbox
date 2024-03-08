import { PostgresRepository } from "@/infra/database/PostgresRepository";
import { IDraftCategory } from "shared-types";
import { v4 as UUID } from "uuid";

export class DraftCategoriesRepository extends PostgresRepository {

  public async findAll() {
    const res = await this.query<IDraftCategory>(`
      SELECT * FROM draft_categories;
    `);
    return res;
  }

  public async findById(_id: string) {
    const res = await this.query<IDraftCategory>(`
      SELECT * FROM draft_categories WHERE draft_categories._id = $1;
    `, [_id]);
    
    return res;
  }

  public async findByName(name: string) {
    const res = await this.query<IDraftCategory>(`
      SELECT * FROM draft_categories WHERE draft_categories.name = $1;
    `, [name]);
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
    
    res.insertedId = _id;
    return res;    
  }
}