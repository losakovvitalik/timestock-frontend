export interface PageProps<Params = any, SearchParams = any> {
  params: Promise<Params>;
  searchParams?: Promise<SearchParams>;
}
