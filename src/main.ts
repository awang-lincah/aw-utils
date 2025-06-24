import { GcpUtils } from './gcp'

export class Utils {
  public readonly gcp: GcpUtils

  constructor() {
    this.gcp = new GcpUtils()
  }
}
