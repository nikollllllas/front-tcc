import { api } from "../api";

export type Origin = {
  value: string;
  label: string;
};

export type Stats = {
  current: number;
  last: number;
  diff: number;
};

export type Headquarter = {
  city: string;
  state: string;
};

export type Funding = {
  rounds: number;
  raised_amount: string;
  currency: string;
};

export type Company = {
  id: number;
  logo_url: string;
  origin: Origin;
  name: string;
  description: string;
  cnpj?: string;
  linkedin_url: string;
  instagram_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  website_url: string;
  phone?: string;
  foundation_year?: string;
  sector: string;
  sub_sector?: string;
  monetization_type?: string;
  target_audience?: string;
  stage?: string;
  updated_at: string;
  company_size?: string;
  rank: number;
  total_employees?: Stats;
  jobs_openings: Stats;
  followers?: Stats;
  headquarter: Headquarter;
  funding: Funding;
};

type GetCompanies = {
  page: number;
  per_page: number;
  term: string;
};

export type GetCompaniesResponse = {
  term: string;
  page: number;
  per_page: number;
  data: Company[];
  total: number;
};

export const listCompanies = async ({ page, per_page, term }: GetCompanies) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    term,
  });

  const { data: result } = await api.get<GetCompaniesResponse>(
    `/screening/companies?${queryParams.toString()}`,
  );

  return result;
};
