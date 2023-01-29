import { KaguraRepository } from "@/repository/kagura-repository";
import { ICardDTO, INewCardDTO } from "@/types/Kagura";

const DAY = (24 * (60 * 60 * 1))

export class Kagura {
  repository: KaguraRepository;
  constructor() {
    this.repository = new KaguraRepository();
  }

  public async getValidCards() {
    const cards = await this.repository.findValidCards();
    const types = await this.getTypes();
    const categories = await this.getCategories();

    const simpleTree = types.map( type => {
      return {
        type,
        routines: categories.map(category => {
          const filteredCards = cards.filter(card => (card.type === type && card.category === category));
          return {
            category,
            cards: filteredCards.map(card => {
              const { _id, requirements } = card;
              return {
                _id, requirements
              }
            })
          }
        })
      }
    });

    return simpleTree;
  }

  public async getTypes() {
    return this.repository.findUniqueTypes();
  }

  public async getCategories() {
    return this.repository.findUniqueCategories();
  }

  public async evalutateCard(card: Omit<ICardDTO, 'allowed_after'>) {
    let SPACE_FACTOR = 1;
    const { _id, history } = card;
    const { direction, started_at, finished_at } = history;

    const { level } = await this.repository.findOneCard(_id);
    if (direction === 1)
      SPACE_FACTOR = level

    let allowed_after = new Date(new Date().setHours(0,0,0,0) + (DAY * SPACE_FACTOR));

    this.repository.updateCard({
      _id,
      allowed_after,
      history: {
        direction,
        started_at: new Date(started_at),
        finished_at: new Date(finished_at)
      }
    });
  }

  public async newCard(card: INewCardDTO) {
    const { requirements, type, category } = card;
    console.log(card)
    await this.repository.insertCard({
      requirements,
      type: type.replace(/ /g, '_'),
      category: category.replace(/ /g, '_'),
      level: 1,
      allowed_after: new Date(),
      history:[],
    });
  }

}