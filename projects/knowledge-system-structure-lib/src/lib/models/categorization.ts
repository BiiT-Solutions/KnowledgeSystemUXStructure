import {ElementDto} from "authorization-services-lib";

export class Categorization extends ElementDto {
  override id: string;
  uuid: string;
  name: string;

  public static override copy(from: Categorization, to: Categorization): void {
    super.copy(from, to);
    to.id = from.id;
    to.uuid = from.uuid;
    to.name = from.name;
  }
  public static override clone(from: Categorization): Categorization {
    const to: Categorization = new Categorization();
    Categorization.copy(from, to);
    return to;
  }
}
