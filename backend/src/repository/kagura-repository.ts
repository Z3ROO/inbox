import { ICard, ICardDTO } from "@/types/Kagura";
import { ObjectId } from "mongodb";
import { Repository } from "./inbox-repository";

export class KaguraRepository extends Repository<ICard> {
  constructor() {
    super('kagura', 'kagura');
  }

  public async findOneCard(card_id: string) {
    const _id = new ObjectId(card_id);

    return this.collection().findOne({_id});
  }

  public async findValidCards() {
    return this.collection().find({allowed_after: {$lte: new Date()}}).toArray();
  }

  public async findUniqueAreas() {
    return this.collection().distinct('area');
  }

  public async findUniqueCategories() {
    return this.collection().distinct('category');
  }

  public async findUniqueTypes() {
    return this.collection().distinct('type');
  }

  public async updateCard(card: ICardDTO) {
    const { _id, allowed_after, history } = card;

    this.collection().findOneAndUpdate({ _id: new ObjectId(_id)}, {
      $set: {
        allowed_after
      },
      $push: {
        history
      },
      $inc: {
        level: history.direction
      }
    })
  }

  public async insertCard(card: ICard) {
    await this.collection().insertOne(card)
  }

  public async deleteCard(card_id: string) {
    const _id = new ObjectId(card_id);

    return await this.collection().findOneAndDelete({_id});
  }
}
