export class Donation {
  // TODO: how to save images on db?
  constructor(
    private readonly title: string,
    private readonly phone: string,
    private readonly description: string,
    private readonly images: string[]
  ) {}
}
