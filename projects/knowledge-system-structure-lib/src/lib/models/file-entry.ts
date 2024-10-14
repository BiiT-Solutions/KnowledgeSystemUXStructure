import {ElementDto} from "authorization-services-lib";
import {Categorization} from "./categorization";

export class FileEntry extends ElementDto {
  override id: string;
  uuid: string;
  description: string;
  mimeType: string;
  fileName: string;
  fileFormat: string;
  filePath: string;
  public: boolean;
  publicUrl: string;
  categorizations: Categorization[] = [];

  public static override copy(from: FileEntry, to: FileEntry): void {
    super.copy(from, to);
    to.id = from.id;
    to.uuid = from.uuid;
    to.description = from.description;
    to.mimeType = from.mimeType;
    to.fileName = from.fileName;
    to.fileFormat = from.fileFormat;
    to.filePath = from.filePath;
    to.public = !!from.public;
    to.publicUrl = from.publicUrl;
    to.categorizations = from.categorizations ? from.categorizations.map(Categorization.clone) : [];
  }
  public static override clone(from: FileEntry): FileEntry {
    const to: FileEntry = new FileEntry();
    FileEntry.copy(from, to);
    return to;
  }
}
