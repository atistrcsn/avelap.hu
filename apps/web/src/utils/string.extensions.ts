declare interface String {
  IsNotNullOrBlank(searchTerm?: string): boolean
}

String.prototype.IsNotNullOrBlank = function (this: string): boolean {
  const s: string = this
  return s !== null && s.trim().length > 0
}