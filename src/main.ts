import { GcpUtils } from './gcp'

export class AwUtils {
  public readonly gcp: GcpUtils

  constructor() {
    this.gcp = new GcpUtils()
  }
}
