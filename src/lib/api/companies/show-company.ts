import { api } from "../api";
import type { Funding, Headquarter, Origin, Stats } from "./list-company";

type GetCompanyProps = {
  companyId?: number;
};

type Address = {
  id: number;
  bot_company_id: number;
  headquarter: boolean;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  line_one: string;
  line_two: string;
};

export type ShowCompany = {
  id: number;
  logo_url: string;
  origin: Origin;
  name: string;
  description: string;
  cnpj: string;
  linkedin_url: string;
  instagram_url: string;
  facebook_url: string;
  twitter_url: string;
  website_url: string;
  phone: string;
  foundation_year: number;
  sector: string;
  sub_sector: string;
  monetization_type: string;
  target_audience: number;
  stage: string;
  updated_at: Date;
  company_size: string;
  addresses: Address[];
  total_employees: Stats;
  jobs_openings: Stats;
  followers: Stats;
  headquarter: Headquarter;
  funding: Funding;
};

export const showCompany = async ({ companyId }: GetCompanyProps) => {
  const { data: result } = await api.get<ShowCompany>(
    `/screening/companies/${companyId}`,
  );

  return result;
};
