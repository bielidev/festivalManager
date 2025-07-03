export enum TEMPLATE_TYPES {
  NEW = "new",
  CORPORATE = "corporate",
  BIRTHDAY = "birthday",
  WEDDING = "wedding",
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  GRADUATION = "graduation",
  TECH = "Tech",
}

export type TemplateType = {
  english: {
    [key: string]: string;
  };
  spanish: {
    [key: string]: string;
  };
  catalan: {
    [key: string]: string;
  };
  styles: {
    [key: string]: string;
  };
};
