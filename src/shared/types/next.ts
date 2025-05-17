export interface PageParams<Params = any, SearchParams = any> {
  params: Promise<Params>;
  searchParams?: Promise<SearchParams>;
}
