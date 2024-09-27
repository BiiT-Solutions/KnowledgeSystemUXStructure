import {ElementDto} from "authorization-services-lib";

export class FileEntry extends ElementDto {
  override id: string;
  uuid: string;
  description: string;
  mimeType: string;
  fileName: string;
  fileFormat: string;
  filePath: string;

  public static override copy(from: FileEntry, to: FileEntry): void {
    super.copy(from, to);
    to.id = from.id;
    to.uuid = from.uuid;
    to.description = from.description;
    to.mimeType = from.mimeType;
    to.fileName = from.fileName;
    to.fileFormat = from.fileFormat;
    to.filePath = from.filePath;
  }
  public static override clone(from: FileEntry): FileEntry {
    const to: FileEntry = new FileEntry();
    FileEntry.copy(from, to);
    return to;
  }
}
