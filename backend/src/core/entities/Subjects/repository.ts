import { PostgresRepository } from "@/infra/database/PostgresRepository";
import { ISubject } from "shared-types";
import { v4 as UUID } from "uuid";

export class SubjectsRepository extends PostgresRepository {

  public async findAll() {
    const res = await this.query<ISubject>(`
      SELECT * FROM subjects;
    `);
    return res;
  }

  public async findById(_id: string) {
    const res = await this.query<ISubject>(`
      SELECT * FROM subjects WHERE subjects._id = $1;
    `, [_id]);
    
    return res;
  }

  public async findByName(name: string) {
    const res = await this.query<ISubject>(`
      SELECT * FROM subjects WHERE subjects.name = $1;
    `, [name]);
    return res;
  }

  public async insertOne({_id, name}: {_id?: string, name:string}) {
    if (!_id)
      _id = UUID();

    const res = await this.query(`
      INSERT INTO subjects (
        _id, name, color, icon
      )
      VALUES ($1, $2, $3, $4);
    `, [_id, name, '#ccc', 'none']);
    
    res.insertedId = _id;
    return res;    
  }
}